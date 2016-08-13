import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Classifications } from '../../common/collections/classifications.js';
import { Kinds } from '../../common/collections/kinds.js';

class KindsBadges extends Component {

  renderBadge(classification) {
    return <button className="btn btn-link p-x-1" key={classification._id}>{classification.kindName}</button>
  }

  render() {
    if(this.props.loading) {
      return <h1>Loading...</h1>
    } else {
      return (
        <div className='m-t-2 m-x-auto'>
          {this.props.classifications.map(this.renderBadge.bind(this))}
        </div>
      );
    }
  }
}

export default createContainer(({stuffId}) => {
  let loading = true;
  let classifications = [];

  const classHandle = Meteor.subscribe("classifications", stuffId)

  if(classHandle.ready()) {
    classifications = Classifications.find({stuffId}).fetch()
    loading = false
  }

  return {
    classifications,
    loading
  };
}, KindsBadges);
