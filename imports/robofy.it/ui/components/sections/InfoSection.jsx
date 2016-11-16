import React, { Component } from 'react';

export default class InfoSection extends Component {
  render() {
    return (
      <div className="info-section text-xs-center py-3 text-white">
        <h1 className="">Robofy</h1>
        <h2 className="mt-2">Build smart things.</h2>
        <h2>Show them off.</h2>
        <button className="btn btn-primary mt-3 btn-lg">Start machinating</button>
      </div>
    );
  }
}

InfoSection.propTypes = {
};
