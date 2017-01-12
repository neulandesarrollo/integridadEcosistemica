import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';

import { DRAWING_STATES } from '../../../lib/drawing-states.js';

export default class PolygonsList extends Component {
	render() {
		return (
			<div>
				<h4>Browse Polygons</h4>

				{this.props.polygons.map(this.renderPolygon.bind(this))}
			</div>
		);
	}

	renderPolygon(polygon) {
		return <h6 key={polygon._id}><button onClick={e => {this.handleClick(e, polygon)}}>{polygon.name}</button></h6>;
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
