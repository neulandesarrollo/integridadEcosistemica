import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Kinds } from '../../common/collections/kinds.js';

class KindsCheckboxes extends Component {
  renderCheckbox(kind) {
    return (
      <label className="form-check-inline" key={kind._id}>
        <input className="form-check-input" type="checkbox" id={kind._id} value={kind._id} name="kinds" /> {kind.name}
      </label>
    )
  }

  render() {
    if(this.props.loading) {
      return <h1>Loading...</h1>
    } else {
      return (
        <div>
          { this.props.kinds.map(this.renderCheckbox.bind(this)) }
        </div>
      );
    }
  }
}

export default createContainer(() => {
  let loading = true;
  let kinds = [];

  const kindsHandle = Meteor.subscribe("kinds.all")

  if(kindsHandle.ready()) {
    kinds = Kinds.find().fetch()

    loading = false;
  }

  return {
    kinds,
    loading
  };
}, KindsCheckboxes);
