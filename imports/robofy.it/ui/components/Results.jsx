import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown'
import { piwik } from 'meteor/marvin:piwik-http-sandstorm';

import KindsBadges from './KindsBadges.jsx';
import Loading from './Loading.jsx';

const STUFF_LIMIT = 'session-stuff-limit'
const STUFF_SORT = 'session-stuff-sort'
const SORTABLES = {
  "updatedAt": "Date",
  "name": "Name",
  "numCompats": "Compatibilities"
}
const DESCRIPTION_LENGTH = 160

export class Results extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showThingDetails: false
    }
  }

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

  renderNumCompats(n) {
    return n === 1 ? n + " compatibility" : n + " compatibilities"
  }

  renderStuff(stuff) {
    // Shorten description and ensure exactly three trailing periods
    const description = (stuff.description.substr(0, DESCRIPTION_LENGTH) + "...").replace(/[\.*\s*]*$/, "...")
    // const path = Meteor.absoluteUrl("stuff/" + stuff._id + "/#disqus_thread"); // don't include first slash

    return (
      <div key={stuff._id} className='col-xl-4 col-sm-6 col-xs-12 m-t-2'>
          <div className="card">
            <a href={"/stuff/" + stuff._id} className="stuff-card">
              <img className="card-img-top m-x-auto img-fluid ioplease-stuff-img m-t-1 p-x-1" src={stuff.iconUrl} alt={stuff.name} />
              <div className="card-block">
                <h4 className="card-title"><strong>{stuff.name}</strong> <small className='text-muted'>by {stuff.company}</small></h4>
                <div className="row">
                  <div className="col-xs-12 text-xs-center">
                    {this.renderNumCompats(stuff.numCompats)}
                  </div>
                </div>
                <KindsBadges stuffId={stuff._id} />
                <p className="card-text m-y-2">{description}</p>
                <button className="btn btn-outline-info btn-lg">Learn More</button>
            </div>
            </a>
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

  renderThingDetailsButton() {
    if(this.props.thingSelected) {
      if(this.props.onlyThing) {
        return (
          <div>
            <h4 className='m-b-1 m-t-1'>{"Showing results for " + this.props.thingName}</h4>
            <button className='btn btn-link m-b-2' onClick={this.toggleDetails.bind(this)}>IoThing details</button>
          </div>
        )
      } else {
        return (
          <button className='btn btn-link m-t-1' onClick={this.toggleDetails.bind(this)}>{this.props.thingName + " details"}</button>
        )
      }
    } else {
      return null
    }
  }

  toggleDetails() {
    this.setState({showThingDetails: !this.state.showThingDetails})
  }

  renderThingDetails() {
    if(this.props.thing && this.state.showThingDetails) {
      return (
        <div className="row">
          <div className="col-xs-12 col-sm-3">
            <img className="img-fluid m-b-1 m-x-auto" src={this.props.thing.iconUrl} />
          </div>
          <div className="col-xs-12 col-sm-9">
            <h4 className="text-muted">{"by " + this.props.thing.company}</h4>
            <ReactMarkdown source={this.props.thing.description} />
            <a href={this.props.thing.url} target="_blank" className="btn btn-primary btn-small m-b-1">Learn more</a>
          </div>
        </div>
      )
    }
    return null;
  }

  currentSort() {
    const sort = Session.get(STUFF_SORT)
    return SORTABLES[sort]
  }

  changeSort(event) {
    const newSort = event.target.value
    Session.set(STUFF_SORT, newSort)
    FlowRouter.setQueryParams({s: newSort});
    piwik.trackAction('ioplease', 'sort')
  }

  renderSortOptions() {
    const thiz = this
    const sort = Session.get(STUFF_SORT)
    const sortables = _.clone(SORTABLES)
    delete sortables[sort]

    return _.map(sortables, (name, key) => {
      return <button className="dropdown-item" type="button" key={key} value={key} onClick={thiz.changeSort.bind(thiz)}>{name}</button>
    })
  }

  renderSortButton() {
    return (
      <div className="dropdown pull-right m-r-1 m-t-1">
        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          {this.currentSort()}
        </button>
        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
          {this.renderSortOptions()}
        </div>
      </div>
    )
  }

  renderStuffs() {
    return (
      <div>
        {this.renderThingDetailsButton()}
        {this.renderThingDetails()}
        {this.renderSortButton()}
        <div className="clearfix"></div>
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