import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

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
      <div key={stuff._id} className='col-lg-4 col-sm-6 col-xs-12 m-t-2'>
        <a href="#" className='stuff-card' target="_blank">
          <div className="card">
            <img className="card-img-top m-x-auto img-fluid ioplease-stuff-img m-t-1" src={stuff.iconUrl} alt={stuff.name} />
            <div className="card-block">
              <h4 className="card-title"><strong>{stuff.name}</strong> <small className='text-muted'>by {stuff.company}</small></h4>
              <p className="card-text">{stuff.description}</p>
              {_.has(stuff, "version") ? <p>Version: {stuff.version}</p> : null}
              {_.has(stuff, "popularity") ? <p>Rating: {stuff.popularity}</p> : null}
              {_.has(stuff, "updatedAt") ? <p>Updated: {stuff.updatedAt}</p> : null}
              <KindsBadges stuffId={stuff._id} />
            </div>
          </div>
        </a>
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

  render() {
    if(this.props.loading) {
      return <Loading />
    } else {
      return (
        <div>
          <h2 className='m-b-2 m-t-3'></h2>
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
  }
}
export default createContainer(({query, thingId, setStuffCount}) => {
  let loading = true;
  let stuffs = [];
  const compatsHandle = Meteor.subscribe("compatibilities");

  if(compatsHandle.ready() && thingId) {
    const compats = Compatibilities.find({thingId}).fetch().map(compat => { return compat.stuffId })
    const stuffsHandle = Meteor.subscribe("stuffs.list", compats);

    if(stuffsHandle.ready()) {
      loading = false;
      stuffs = Stuffs.find().fetch()
    }
  }

  return {
    stuffs,
    loading
  };
}, Results);
