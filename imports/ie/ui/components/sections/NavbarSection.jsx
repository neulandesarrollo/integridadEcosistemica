import React, { Component } from 'react';
import { Accounts, STATES } from 'meteor/std:accounts-ui';

export default class NavbarSection extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-inverse navbar-full">
        <button className="navbar-toggler hidden-lg-up" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"></button>
        <div className="collapse navbar-toggleable-md" id="navbarResponsive">
          <a className="navbar-brand" href="/ie">
            <img src="/ie/logo-navbar.png" className="d-inline-block align-top" alt="Integridad Ecosistemica" />
          </a>
          <ul className="nav navbar-nav float-right">
            <li className="nav-item active">
              <a className="nav-link" href="/ie">Nosotros <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/ie/mapa">Mapa</a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

NavbarSection.propTypes = {
  currentPath: React.PropTypes.string,
  user: React.PropTypes.object
};
