import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';

import {
	DRAWING_STATES,
	MAPBOX_MODES
} from '../../../lib/drawing-states.js';

// Add coordinate labels to #ie-mapa-info
// Set drawingState of parent
export default class MapControlPanel extends Component {

  render() {
    return null;
  }

  componentWillMount() {

    const thiz = this;
    const { map } = this.context;

		map.on('draw.create', e => {
			console.log("on create");
			console.log(e);

			thiz.props.setDrawingState(DRAWING_STATES.DRAWING)
		});

		map.on('draw.modechange', e => {
			console.log('draw.modechange');
			console.log(e);

			let newState = null;

			switch (e.mode) {
				case MAPBOX_MODES.DRAW_POLYGON:
					newState = DRAWING_STATES.DRAFTING;
					break;
			}

			if(newState) {
				thiz.props.setDrawingState(newState);
			}
		})

		// Add coordinates to control panel
		map.on('mousemove', function (e) {
			document.getElementById('ie-mapa-info').innerHTML =
				// e.lngLat is the longitude, latitude geographical position of the event
				'<strong>' + JSON.stringify(e.lngLat) + '</strong>'

				+ '<br />' +

				// e.point is the x, y coordinates of the mousemove event relative
				// to the top-left corner of the map
				JSON.stringify(e.point);
		});

  }
}

MapControlPanel.contextTypes = {
  map: PropTypes.object
};

MapControlPanel.propTypes = {
  setDrawingState: PropTypes.func
};
