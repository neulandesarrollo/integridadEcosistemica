import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';

export class LoginModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <div className="modal fade" id="login-modal" tabindex="-1" role="dialog" aria-labelledby="loginModal" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
              <h4 className="modal-title" id="myModalLabel">Not logged in</h4>
            </div>
            <div className="modal-body">
              You must log in to do that.
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Continue without editing</button>
              <button type="button" className="btn btn-primary">Log In / Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
