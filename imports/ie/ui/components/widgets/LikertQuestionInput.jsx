import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';

export default class LikertQuestionInput extends Component {
	renderLabel(label, i, question) {
		return (
			<label className="form-check-inline ml-0 mr-1" key={i}>
				<input
					className="form-check-input"
					type="radio"
					name={"likertOption" + question._id}
					id={"likertOption" + i}
					value={i} /> {label}
			</label>
		);
	}

  render() {
		const question = this.props.question;
		const i = this.props.i + 1;
    return (
			<fieldset className="form-group mt-1">
				<label><strong>{i}: {question.text}</strong></label><br />
				{
					question.answers.map((score, i) => {
						return this.renderLabel(score, i, question);
					})
				}
			</fieldset>
		);
  }
}

LikertQuestionInput.propTypes = {
	question: React.PropTypes.object,
	i: React.PropTypes.number
};
