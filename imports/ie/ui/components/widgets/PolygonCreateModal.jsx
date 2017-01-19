import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import LikertQuestionInput from './LikertQuestionInput.jsx';
import { MAPBOX_EVENTS } from '../../../lib/mapbox-events.js';

export default class PolygonCreateModal extends Component {
	renderForm() {
		return (
				<div className="form-group">
					<label htmlFor="name">Name of region</label>
					<input className="form-control" type="text" id="name" ref="name" />
					<small className="form-text text-muted">
						Official city, province, or colloquial name.
					</small>
				</div>

		)
	}

	handleSubmit(event) {
		const thiz = this;
		event.preventDefault();
		let polygon = this.props.currentPolygon;
		polygon.name = ReactDOM.findDOMNode(thiz.refs.name).value.trim();
		const answers = thiz.getAnswers();

		Meteor.call("polygons.insert", polygon, answers, (error, polygonId) => {

			if(error) {
				console.log("error", error);
			}

			this.props.consumeMapboxEvent(MAPBOX_EVENTS.DRAW.SAVED)
			ReactDOM.findDOMNode(thiz.refs.name).value = '';
			thiz.clearAnswers();
			$("#polygonCreateModal").modal("hide");
		})
	}

	getAnswers() {
		return _.map(this.props.questions, q => {
			const questionId = q._id;
			const value = $('input[name=likertOption' + questionId + ']:checked', "#polygonForm").val();
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

	// submitForm(event) {
	// 	event.preventDefault();
	// 	const form = ReactDOM.findDOMNode(this.refs.polygonForm);
	// 	$(form).trigger('submit');
	// }

	// componentDidMount() {
	// 	const form = ReactDOM.findDOMNode(this.refs.polygonForm);
	// 	$(form).submit(this.handleSubmit.bind(this));
	// }

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
					<button type="submit" className="btn btn-primary">Create Polygon</button>
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
					<form onSubmit={this.handleSubmit.bind(this)} ref='polygonForm' id='polygonForm'>

			    <div className="modal-content">
			      <div className="modal-header">
			        <h5 className="modal-title">Create Polygon</h5>
			        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
			          <span aria-hidden="true">&times;</span>
			        </button>
			      </div>
			      <div className="modal-body">
			        {this.renderForm()}
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
	currentPolygon: PropTypes.object,
	questions: PropTypes.array,
	consumeMapboxEvent: PropTypes.func
};
