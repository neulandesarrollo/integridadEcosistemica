import { Meteor } from 'meteor/meteor';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Navbar } from '../components/Navbar.jsx';
// import PolygonFormContainer from '../containers/PolygonFormContainer.jsx';

export default class IndexPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <div>
        <Navbar />
      </div>
    );
  }
}

IndexPage.propTypes = {
};
