import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import LikertQuestionInput from './LikertQuestionInput.jsx';
import { MAPBOX_EVENTS } from '../../../lib/mapbox-events.js';

export default class PolygonCreateModal extends Component {
	handleSubmit(event) {
		const thiz = this;
		event.preventDefault();
		const answers = thiz.getAnswers();

		Meteor.call("polygons.classify", this.props.currentPolygonId, answers, (error, polygonId) => {
			if(error) {
				console.log("error", error);
			}

			thiz.clearAnswers();
			$("#polygonQuestionnaireModal").modal("hide");
		})
	}

	getAnswers() {
		return _.map(this.props.questions, q => {
			const questionId = q._id;
			const questionSelector = 'input[name=likertOption' + questionId + ']:checked';
			const value = $(questionSelector, "#polygonQuestionnaireForm").val();
			return { questionId, value }
		})
	}

	clearAnswers() {
		_.each(this.props.questions, q => {
			const questionId = q._id;
			const questionSelector = 'input[name=likertOption' + questionId + ']:checked';
			$(questionSelector).prop( "checked", false );
		});
	}

	renderQuestions() {
		if(this.props.isLoading) {
			return <h3>Loading...</h3>;
		} else {
			const categories = _.groupBy(this.props.questions, 'category');
			return _.map(categories, this.renderCategory.bind(this));
		}
	}

	renderCategory(questions, category) {
		return (
			<div key={category}>
				<h5>{category}</h5>
				{questions.map(this.renderQuestion.bind(this))}
			</div>
		)
	}

	renderQuestion(question, i) {
		return <LikertQuestionInput
							key={question._id}
							question={question}
							i={i} />;
	}

	renderModalFooter() {
		if(this.props.isLoading) {
			return null;
		} else {
			return (
				<div className="modal-footer">
					<button type="submit" className="btn btn-primary">Submit classification</button>
					<button type="button" className="btn btn-secondary ml-1" data-dismiss="modal">Cancel</button>
				</div>
			);
		}
	}

  render() {
    return (
			<div
				className="modal fade" id="polygonQuestionnaireModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
			  <div className="modal-dialog" role="document">
					<form onSubmit={this.handleSubmit.bind(this)} ref='polygonQuestionnaireForm' id='polygonQuestionnaireForm'>

				    <div className="modal-content">
				      <div className="modal-header">
				        <h5 className="modal-title">Classify this polygon</h5>
				        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
				          <span aria-hidden="true">&times;</span>
				        </button>
				      </div>
				      <div className="modal-body">
								{this.renderQuestions()}
				      </div>
							{this.renderModalFooter()}
				    </div>
					</form>
			  </div>
			</div>
		);
  }
}

PolygonCreateModal.propTypes = {
	isLoading: PropTypes.bool,
	currentPolygonId: PropTypes.string,
	questions: PropTypes.array,
};
