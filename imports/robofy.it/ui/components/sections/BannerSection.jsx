import React, { Component } from 'react';

export default class BannerSection extends Component {
  render() {
    return (
      <div className="banner-section py-2 text-white">
        <div className="container">
          <h3 className="text-xs-center"><strong>mach•i•nate</strong></h3>
          <h4 className="text-xs-center"><em>(măkˈə-nātˌ, măshˈ-)</em></h4>
          <h5 className="mt-3 text-xs-center">verb.&nbsp;&nbsp;To devise (a plot).</h5>
          <h5 className="mt-1 text-xs-center">verb.&nbsp;&nbsp;To engage in plotting.</h5>
        </div>
      </div>
    );
  }
}

BannerSection.propTypes = {
};
