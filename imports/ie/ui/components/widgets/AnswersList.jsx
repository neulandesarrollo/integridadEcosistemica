import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';

export default class AnswersList extends Component {
	render() {
		return (
			<div>
				<h4 className="mt-1">Browse Answers</h4>

				{this.renderAnswers()}
			</div>
		);
	}

	renderAnswers() {
		if(this.props.isLoading) {
			return <h1>Loading...</h1>
		} else {
			return <h1>answers go here</h1>
		}
	}
}

AnswersList.propTypes = {
	answers: PropTypes.array,
	isLoading: PropTypes.bool
}
