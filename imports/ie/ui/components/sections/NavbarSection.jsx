import React, { Component } from 'react';
import { Accounts, STATES } from 'meteor/std:accounts-ui';

export default class NavbarSection extends Component {
  render() {
    return (
      <div className="navbar-section">
        <h1>Navbar</h1>
      </div>
    );
  }
}

NavbarSection.propTypes = {
  currentPath: React.PropTypes.string,
  user: React.PropTypes.object
};
