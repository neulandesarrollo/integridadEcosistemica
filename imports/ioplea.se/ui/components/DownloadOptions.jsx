import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Controllings } from '../../common/collections/controllings.js';

class DownloadOptions extends Component {
  renderControlling(cont) {
    return (
      <a key={cont._id} className="btn btn-outline-info m-x-1 m-b-1" href={cont.url} target="_blank">
        <h3><i className={"fa fa-" + cont.controllerIconUrl} title={cont.controllerName}></i></h3>
        <h6>{cont.controllerName}</h6>
      </a>
    )
  }

  render() {
    if(this.props.loading) {
      return <h1>Loading...</h1>
    } else {
      return (
        <div>
          <h5 className='m-b-1'><strong>Get it for</strong></h5>
          {this.props.controllings.map(this.renderControlling.bind(this))}
        </div>
      );
    }
  }
}

export default createContainer(({stuffId}) => {
  let loading = true;
  let controllings = [];

  const contHandle = Meteor.subscribe("controllings", stuffId)

  if(contHandle.ready()) {
    controllings = Controllings.find({stuffId}).fetch()

    loading = false;
  }

  return {
    controllings,
    loading
  };
}, DownloadOptions);
