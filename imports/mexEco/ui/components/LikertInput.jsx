import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';

import { SCORES } from '../../client/constants.js';

export class LikertInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  renderLabel(label, i, question) {
    return (
      <label className="form-check-inline" key={i}>
        <input
          className="form-check-input"
          type="radio"
          name={"likertOption" + question._id}
          id={"likertOption" + i}
          value={i} /> {label}
      </label>
    )
  }

  render() {
    const question = this.props.question
    const i = this.props.i + 1
    return (
      <fieldset className="form-group m-t-1">
        <label><strong>{i}: {question.text}</strong></label><br/>
        {
          question.answers.map((score, i) => { return this.renderLabel(score, i, question) })
        }
      </fieldset>
    );
  }
}

LikertInput.propTypes = {
  question: React.PropTypes.object,
  i: React.PropTypes.number
};
