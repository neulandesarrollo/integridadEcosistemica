import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import MapboxDraw from '@mapbox/mapbox-gl-draw';

import { MAPBOX_MODES } from '../../../lib/drawing-states.js';
import { polygonStyles } from '../../../lib/mapbox.js';

export default class MapboxGLDraw extends Component {
  constructor(props) {
    super(props);

    this.state = {
      draw: undefined
    };
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

    map.on('load', () => {
      map.addControl(draw, 'bottom-right');
    });

		// // After first point clicked
		// map.on('draw.create', e => {
		// 	console.log("on create");
		// 	console.log(e);
		// 	// draw.changeMode("direct_select");
		// });

		// Polygon updated
		map.on('draw.update', e => {
			const feature = e.features[0];
			console.log('draw.update');
			console.log(feature);
			thiz.setFeatureAsPolygon(feature);
		});

		// MapboxGLDraw mode change
		map.on('draw.modechange', e => {
			const feature = draw.getAll().features[0];
			console.log('draw.modechange');
			console.log(feature);

			switch (e.mode) {
				case MAPBOX_MODES.SIMPLE_SELECT:
					console.log('will set current feature');
					thiz.setFeatureAsPolygon(feature);
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
	setCurrentPolygon: PropTypes.func
};
