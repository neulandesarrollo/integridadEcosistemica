import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';

export default class PolygonCreateModal extends Component {

  render() {
    return (
			<div className="modal fade" id="polygon-create-modal">
			  <div className="modal-dialog" role="document">
			    <div className="modal-content">
			      <div className="modal-header">
			        <h5 className="modal-title">Modal title</h5>
			        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
			          <span aria-hidden="true">&times;</span>
			        </button>
			      </div>
			      <div className="modal-body">
			        <p>Modal body text goes here.</p>
			      </div>
			      <div className="modal-footer">
			        <button type="button" className="btn btn-primary">Save changes</button>
			        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
			      </div>
			    </div>
			  </div>
			</div>
		);
  }

}

PolygonCreateModal.propTypes = {
};
