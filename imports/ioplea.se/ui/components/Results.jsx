import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import DownloadOptions from './DownloadOptions.jsx';
import KindsBadges from './KindsBadges.jsx';
import Loading from './Loading.jsx';

import { Stuffs } from '../../common/collections/stuffs.js';
import { Compatibilities } from '../../common/collections/compatibilities.js';

class Results extends Component {
  renderOptional(stuff, fieldName, title) {
    return _.has(stuff, fieldName) ? <p>{title}: {stuff[fieldName]}</p> : null;
  }

  componentWillReceiveProps(newProps) {
    const currentStuffsL = this.props.stuffs.length
    const newStuffsL = newProps.stuffs.length

    if(currentStuffsL !== newStuffsL) {
      this.props.setStuffCount(newStuffsL)
    }
  }

  renderStuff(stuff) {
    return (
      <div key={stuff._id} className='col-xl-4 col-sm-6 col-xs-12 m-t-2'>
        <div className="card">
          <img className="card-img-top m-x-auto img-fluid ioplease-stuff-img m-t-1" src={stuff.iconUrl} alt={stuff.name} />
          <div className="card-block">
            <h3 className="card-title"><strong>{stuff.name}</strong> <small className='text-muted'>by {stuff.company}</small></h3>
            <p className="card-text m-y-2">{stuff.description}</p>
            {_.has(stuff, "popularity") ? <p>Rating: {stuff.popularity}</p> : null}
            <DownloadOptions stuffId={stuff._id} />
            <KindsBadges stuffId={stuff._id} />
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

  renderStuffs() {
    return (
      <div>
        <h2 className='m-b-2 m-t-3'>{this.props.thingName}</h2>
        <div className='hidden-sm-up'>
          {this.renderStuffRowEvery(this.props.stuffs, 1)}
        </div>
        <div className='hidden-lg-up hidden-xs-down'>
          {this.renderStuffRowEvery(this.props.stuffs, 2)}
        </div>
        <div className='hidden-md-down'>
          {this.renderStuffRowEvery(this.props.stuffs, 3)}
        </div>
      </div>
    );
  }

  render() {
    if(this.props.loading) {
      return <Loading />
    } else {
      if(this.props.stuffs.length === 0 ) {
        return this.renderNoResults()
      } else {
        return this.renderStuffs()
      }
    }
  }
}
export default createContainer(({query, thingId, setStuffCount, thingName, searchResults}) => {
  console.log("Start debugging");
  console.log(searchResults);

  let loading = true
  let stuffs = []
  let thingIds = []

  if(thingId) {
    thingIds = [thingId]
  } else if(searchResults) {
    thingIds = _.map(searchResults, (r) => { return r._id })
  }

  // Only show Stuffs if there are Things matching query
  if(thingIds) {
    const stuffsHandle = Meteor.subscribe("stuffs.forThings", thingIds);

    if((thingName !== undefined) && (thingName !== query)) {
      thingName = "Showing results for \"" + thingName + "\"."
    } else {
      thingName = ""
    }

    if(stuffsHandle.ready()) {
      stuffs = Stuffs.find({}).fetch()
      setStuffCount(stuffs.length)
      loading = false
    }
  } else {
    loading = false
  }

  return {
    stuffs,
    loading,
    thingName
  };
}, Results);
