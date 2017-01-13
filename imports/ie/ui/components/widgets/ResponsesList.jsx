import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';

export default class ResponsesList extends Component {
	activeClass(response) {
		return response.userId === this.props.currentUserId ? "nav-link active" : "nav-link";
	}

	handlClick(e, response) {
		e.preventDefault();
		this.props.setCurrentUserId(response.userId);
	}

	renderResponse(response) {
		return (
			<li className="nav-item" key={response._id}>
		    <a
					className={this.activeClass(response)}
					href="#"
					onClick={e => { this.handlClick(e, response) }}>{response.username}</a>
		  </li>
		)
	}

	render() {
		if(this.props.isLoading) {
			return <h4>Loading...</h4>
		} else {
			const responses = this.props.responses;
			if(responses.length > 0) {
				return (
					<ul className="nav nav-pills justify-content-center">
					  {responses.map(this.renderResponse.bind(this))}
					</ul>
				)
				return
			} else {
				return <h4 className="text-xs-center mt-2">There are no responses to this polygon yet.</h4>
			}
		}
	}
}

ResponsesList.propTypes = {
	responses: PropTypes.array,
	isLoading: PropTypes.bool,
	currentUserId: PropTypes.string,
	setCurrentUserId: PropTypes.func
}
