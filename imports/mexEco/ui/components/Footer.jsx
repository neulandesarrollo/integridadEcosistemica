import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';

export class Footer extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <nav className="navbar navbar-dark mexEco-navbar navbar-full" id="mexEco-navbar">
        <a className="navbar-brand" href="/integridad-ecosistemica"><img src="mexEco/logo-navbar.png" /></a>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <a className="nav-link" href="#"><span className="fa fa-google fa-2x"></span></a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#"><span className="fa fa-facebook fa-2x"></span></a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#"><span className="fa fa-twitter fa-2x"></span></a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#"><span className="fa fa-wordpress fa-2x"></span></a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#"><span className="fa fa-rss fa-2x"></span></a>
          </li>
        </ul>
      </nav>
    );
  }
}
