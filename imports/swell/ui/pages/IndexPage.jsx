import React, { Component } from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';

export default class IndexPage extends Component {
  componentDidMount() {
    SwellRT.ready(() => {
      console.log("SwellRT is ready to use");
      
    })
  }

  render() {
    const SWELL_URL = "http://" + Meteor.settings.public.SWELL_HOST + "/swellrt.js"
    return (
      <h1>SWELL</h1>
    )
  }
}
