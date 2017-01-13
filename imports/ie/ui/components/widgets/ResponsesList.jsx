import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';

export default class ResponsesList extends Component {
	render() {
		return (
			<div>
				<h4 className="mt-1">Browse Responses</h4>

				{this.renderResponses()}
			</div>
		);
	}

	renderResponses() {
		if(this.props.isLoading) {
			return <h1>Loading...</h1>
		} else {
			return <h1>responses go here</h1>
		}
	}
}

ResponsesList.propTypes = {
	responses: PropTypes.array,
	isLoading: PropTypes.bool,
}
