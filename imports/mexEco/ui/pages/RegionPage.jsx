import { Meteor } from 'meteor/meteor'
import ReactMapboxGl, { Layer, Feature, ScaleControl, ZoomControl } from "react-mapbox-gl"
import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import MapboxRegion from '../components/MapboxRegion.jsx'
import { LoginModal } from '../components/LoginModal.jsx'
import { Navbar } from '../components/Navbar.jsx'

import { getMapboxStyles } from '../lib/mapbox-styles.js'
import PolygonsListContainer from '../containers/PolygonsListContainer.jsx';

export default class RegionPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentPolygon: props.currentPolygon
    }
  }

  componentWillReceiveProps(nextProps) {
    const newPolygon = nextProps.currentPolygon
    const oldPolygon = this.props.currentPolygon
    if(newPolygon && (newPolygon !== oldPolygon)) {
      this.setState({currentPolygon: newPolygon})
    }
  }


  render() {
    return (
      <div className="container-fluid full-height" id="map-container">
        <LoginModal user={this.props.user} />

        <div className="col-xs-12 col-md-9 m-l-0 p-l-0 full-height">
          <ReactMapboxGl
            style={getMapboxStyles()}
            accessToken={Meteor.settings.public.MAPBOX.TOKEN}
            center={[-99.138173, 19.416424]}
            zoom={[8]} >

            <MapboxRegion currentPolygon={this.state.currentPolygon} />
          </ReactMapboxGl>
        </div>
        <div className="col-xs-12 col-md-3">
          <h4 className='m-t-1'>Browse Regions</h4>
          <PolygonsListContainer user={this.props.user} />
        </div>
      </div>
    )
  }
}

RegionPage.propTypes = {
  user: React.PropTypes.object,
  isLoading: React.PropTypes.bool,
  currentPolygon: React.PropTypes.object
};
