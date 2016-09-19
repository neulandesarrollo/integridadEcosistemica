import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { SESSION } from '../../client/constants.js';
import { STATES } from '../pages/MapPage.jsx'

import { LikertInput } from './LikertInput.jsx'
import { LoadingSpinner } from './LoadingSpinner.jsx'

export default class PolygonForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentDidMount() {
    const thiz = this
    console.log('componentDidMount');
    const modal = ReactDOM.findDOMNode(this.refs.insertModal);
    $(modal).on('hide.bs.modal', () => {
      console.log("close modal")
      thiz.props.setDrawState(STATES.SELECTING_MORE)

    });
  }

  submitForm() {
    const form = ReactDOM.findDOMNode(this.refs.polygonForm);
    $(form).submit(this.handleSubmit.bind(this));
    $(form).trigger('submit');
  }

  handleSubmit(event) {
    const thiz = this;
    console.log('handleSubmit');
    console.log(thiz.props.questions);
    event.preventDefault();
    // Find the name field via the React ref
    const name = ReactDOM.findDOMNode(thiz.refs.name).value.trim();
    //
    let polygon = this.props.currentPolygon
    polygon = _.extend(polygon, {name})

    console.log(polygon);

    const answers = thiz.getAnswers()
    console.log('answers');
    console.log(answers);

    Meteor.call("polygons.insert", polygon, answers, (error, polygonId) => {
      console.log('polygons.insert');
      console.log(polygon);
      if(error) {
        console.log("error", error);
      }
      //   Session.set(SESSION.POLYGON, undefined);
      //   // Clear form
        ReactDOM.findDOMNode(thiz.refs.name).value = '';
        $("#insertModal").modal("show")
    });
  }

  // Answers an array of {questionId, val}
  getAnswers() {
    _.map(this.props.questions, q => {
      const questionId = q._id
      const val = $('input[name=likertOption' + questionId + ']:checked', '#polygonForm').val()
      return { questionId, val}
    })
  }

  renderQuestion(question, i) {
    return <LikertInput key={question._id} question={question} i={i} />
  }

  renderQuestions() {
    const questions = this.props.questions
    if(this.props.isLoading && (questions.length > 0)) {
      return <LoadingSpinner />
    } else {
      return questions.map(this.renderQuestion.bind(this))
    }
  }

  renderModalBody() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)} ref='polygonForm' id='polygonForm'>
        <div className="form-group">
          <label htmlFor="name" >What would you like to name this region?</label>
          <input className="form-control" type="text" id="name" ref="name" />
          <small id="nameHelp" className="form-text text-muted">
            Official city, province or colloquial neigborhood name.
          </small>
        </div>

        {this.renderQuestions()}
      </form>
    )
  }

  renderSubmit() {
    if(this.props.isLoading) {
      return (
        <button className="btn btn-secondary btn-block" disabled>Loading...</button>
      )
    } else {
      return (
        <button className="btn btn-primary btn-block" onClick={this.submitForm.bind(this)}>Create region</button>
      )
    }
  }

  render() {
    return (
      <div className="modal fade" id="insertModal" tabIndex="-1" role="dialog" aria-labelledby="insertModal" aria-hidden="true" ref='insertModal'>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
              <h4 className="modal-title">Complete Region details</h4>
            </div>
            <div className="modal-body">
              {this.renderModalBody()}
            </div>
            <div className="modal-footer">
              {this.renderSubmit()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

PolygonForm.propTypes = {
  currentPolygon: React.PropTypes.object,
  isLoading: React.PropTypes.bool,
  setDrawState: React.PropTypes.func,
  questions: React.PropTypes.array,
};
