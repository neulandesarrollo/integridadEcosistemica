import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import Moment from 'moment';

import { DRAWING_STATES } from '../../../lib/drawing-states.js';

export default class PolygonsList extends Component {
	render() {
		return (
			<div>
				<h4 className="mt-1">Browse Polygons</h4>

					<div id="polygons-accordion" role="tablist" aria-multiselectable="true">

						{this.props.polygons.map(this.renderPolygon.bind(this))}
	  			</div>
			</div>
		);
	}

	polygonDivID(polygon) {
		return "collapse-" + polygon._id;
	}

	stringTime(date) {
		return Moment(date).format("MMM Do YY");;
	}

	renderPolygon(polygon) {
		return (
			<div className="card" key={polygon._id}>
				<div className="card-header" role="tab" id={polygon._id}>
					<h5 className="mb-0">
						<a
							onClick={e => {this.handleClick(e, polygon)}}
							data-toggle="collapse"
							data-parent="#polygons-accordion"
							href={"#" + this.polygonDivID(polygon)}
							aria-expanded="true"
							aria-controls={this.polygonDivID(polygon)}>

							{polygon.name}
						</a>
					</h5>
				</div>

				<div id={this.polygonDivID(polygon)} className="collapse show" role="tabpanel" aria-labelledby={polygon._id}>
					<div className="card-block">
						<dl>
							<dt>ID</dt>
							<dd>{polygon._id}</dd>

							<dt>Creator</dt>
							<dd>{polygon.username}</dd>

							<dt>Created</dt>
							<dd>{this.stringTime(polygon.createdAt)}</dd>

							<dt>Num respondents</dt>
							<dd>{polygon.numResponses}</dd>

							<dt>Last response</dt>
							<dd>{this.stringTime(polygon.lastRespondedAt)}</dd>
						</dl>

					</div>
				</div>
			</div>
		)
	}

	handleClick(event, polygon) {
		event.preventDefault();
		this.props.setCurrentPolygon(polygon, polygon._id);
		this.props.consumeMapboxEvent(DRAWING_STATES.SWITCHING)
	}
}

PolygonsList.propTypes = {
	polygons: PropTypes.array,
	setCurrentPolygon: PropTypes.func,
	consumeMapboxEvent: PropTypes.func
}
