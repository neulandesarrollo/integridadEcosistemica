import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Accounts } from '../../startup/accounts.js';

export class LoginModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentWillUnmount() {
    console.log('modal will unmount');
    $("#login-modal").modal("hide")
  }

  renderTitle() {
    return this.props.user ? "You are now logged in" : "Log In or Sign Up to continue"
  }

  render() {
    return (
      <div className="modal fade" id="login-modal" tabIndex="-1" role="dialog" aria-labelledby="loginModal" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
              <h4 className="modal-title" id="myModalLabel">{this.renderTitle()}</h4>
            </div>
            <div className="modal-body">
              <Accounts.ui.LoginForm />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

LoginModal.propTypes = {
  user: React.PropTypes.object
};
