import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';

export default class MapboxGLCoords extends Component {

  render() {
    return null;
  }

  componentWillMount() {
    const thiz = this;
    const { map } = this.context;

		map.on('mousemove', function (e) {
			console.log('mouse move');
	    document.getElementById('ie-mapa-info').innerHTML =
				// e.lngLat is the longitude, latitude geographical position of the event
				'<strong>' + JSON.stringify(e.lngLat) + '</strong>'

				+ '<br />' +

        // e.point is the x, y coordinates of the mousemove event relative
        // to the top-left corner of the map
        JSON.stringify(e.point)
        ;
		});
  }

  componentWillUnmount() {
    const { map } = this.context;

    map.remove(this.state.draw);
  }

}

MapboxGLCoords.contextTypes = {
  map: PropTypes.object
};
