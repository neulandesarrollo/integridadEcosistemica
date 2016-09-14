import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Accounts } from '../../startup/accounts.js';
// import { Accounts } from 'meteor/std:accounts-ui';

export default class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <div className="container">
        <div className="col-xs-10 col-md-6 offset-md-3 m-y-3">
          <h1>Login</h1>
          <Accounts.ui.LoginForm />
        </div>
      </div>
    );
  }
}

LoginPage.propTypes = {
};
