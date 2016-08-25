import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import CompatibleWith from './CompatibleWith.jsx';
import DownloadOptions from './DownloadOptions.jsx';
import KindsBadges from './KindsBadges.jsx';
import Loading from './Loading.jsx';

import { Stuffs } from '../../common/collections/stuffs.js';
import { Compatibilities } from '../../common/collections/compatibilities.js';

const STUFF_LIMIT = 'session-stuff-limit'
const DESCRIPTION_LENGTH = 160

class Results extends Component {
  renderOptional(stuff, fieldName, title) {
    return _.has(stuff, fieldName) ? <p>{title}: {stuff[fieldName]}</p> : null;
  }

  componentWillReceiveProps(newProps) {
    const currentStuffsL = this.props.totalStuffCount
    const newStuffsL = newProps.totalStuffCount

    if(currentStuffsL !== newStuffsL) {
      this.props.setStuffCount(newStuffsL)
    }
  }

  renderStuff(stuff) {
    // Shorten description and ensure exactly three trailing periods
    const description = (stuff.description.substr(0, DESCRIPTION_LENGTH) + "...").replace(/[\.*\s*]*$/, "...")

    return (
      <div key={stuff._id} className='col-xl-4 col-sm-6 col-xs-12 m-t-2'>
          <div className="card">
            <a href={"/stuff/" + stuff._id} className="stuff-card">
              <img className="card-img-top m-x-auto img-fluid ioplease-stuff-img m-t-1 p-x-1" src={stuff.iconUrl} alt={stuff.name} />
              <div className="card-block">
                <h3 className="card-title"><strong>{stuff.name}</strong> <small className='text-muted'>by {stuff.company}</small></h3>
                <KindsBadges stuffId={stuff._id} />
                <p className="card-text m-y-2">{description}</p>
                <button className="btn btn-outline-info btn-lg">Learn More</button>
            </div>
            </a>
          </div>
      </div>
    )
  }

  renderDetailedStuff() {
    return (
      <div key={stuff._id} className='col-xl-4 col-sm-6 col-xs-12 m-t-2'>
        <div className="card">
          <img className="card-img-top m-x-auto img-fluid ioplease-stuff-img m-t-1 p-x-1" src={stuff.iconUrl} alt={stuff.name} />
          <div className="card-block">
            <h3 className="card-title"><strong>{stuff.name}</strong> <small className='text-muted'>by {stuff.company}</small></h3>
            <KindsBadges stuffId={stuff._id} />
            <p className="card-text m-y-2">{stuff.description.substr(0, DESCRIPTION_LENGTH) + "..."}</p>
            {_.has(stuff, "popularity") ? <p>Rating: {stuff.popularity}</p> : null}
            <DownloadOptions stuffId={stuff._id} />
            <CompatibleWith stuffId={stuff._id} setQuery={this.props.setQuery} thingId={this.props.thingId} />
          </div>
        </div>
      </div>
    )
  }

  renderStuffRowEvery(stuffs, n) {
    let tStuffs = _.clone(stuffs)
    let rows = []

    while(tStuffs.length) {
      const stuffRow = tStuffs.splice(0, n);
      const row = (
        <div className="row" key={tStuffs.length}>
          {stuffRow.map(this.renderStuff.bind(this))}
        </div>
      )
      rows.push(row)
    }

    return (
      <div key={tStuffs.length}>
        {rows}
      </div>
    )
  }

  renderNoResults() {
    return (
      <div>
        <h1 className="m-t-3">No results found</h1>
        <h2 className='m-t-2 text-muted'>Try modifying your search</h2>
      </div>
    )
  }

  handleLoadMore() {
    Session.set(STUFF_LIMIT, Session.get(STUFF_LIMIT) + 12)
  }

  renderLoadMore() {
    if(this.props.stuffs.length < this.props.totalStuffCount) {
      if(this.props.loadingMore) {
        return <button className="btn btn-outline-primary btn-lg m-t-3 disabled">Loading more results...</button>
      } else {
        return <button onClick={this.handleLoadMore} className="btn btn-outline-primary btn-lg m-t-3">Load more results.</button>
      }
    }
    return null;
  }

  renderStuffs() {
    return (
      <div>
        <h2 className='m-b-2 m-t-2'>{this.props.thingName}</h2>
        <div className='hidden-sm-up'>
          {this.renderStuffRowEvery(this.props.stuffs, 1)}
        </div>
        <div className='hidden-xl-up hidden-xs-down'>
          {this.renderStuffRowEvery(this.props.stuffs, 2)}
        </div>
        <div className='hidden-lg-down'>
          {this.renderStuffRowEvery(this.props.stuffs, 3)}
        </div>

        {this.renderLoadMore()}
      </div>
    );
  }

  render() {
    if(this.props.loading) {
      return <Loading />
    } else {
      if((this.props.stuffs.length === 0) && !this.props.loadingMore) {
        return this.renderNoResults()
      } else {
        return this.renderStuffs()
      }
    }
  }
}

export default createContainer(({query, thingId, setStuffCount, searchResults, setQuery}) => {
  const defaultLimit = 12
  Session.setDefault(STUFF_LIMIT, defaultLimit)

  let loading = true
  let loadingMore = false
  let stuffs = []
  let thingIds = []
  let thingName = ""
  let _thingId = thingId // Necessary for excluding current Thing from list of compatibilities for this stuff

  if(thingId) {
    thingIds = [thingId]
  } else if(searchResults) {
    thingIds = _.map(searchResults, (r) => { return r.objectID })

    // If only one matching Thing, show all stuff for that
    if(searchResults.length === 1) {
      thingName = "Showing results for \"" + searchResults[0].name + "\"."
      _thingId = searchResults[0].objectID
    }
  }

  // Only show Stuffs if there are Things matching query
  if(thingIds) {
    const limit = Session.get(STUFF_LIMIT)

    const stuffsHandle = Meteor.subscribe("stuffs.forThings", thingIds, limit);

    if(stuffsHandle.ready()) {
      stuffs = Stuffs.find({}).fetch()
      loading = false
    } else if(limit > defaultLimit) {
      stuffs = Stuffs.find({}).fetch()
      loading = false
      loadingMore = true
    }
  } else {
    loading = false
  }

  return {
    stuffs,
    loading,
    thingName,
    thingId: _thingId,
    setQuery,
    totalStuffCount: Counts.get(`stuffs.forThings.${thingIds}`),
    loadingMore
  };
}, Results);
