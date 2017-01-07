import React, { Component } from 'react';
import ReactMapboxGl, {
	ScaleControl,
	ZoomControl
} from "react-mapbox-gl";

import { mapboxAccessToken, style } from '../../common/mapbox.js';
import MapboxGLDraw from '../components/widgets/MapboxGLDraw.jsx';
import MapboxGLCoords from '../components/widgets/MapboxGLCoords.jsx';

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

						<MapboxGLDraw />

            <ZoomControl
              zoomDiff={1}
              onControlClick={this._onZoomClick.bind(this)} />

						<ScaleControl position="bottomLeft" />

						<MapboxGLCoords />

          </ReactMapboxGl>
					<pre className="py-1" id='ie-mapa-info'></pre>
        </div>
      </div>
    )
  }
}
