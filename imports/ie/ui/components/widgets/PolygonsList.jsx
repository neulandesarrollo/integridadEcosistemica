import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';

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
		return <h6 key={polygon._id}><button>{polygon.name}</button></h6>;
	}
}


PolygonsList.propTypes = {
	polygons: PropTypes.array
}
