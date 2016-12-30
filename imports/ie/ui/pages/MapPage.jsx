import React, { Component } from 'react';
import ReactMapboxGl, { Layer, Feature, Popup, ZoomControl } from "react-mapbox-gl";

import { mapboxAccessToken, style } from '../../common/mapbox.js';
import MapboxGLDraw from '../components/widgets/MapboxGLDraw.jsx';

const maxBounds = [
  [-131.109225, 6.866320], // South West
  [-73.887292, 36.041600], // North East
];

const mapHeight = "85vh";
const mapWidth = "100%";

export default class MapPage extends Component {

  constructor(props) {
    super(props)

    this.state = {
      center: [-99.138173, 19.416424],
      zoom: [3],
      skip: 0,
      popupShowLabel: true
    }
  }

  _onZoomClick(map, zoomDiff) {
    const zoom = map.getZoom() + zoomDiff;
    this.setState({ zoom: [zoom] });
  }

  _onClick(map, event) {
    console.log("click");
    console.log(event);
  }

  render() {
    return (
      <div id="ie-map" className="container-fluid pl-0">
        <div className="col-lg-9 col-md-8 col-xs-12 pl-0">
          <ReactMapboxGl
            style={style}
            center={this.state.center}
            zoom={this.state.zoom}
            minZoom={1}
            maxZoom={15}
            maxBounds={maxBounds}
            accessToken={mapboxAccessToken}
            onClick={this._onClick.bind(this)}
            containerStyle={{height: mapHeight, width: mapWidth}} >

            <ZoomControl
              zoomDiff={1}
              onControlClick={this._onZoomClick.bind(this)} />

          </ReactMapboxGl>
        </div>
      </div>
    )
  }
}
