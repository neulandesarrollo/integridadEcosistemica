import React, { Component } from 'react';
import { Accounts, STATES } from 'meteor/std:accounts-ui';

export default class NavbarSection extends Component {
  activeClass(componentPath, baseClass) {
    return (componentPath === this.props.currentPath) ? baseClass + " active" : baseClass;
  }


  handleSignup(event) {
    event.preventDefault()
    const email = event.target.email.value;
    const password = event.target.password.value;

  }

  renderTabs() {
    if(!!this.props.user) {
      return (
        <li className={this.activeClass("signup", "nav-item")}>
          <a className="nav-link" href="/profile">{this.props.user.emails[0].address}</a>
        </li>
      );
    } else {
      return (
        <li className={this.activeClass("signup", "nav-item")}>
          <a className="nav-link" href="/join">Sign Up <span className="sr-only">(current)</span></a>
        </li>
      )
    }
  }

  render() {
    return (
      <div className="navbar-section">
        <nav className="navbar navbar-light bg-faded">
          <button className="navbar-toggler hidden-lg-up" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"></button>
          <div className="collapse navbar-toggleable-md" id="navbarResponsive">
            <a className="navbar-brand" href="/robofy.it">Robofy</a>
            <ul className="nav navbar-nav">
              {this.renderTabs()}
            </ul>
            <form className="form-inline float-lg-right">
              <input className="form-control mr-1" type="text" placeholder="Email address" />
              <button className="btn btn-outline-success" type="submit">Sign In</button>
            </form>
          </div>
        </nav>
      </div>
    );
  }
}

NavbarSection.propTypes = {
  currentPath: React.PropTypes.string,
  user: React.PropTypes.object
};
