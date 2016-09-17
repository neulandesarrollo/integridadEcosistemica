import { Meteor } from 'meteor/meteor';
import ReactMapboxGl, { Layer, Feature, ScaleControl, ZoomControl } from "react-mapbox-gl";
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import MapboxGLDraw from '../components/MapboxGLDraw.jsx';
import { Navbar } from '../components/Navbar.jsx';
// import PolygonFormContainer from '../containers/PolygonFormContainer.jsx';

export const STATES = {
  IDLE: "state-idle",
  SELECTING_FIRST: "state-selecting-first",
  SELECTING_SECOND: "state-selecting-second",
  SELECTING_THIRD: "state-selecting-third",
  SELECTING_MORE: "state-selecting-more",
  INSERTING: "state-inserting",
  UPDATING: "state-updating"
}

export default class MapPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      state: STATES.IDLE
    };
  }

  setDrawState(state) {
    this.setState({state})
  }
  //
  // handleClick() {
  //   console.log('handleClick');
  //   console.log(ReactDOM.findDOMNode(this.refs.myModal));
  // }
  //
  // renderInsertingPolygon() {
  //   // if(this.props.loading) {
  //   //   return <h1>Loading</h1>
  //   // } else {
  //   //   return <PolygonFormContainer
  //   //     currentPolygon={this.props.currentPolygon}
  //   //     insertingPolygon={this.props.insertingPolygon} />
  //   // }
  //   return null
  // }

  // render() {
  //   return (
  //     <div>
  //       <Navbar />
  //         {this.props.insertingPolygon ? this.renderInsertingPolygon(): null}
  //         <div className="container-fluid">
  //           <h1>Map</h1>
  //           <div className="row">
  //
  //             <div className="col-xs-12 col-md-10 offset-md-1">
  //               <div id="map"></div>
  //             </div>
  //           </div>
  //           <button className='btn btn-primary' onClick={this.handleClick.bind(this)}>Modal</button>
  //         </div>
  //     </div>
  //   );
  // }
  render() {
    const rasterTileUrl = "https://api.mapbox.com/styles/v1/" +
      Meteor.settings.public.MAPBOX.STYLE_ID +
      "/tiles/{x}/{y}/{z}?access_token=" +
      Meteor.settings.public.MAPBOX.TOKEN

    const styleUrl = "mapbox://" + Meteor.settings.public.MAPBOX.MAP_ID
    console.log("rasterTileUrl: " + rasterTileUrl);

    const styles = {
      "version": 8,
      "name": "v4",
      "sprite": "mapbox://sprites/mapbox/streets-v8",
      "glyphs": "mapbox://fonts/mapbox/{fontstack}/{range}.pbf",
      "sources": {
        "mapbox": {
          "url": "mapbox://mapbox.mapbox-streets-v7",
          "type": "vector"
        },
        "mexEco": {
          "type": "raster",
          // "tiles": [
          //   rasterTileUrl
          // ],
          "url": styleUrl,
          "tileSize": 512
        }
      },
      "layers": [
        {
          "id": "background",
          "type": "background",
          "paint": {
            "background-color": "#906b19"
          },
          "interactive": true
        },
        {
          "id": "water",
          "type": "fill",
          "source": "mapbox",
          "source-layer": "water",
          "paint": {
            "fill-color": "#a0cfdf"
          },
          "interactive": true
        },
        {
          "id": "mexEco",
          "type": "raster",
          "source": "mexEco",
          "minzoom": 0,
          "maxzoom": 22
        }
      ],
    }

    return (
      <div className="container-fluid full-height" id="map-container">
        <div className="col-xs-12 col-md-9 m-l-0 p-l-0 full-height">
          <ReactMapboxGl
            style={styles}
            accessToken={Meteor.settings.public.MAPBOX.TOKEN}
            center={[-99.138173, 19.416424]}
            zoom={[8]} >

            <MapboxGLDraw
              state={this.state.state}
              setDrawState={this.setDrawState.bind(this)} />

          </ReactMapboxGl>
        </div>
        <div className="col-xs-12 col-md-3">
          <h1>Likert</h1>
        </div>
      </div>
    )
  }
}

MapPage.propTypes = {
  // map: React.PropTypes.object,
  // initMap: React.PropTypes.func,
  // currentPolygon: React.PropTypes.object,
  // insertingPolygon: React.PropTypes.bool
};
