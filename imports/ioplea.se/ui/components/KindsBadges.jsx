import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Kinds } from '../../common/collections/kinds.js';

class KindsBadges extends Component {

  renderBadge(kind) {
    return <h2>{kind.name}</h2>
  }
  render() {
    if(this.props.loading) {
      return <h1>Loading...</h1>
    } else {
      return (
        <div className='m-t-2'>
          {this.props.kinds.map(this.renderBadge.bind(this))}
        </div>
      );
    }
  }
}

export default createContainer(({stuffId}) => {
  console.log("stuffId");
  console.log(stuffId);


  let loading = true;
  let kinds = [];
  const kindsHandle = Meteor.subscribe("kinds", stuffId);

  if(kindsHandle.ready()) {
    loading = false
    kinds = Kinds.find().fetch()
  }

  console.log("kinds");
  console.log(kinds);

  return {
    kinds,
    loading
  };
}, KindsBadges);
