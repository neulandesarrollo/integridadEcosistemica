import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Compatibilities } from '../../common/collections/compatibilities.js';

class CompatibleWith extends Component {
  renderCompat(compat) {
    const thiz = this;
    return <button className='btn btn-link btn-sm' key={compat._id} onClick={(event) => {
        event.preventDefault()
        thiz.props.setQuery(compat.thingName, compat.thingId)
      }}>{compat.thingName}</button>
  }

  render() {
    if(!this.props.loading && (this.props.compats.length > 0)) {
      return (
        <div>
          <h5 className='m-t-1'><strong>Compatible With</strong></h5>
          {this.props.compats.map(this.renderCompat.bind(this))}
        </div>
      );
    }
    return null
  }
}

export default createContainer(({stuffId, setQuery, thingId}) => {
  let loading = true;
  let compats = [];
  let compatsHandle

  if(thingId) {
    compatsHandle = Meteor.subscribe("compatibilities.forStuffThing", stuffId, thingId)
  } else {
    compatsHandle = Meteor.subscribe("compatibilities.forStuff", stuffId)
  }

  if(compatsHandle.ready()) {
    compats = Compatibilities.find({stuffId}, {sort: {thingName: 1}}).fetch()
    loading = false;
  }

  return {
    compats,
    loading,
    setQuery
  };
}, CompatibleWith);
