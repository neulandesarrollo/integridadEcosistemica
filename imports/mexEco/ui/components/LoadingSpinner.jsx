import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';

export class LoadingSpinner extends Component {
  render() {
    return (
      <h3 className='m-y-2 text-xs-center'><i className="fa fa-refresh fa-spin fa-3x fa-fw"></i>
<span className="sr-only">Loading...</span></h3>
    )
  }
}
