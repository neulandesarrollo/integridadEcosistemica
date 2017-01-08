import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

export default class PolygonCreateModal extends Component {
	renderForm() {
		return (
			<form onSubmit={this.handleSubmit.bind(this)} ref='polygonForm' id='polygonForm'>
				<div className="form-group">
					<label htmlFor="name">Name of region</label>
					<input className="form-control" type="text" id="name" ref="name" />
					<small className="form-text text-muted">
						Official city, province, or colloquial name.
					</small>
				</div>

				{this.renderQuestions()}
			</form>
		)
	}

	handleSubmit(event) {
		event.preventDefault();
		console.log("handleSubmit");
	}

	submitForm() {
		console.log('submitFOrm');
		const form = ReactDOM.findDOMNode(this.refs.polygonForm);
		$(form).submit(this.handleSubmit.bind(this));
		$(form).trigger('submit');
	}

	renderQuestions() {
		if(this.props.isLoading) {
			return <h3>Loading...</h3>;
		} else {
			return (
				<div className="modal-footer">
					<button type="button" className="btn btn-primary" onClick={this.submitForm.bind(this)}>Create</button>
					<button type="button" className="btn btn-secondary ml-1" data-dismiss="modal">Cancel</button>
				</div>
			);
		}
	}

	renderModalFooter() {
		if(this.props.isLoading) {
			return null;
		} else {
			return (
				<div className="modal-footer">
					<button type="button" className="btn btn-primary" onClick={this.submitForm.bind(this)}>Create</button>
					<button type="button" className="btn btn-secondary ml-1" data-dismiss="modal">Cancel</button>
				</div>
			);
		}
	}

  render() {
    return (
			<div
				className="modal fade" id="polygonCreateModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
			  <div className="modal-dialog" role="document">
			    <div className="modal-content">
			      <div className="modal-header">
			        <h5 className="modal-title">Create Polygon</h5>
			        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
			          <span aria-hidden="true">&times;</span>
			        </button>
			      </div>
			      <div className="modal-body">
			        {this.renderForm()}
			      </div>
						{this.renderModalFooter()}
			    </div>
			  </div>
			</div>
		);
  }
}

PolygonCreateModal.propTypes = {
	isLoading: PropTypes.bool
};
