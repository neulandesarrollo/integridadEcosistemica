import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
// import MapboxGl from "mapbox-gl";
// import Draw from 'mapbox-gl-draw';
import ReactMapboxGl from "react-mapbox-gl";

import MapDraw from '@mapbox/mapbox-gl-draw';

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
}


  // componentWillMount() {
  //   const thiz = this;
  //   const { map } = this.context;
	//
  //   const styles = polygonLineStyles;
	//
  //   const controls = {
  //     point: false,
  //     line_string: false,
  //     polygon: true,
  //     trash: false
  //   };
	//
  //   const draw = MapboxDraw({
  //     controls,
  //     styles,
  //     position: 'bottom-right'
  //   });
	//
  //   map.on('load', () => {
  //     map.addControl(draw)
  //   });
	//
  //   this.setState({draw})
  // }
	//
  // componentWillUnmount() {
  //   const { map } = this.context;
	//
  //   map.remove(this.state.draw);
  //   this.setState({draw: undefined})
  // }



// MapboxGLDraw.contextTypes = {
//   map: PropTypes.object
// };
