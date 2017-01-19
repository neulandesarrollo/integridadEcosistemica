import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import { ReactiveVar } from 'meteor/reactive-var';

import { polygonStyles } from '../../../lib/mapbox-styles.js';
import { MAPBOX_EVENTS, MAPBOX_MODES } from '../../../lib/mapbox-events.js';
import { DRAWING_STATES } from '../../../lib/drawing-states.js';

export default class MapboxGLDraw extends Component {
  constructor(props) {
    super(props);

    this.state = {
      draw: undefined
    };
  }

	componentWillReceiveProps(nextProps) {
		switch(nextProps.drawingState) {
			case DRAWING_STATES.VIEWING:
				this.state.draw.changeMode(MAPBOX_MODES.STATIC);
				break;
			case DRAWING_STATES.SWITCHING:
				if(this.state.draw)
					this.state.draw.deleteAll();
				break;
		}
	}

	// Does not need to render any HTML
	// All interaction through Mapbox GL JS API
  render() {
    return null;
  }

	// Add MapboxDraw control to map.
	// Adds listeners to update the parent component's currentPolygon
  componentWillMount() {
    const thiz = this;
    const { map } = this.context;

		// What type of drawing is permitted.
		// We only want to let users draw polygons.
    const controls = {
      point: false,
			line_string: false,
			polygon: true,
			trash: false,
			combine_features: false,
			uncombine_features: false
    };

    const draw = new MapboxDraw({ controls, styles: polygonStyles });

    map.on(MAPBOX_EVENTS.LOAD, () => {
      map.addControl(draw, 'bottom-right');
    });

		// After first point clicked
		map.on(MAPBOX_EVENTS.CREATE, e => {
			console.log("on create");
			console.log(e);
			// this.props.consumeMapboxEvent(MAPBOX_EVENTS.CREATE)
			// draw.changeMode("direct_select");
		});

		// Polygon updated
		map.on(MAPBOX_EVENTS.DRAW.UPDATE, e => {
			const feature = e.features[0];
			thiz.setFeatureAsPolygon(feature);
		});

		// MapboxGLDraw mode change
		map.on(MAPBOX_EVENTS.DRAW.MODECHANGE, e => {

			const feature = draw.getAll().features[0];

			switch (e.mode) {
				case MAPBOX_MODES.SIMPLE_SELECT:
					thiz.setFeatureAsPolygon(feature);
					if(thiz.state.draw)
						thiz.state.draw.deleteAll();
					break;
			}
		});

    this.setState({draw});
  }

  componentWillUnmount() {
    const { map } = this.context;

    map.remove(this.state.draw);
    this.setState({draw: undefined});
  }

	// Transfrom a Feature from Mapbox to internal representation for a Polygon
	setFeatureAsPolygon(feature) {
		this.props.setCurrentPolygon({
			geoJSON: {
				type: feature.type,
				geometry: {
					type: feature.geometry.type,
					coordinates: feature.geometry.coordinates[0]
				}
			}
		});
	}
}

MapboxGLDraw.contextTypes = {
  map: PropTypes.object
};

MapboxGLDraw.propTypes = {
	setCurrentPolygon: PropTypes.func,
	drawingState: PropTypes.string,
	consumeMapboxEvent: PropTypes.func
};
