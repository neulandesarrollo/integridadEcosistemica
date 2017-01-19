import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';

export default class AnswersList extends Component {
	renderAnswer(answer) {
		return (
			<div key={answer._id}>
				<dt>{answer.questionText}</dt>
				<dd>{"(" + answer.value + ") " + answer.text}</dd>
			</div>
		)
	}

	render() {
		if(this.props.currentResponseId) {
			if(this.props.isLoading) {
				return <h4>Loading answers...</h4>
			} else {
				return (
					<dl>
						{this.props.answers.map(this.renderAnswer.bind(this))}

					</dl>
				);
			}
		} else {
			return null;
		}
	}
}

AnswersList.propTypes = {
	answers: PropTypes.array,
	isLoading: PropTypes.bool,
	currentResponseId: PropTypes.string
}
