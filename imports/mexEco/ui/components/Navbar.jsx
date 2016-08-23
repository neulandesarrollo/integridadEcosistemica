import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';

export class Navbar extends Component {
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
          <li className="nav-item active">
            <a className="nav-link" href="/integridad-ecosistemica">Nosotros</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Mapa</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Súmate</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/contacto">Contacto</a>
          </li>
        </ul>
      </nav>
    );
  }
}
