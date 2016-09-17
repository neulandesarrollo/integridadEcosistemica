import { Meteor } from 'meteor/meteor'
import ReactMapboxGl, { Layer, Feature, ScaleControl, ZoomControl } from "react-mapbox-gl"
import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import MapboxGLDraw from '../components/MapboxGLDraw.jsx'
import { LoginModal } from '../components/LoginModal.jsx'
import { Navbar } from '../components/Navbar.jsx'

import { getMapboxStyles } from '../lib/mapbox-styles.js'
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
    super(props)

    this.state = {
      state: STATES.IDLE
    }
  }

  setDrawState(state) {
    this.setState({state})
  }

  render() {

    return (
      <div className="container-fluid full-height" id="map-container">
        <LoginModal />
        <div className="col-xs-12 col-md-9 m-l-0 p-l-0 full-height">
          <ReactMapboxGl
            style={getMapboxStyles()}
            accessToken={Meteor.settings.public.MAPBOX.TOKEN}
            center={[-99.138173, 19.416424]}
            zoom={[8]} >

            <MapboxGLDraw
              state={this.state.state}
              setDrawState={this.setDrawState.bind(this)}
              user={this.props.user} />

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
  user: React.PropTypes.object
  // map: React.PropTypes.object,
  // initMap: React.PropTypes.func,
  // currentPolygon: React.PropTypes.object,
  // insertingPolygon: React.PropTypes.bool
};
