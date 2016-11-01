import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Classifications } from '../../common/collections/classifications.js';
import { Kinds } from '../../common/collections/kinds.js';

class KindsBadges extends Component {
  renderBadge(classification) {
    if(this.props.linksEnabled) {
      return (
        <li className="text-muted list-inline-item p-x-1" key={classification._id}>
          <a href={"/ioplease?k=" + classification.kindId}>
            <img className="img-fluid kind-thumbnail img-circle m-x-auto" src={"/ioplea.se/kinds/" + classification.kindIconUrl} />
            <span className='m-x-auto'>{classification.kindName}</span>
          </a>
        </li>
      )
    } else {
      return (
        <li className="text-muted list-inline-item p-x-1" key={classification._id}>
          <span className='m-x-auto'>{classification.kindName}</span>
        </li>
      )
    }
  }

  render() {
    if(this.props.loading) {
      return null
    } else {
      return (
        <ul className="list-inline m-t-2 m-x-auto">
          {this.props.classifications.map(this.renderBadge.bind(this))}
        </ul>
      );
    }
  }
}

export default createContainer(({stuffId, linksEnabled}) => {
  let loading = true;
  let classifications = [];
  let _linksEnabled = false

  if(linksEnabled)
    _linksEnabled = true

  const classHandle = Meteor.subscribe("classifications", stuffId)

  if(classHandle.ready()) {
    classifications = _.shuffle(Classifications.find({stuffId}).fetch())
    loading = false
  }

  return {
    classifications,
    linksEnabled: _linksEnabled,
    loading
  };
}, KindsBadges);
