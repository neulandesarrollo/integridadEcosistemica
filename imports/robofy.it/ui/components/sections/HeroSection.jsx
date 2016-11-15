import React, { Component } from 'react';

export default class HeroSection extends Component {
  render() {
    return (
      <div className="hero-section text-xs-center py-3 text-white">
        <h1 className="">Robofy</h1>
        <h2 className="mt-3">Build smart things.</h2>
        <h2>Show them off.</h2>
        <button className="btn btn-primary mt-3 btn-lg">Start inventing</button>
      </div>
    );
  }
}

HeroSection.propTypes = {
};
