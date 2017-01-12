import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';

import { DRAWING_STATES } from '../../../lib/drawing-states.js';
import { MAPBOX_EVENTS } from '../../../lib/mapbox-events.js';

export default class MapboxPolygonSwitcher extends Component {

  render() {
    return null;
  }

	renderLayer() {
		console.log(this.state.map);
		// this.state.map.addLayer({
		// 	'id': this.props.currentPolygon._id,
		// 	'type': 'fill',
		// 	'source': {
		// 			'type': this.props.currentPolygon.geoJSON
		// 	},
		// 	'layout': {},
		// 	'paint': {
		// 			'fill-color': '#088',
		// 			'fill-opacity': 0.8
		// 	}
		// });
	}

	componentWillReceiveProps(nextProps) {
		console.log('MapboxPolygonSwitcher#componentWillReceiveProps');
		console.log(nextProps.drawingState);
		switch(nextProps.drawingState) {
			case DRAWING_STATES.SWITCHING:
				this.renderLayer();
				this.props.consumeMapboxEvent(MAPBOX_EVENTS.DRAW.SWITCHED)
				break;
		}
	}

  componentWillMount() {
		this.setState({ map: this.context });
  }
}

MapboxPolygonSwitcher.contextTypes = {
  map: PropTypes.object
};

MapboxPolygonSwitcher.propTypes = {
  consumeMapboxEvent: PropTypes.func,
	currentPolygon: PropTypes.object,
	drawingState: PropTypes.string
};
