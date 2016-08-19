import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Controllers } from '../../common/collections/controllers.js';

class ControllersCheckboxes extends Component {
  renderCheckbox(cont) {
    return (
      <label className="form-check-inline m-l-0 m-r-3" key={cont._id}>
        <input className="form-check-input" type="checkbox" id={cont._id} value={cont._id}  name="controllers" /> {cont.name}
      </label>
    )
  }

  render() {
    if(this.props.loading) {
      return <h1>Loading...</h1>
    } else {
      return (
        <div>
          { this.props.controllers.map(this.renderCheckbox.bind(this)) }
        </div>
      );
    }
  }
}

export default createContainer(() => {
  let loading = true;
  let controllers = [];

  const contHandle = Meteor.subscribe("controllers")

  if(contHandle.ready()) {
    controllers = Controllers.find({}, {sort: {name: 1}}).fetch()

    loading = false;
  }

  return {
    controllers,
    loading
  };
}, ControllersCheckboxes);
