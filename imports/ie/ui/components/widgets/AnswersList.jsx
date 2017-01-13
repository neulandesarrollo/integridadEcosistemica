import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';

export default class AnswersList extends Component {
	renderAnswer(answer) {
		return (
			<div>
				<dt>{answer.questionText}</dt>
				<dd>{answer.value}</dd>
			</div>
		)
	}

	render() {
		if(this.props.currentUserId) {
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
	currentUserId: PropTypes.string
}
