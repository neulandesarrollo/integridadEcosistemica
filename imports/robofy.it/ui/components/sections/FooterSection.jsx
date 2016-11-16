import React, { Component } from 'react';

export default class FooterSection extends Component {
  render() {
    return (
      <div className="footer-section py-1">
        <div className="container-fluid">
          Github
          PGP key
          Bitcoin
          Powered by algolia
          Search
          Contact
          CC
        </div>
      </div>
    );
  }
}

FooterSection.propTypes = {
};
