import { Meteor } from 'meteor/meteor'
import React, { Component, PropTypes } from 'react'
import ReactMapboxGl from "react-mapbox-gl"

import { STATES } from '../pages/MapPage.jsx'
import { polygonLineStyles } from '../lib/polygon-line-styles.js'

export default class MapboxRegion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPolygon: props.currentPolygon
    };
  }

  componentWillReceiveProps(nextProps) {
    const newPolygon = nextProps.currentPolygon
    const oldPolygon = this.props.currentPolygon
    const { map } = this.context

    if(newPolygon && (oldPolygon !== newPolygon)) {

      this.addPolygonToMap(map, newPolygon)
      console.log(newPolygon.geoJSON.geometry.coordinates[0]);
      map.jumpTo({
        center: newPolygon.geoJSON.geometry.coordinates[0]
      })
    }
  }

  addPolygonToMap(map, polygon) {
    map.addSource(polygon._id, {
      'type': 'geojson',
      'data': {
        'type': 'Feature',
        'properties': {
          'name': polygon.name
        },
        'geometry': {
          'type': 'Polygon',
          'coordinates': [polygon.geoJSON.geometry.coordinates]
        }
      }
    });

    map.addLayer({
      'id': 'route',
      'type': 'fill',
      'source': polygon._id,
      'layout': {},
      'paint': {
      'fill-color': '#088',
      'fill-opacity': 0.8
      }
    });
  }

  handleDraw() {
    FlowRouter.go('/mapa')
  }

  render() {
    return (
      <button
        className="btn btn-primary mexEco-map-button btn-block"
        id='mexEco-draw'
        onClick={this.handleDraw.bind(this)}>Draw</button>
    )
  }
}

MapboxRegion.contextTypes = {
  map: PropTypes.object,
  currentPolygon: PropTypes.object
};
