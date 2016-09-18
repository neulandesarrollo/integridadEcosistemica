import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';

export class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  navItemClass(name) {
    const path = FlowRouter.current();
    return name === "home" ? "nav-item active" : "nav-item"
  }

  handleLogout(e) {
    // e.preventDefault();
    Meteor.logout()
  }

  renderUser() {
    if(this.props.user) {
      const { user } = this.props
      console.log(user);
      return (
        <li className="nav-item">
          <div className="dropdown">
            <button className="btn btn-link text-muted dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              {user.emails[0].address}
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a className="dropdown-item" href="/profile">Profile</a>
              <button className="dropdown-item" onClick={this.handleLogout.bind(this)}>Logout</button>
            </div>
          </div>
        </li>
      )
    } else {
      return (
        <li className={this.navItemClass("/login")}>
          <a className="nav-link" href="/login">Login</a>
        </li>
      )
    }
  }

  render() {
    console.log('navbar');
    console.log(this.props.user);
    return (
      <nav className="navbar navbar-dark mexEco-navbar navbar-full" id="mexEco-navbar">
        <a className="navbar-brand" href="/integridad-ecosistemica"><img src="mexEco/logo-navbar.png" /></a>
        <ul className="nav navbar-nav pull-xs-right">
          <li className={this.navItemClass("/integridad-ecosistemica")}>
            <a className="nav-link" href="/integridad-ecosistemica">Nosotros</a>
          </li>
          <li className={this.navItemClass("/mapa")}>
            <a className="nav-link" href="/mapa">Mapa</a>
          </li>
          <li className={this.navItemClass("/#")}>
            <a className="nav-link" href="#">Súmate</a>
          </li>
          <li className={this.navItemClass("/contacto")}>
            <a className="nav-link" href="/contacto">Contacto</a>
          </li>
          {this.renderUser()}
        </ul>
      </nav>
    );
  }
}
