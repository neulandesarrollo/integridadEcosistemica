import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Classifications } from '../../common/collections/classifications.js';
import { Kinds } from '../../common/collections/kinds.js';

class KindsBadges extends Component {

  renderBadge(kind) {
    return <span className="tag tag-default m-r-1 p-a-1" key={kind._id}><i className={"fa fa-" + kind.iconUrl} title={kind.name}></i>&nbsp;&nbsp;{kind.name}</span>
  }

  render() {
    if(this.props.loading) {
      return <h1>Loading...</h1>
    } else {
      return (
        <div className='m-t-2 m-x-auto'>
          {this.props.kinds.map(this.renderBadge.bind(this))}
        </div>
      );
    }
  }
}

export default createContainer(({stuffId}) => {
  let loading = true;
  let kinds = [];

  const classHandle = Meteor.subscribe("classifications", stuffId)
  const kindsHandle = Meteor.subscribe("kinds", stuffId);

  if(classHandle.ready() && kindsHandle.ready()) {
    const classifications = Classifications.find({stuffId})
    const kindIds = classifications.map(classification => { return classification.kindId })

    loading = false
    kinds =  Kinds.find({_id: {$in: kindIds}}).fetch()
  }

  return {
    kinds,
    loading
  };
}, KindsBadges);
