import React, { Component } from 'react';

export default class HeroSection extends Component {
  render() {
    return (
      <div className="featured-machinations text-xs-center py-2">
        <h1 className="">Robofy</h1>
        <h2>Build smart things.</h2>
        <h2>Show them off.</h2>
        <button className="btn btn-primary mt-2 btn-lg">Start inventing</button>
      </div>
    );
  }
}

HeroSection.propTypes = {
};
