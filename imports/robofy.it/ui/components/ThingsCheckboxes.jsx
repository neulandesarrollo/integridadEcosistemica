import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Things } from '../../common/collections/things.js';

class ThingsCheckboxes extends Component {
  renderCheckbox(thing) {
    return (
      <label className="form-check-inline m-l-0 m-r-3" key={thing._id}>
        <input className="form-check-input" type="checkbox" id={thing._id} value={thing._id} name="things" /> {thing.name}
      </label>
    )
  }

  render() {
    if(this.props.loading) {
      return <h1>Loading...</h1>
    } else {
      return (
        <div className="form-group">
          { this.props.things.map(this.renderCheckbox.bind(this)) }
        </div>
      );
    }
  }
}

export default createContainer(() => {
  let loading = true;
  let things = [];

  const thingsHandle = Meteor.subscribe("things")

  if(thingsHandle.ready()) {
    things = Things.find({}, {sort: {name: 1}}).fetch()

    loading = false;
  }

  return {
    things,
    loading
  };
}, ThingsCheckboxes);
