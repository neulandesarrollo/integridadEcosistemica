import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';

import MapboxDraw from '@mapbox/mapbox-gl-draw';

// import { polygonLineStyles } from '../../../common/mapbox-polygon-line-styles.js'

export default class MapboxGLDraw extends Component {
  constructor(props) {
    super(props);

    this.state = {
      draw: undefined
    };
  }

  render() {
    return <div></div>
  }

  componentWillMount() {
    const thiz = this;
    const { map } = this.context;

    const controls = {
      point: false,
			line_string: false,
			polygon: true,
			trash: true,
			combine_features: false,
			uncombine_features: false
    };

    const draw = new MapboxDraw({ controls });

    map.on('load', () => {
      map.addControl(draw, 'bottom-right')
    });


    this.setState({draw})
  }

  componentWillUnmount() {
    const { map } = this.context;

    map.remove(this.state.draw);
    this.setState({draw: undefined})
  }

}

MapboxGLDraw.contextTypes = {
  map: PropTypes.object
};
