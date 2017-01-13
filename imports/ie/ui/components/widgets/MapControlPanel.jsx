import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';

import { DRAWING_STATES } from '../../../lib/drawing-states.js';
import { MAPBOX_EVENTS } from '../../../lib/mapbox-events.js';

// Add coordinate labels to #ie-mapa-info
// Set drawingState of parent
export default class MapControlPanel extends Component {
	constructor(props) {
    super(props);

    this.state = {
      map: undefined
    };
  }

	// componentWillReceiveProps(nextProps) {
	// 	switch(nextProps.drawingState) {
	// 		case DRAWING_STATES.DRAFTING:
	// 			this.state.map.;
	// 			break;
	// 	}
	// }

  render() {
    return null;
  }

  componentWillMount() {

    const thiz = this;
    const { map } = this.context;

		map.on(MAPBOX_EVENTS.DRAW.CREATE, e => {

			thiz.props.consumeMapboxEvent(MAPBOX_EVENTS.DRAW.CREATE)
		});

		map.on(MAPBOX_EVENTS.DRAW.MODECHANGE, e => {
			this.props.consumeMapboxEvent(e.mode)
		})

		// Add coordinates to control panel
		map.on('mousemove', function (e) {
			document.getElementById('ie-mapa-info').innerHTML =
				// e.lngLat is the longitude, latitude geographical position of the event
				'<strong>' + thiz.round(e.lngLat.lng) + ", " + thiz.round(e.lngLat.lat) + ' (lng, lat)</strong>' +

				'<br />' +

				// e.point is the x, y coordinates of the mousemove event relative
				// to the top-left corner of the map
				'<small> ' + Math.round(e.point.x) + ", " + Math.round(e.point.y) + ' (x, y) </small>';
		});

  }

	round(n) {
		const decimalPrecision = 1000
		return Math.round(n * decimalPrecision) / decimalPrecision
	}
}

MapControlPanel.contextTypes = {
  map: PropTypes.object
};

MapControlPanel.propTypes = {
  consumeMapboxEvent: PropTypes.func
};
