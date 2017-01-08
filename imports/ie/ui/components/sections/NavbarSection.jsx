import React, { Component, PropTypes } from 'react';
import { Accounts, STATES } from 'meteor/std:accounts-ui';

export default class NavbarSection extends Component {
	handleLogOut(e) {
		e.preventDefault();
		Meteor.logout();
	}

	renderAccountLink() {
		if(!!this.props.user) {
			return <a className="nav-link" href="#" onClick={this.handleLogOut.bind(this)}>Sign out</a>
		} else {
			return <a className="nav-link" href="/login">Login</a>
		}
	}

  render() {
    return (
      <nav className="navbar navbar-dark bg-inverse navbar-full">
        <button className="navbar-toggler hidden-sm-up" type="button" data-toggle="collapse" data-target="#ieNavbar" aria-controls="ieNavbar" aria-expanded="false" aria-label="Toggle navigation"></button>
        <div className="collapse navbar-toggleable-xs" id="ieNavbar">
          <a className="navbar-brand" href="/ie">
            <img src="/ie/logo-navbar.png" className="d-inline-block align-top" alt="Integridad Ecosistemica" />
          </a>
          <ul className="nav navbar-nav float-sm-right">
            <li className="nav-item active">
              <a className="nav-link" href="/ie">Nosotros <span className="sr-only">(current)</span></a>
            </li>
						<li className="nav-item">
              <a className="nav-link" href="/ie/mapa">Mapa</a>
            </li>
						<li className="nav-item">
							{this.renderAccountLink()}
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

NavbarSection.propTypes = {
  currentPath: PropTypes.string,
  user: PropTypes.object
};
