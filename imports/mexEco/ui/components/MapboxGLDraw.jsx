import { Meteor } from 'meteor/meteor'
import React, { Component, PropTypes } from 'react'
import ReactMapboxGl from "react-mapbox-gl"
import Draw from 'mapbox-gl-draw'

import { STATES } from '../pages/MapPage.jsx'
import { polygonLineStyles } from '../lib/polygon-line-styles.js'

// let index = 0;
// const generateID = () => index++

export default class MapboxGLDraw extends Component {
  constructor(props) {
    super(props);

    this.state = {
      draw: undefined
    };
  }

  // TODO there should only be one feature when this is called but checks should be added
  setCurrentPolygon(features) {
    let polygon = null
    _.each(features, f => {
      polygon = {
        // name: f.id,
        geoJSON: {
          type: f.type,
          geometry: {
            type: f.geometry.type,
            coordinates: f.geometry.coordinates[0]
          }
        }
      }
    })

    console.log('setCurrentPolygon');
    console.log(polygon);
    this.props.setCurrentPolygon(polygon)
  }

  componentWillMount() {
    const thiz = this;
    const { map } = this.context;

    const styles = polygonLineStyles

    const controls = {
      point: false,
      line_string: false,
      polygon: true,
      trash: false
    }

    const draw = Draw({
      controls,
      styles,
      position: 'bottom-right'
    });

    map.on('load', function() {
      map.addControl(draw)
    });

    map.on('draw.create', (event) => {
      thiz.props.setDrawState(STATES.INSERTING)
      $("#insertModal").modal("show")
      console.log("draw.create");
      thiz.setCurrentPolygon(event.features)
    })

    map.on('draw.render', () => {
      let points = 0
      const features = thiz.state.draw.getAll().features

      if(features && (features.length > 0)) {
        points = features[0].geometry.coordinates[0].length - 1

        switch(points) {
          case 1:
            thiz.props.setDrawState(STATES.SELECTING_SECOND)
            break;
          case 2:
            thiz.props.setDrawState(STATES.SELECTING_THIRD)
            break;
          case 3:
            thiz.props.setDrawState(STATES.SELECTING_MORE)
            break;
        }
      }
    })

    this.setState({draw})
  }

  componentWillUnmount() {
    const { map } = this.context;

    map.remove(this.state.draw);
    this.setState({draw: undefined})
  }

  handleDraw() {
    if(this.props.user) {
      this.props.setDrawState(STATES.SELECTING_FIRST)
      const drawBtn = $(".mapbox-gl-draw_ctrl-draw-btn")[0]
      if(drawBtn) {
        drawBtn.click()
      }
    } else {
      $("#login-modal").modal("show")
    }

  }

  handleCancel() {
    this.props.setDrawState(STATES.IDLE)

    if(this.state.draw)
      this.state.draw.trash()
  }

  handleSave() {
    // TODO Inserting state should be controlled by state of modal that it launches
    this.props.setDrawState(STATES.INSERTING)
    $("#insertModal").modal("show")
  }

  render() {
    const drawButton = <button
      className="btn btn-primary mexEco-map-button btn-block"
      id='mexEco-draw'
      onClick={this.handleDraw.bind(this)}>Draw</button>

    const cancelButton = <button
      className="btn btn-danger mexEco-map-button btn-block"
      id='mexEco-cancel'
      onClick={this.handleCancel.bind(this)}>Cancel</button>

    const saveButton = <button
      className="btn btn-primary mexEco-map-button btn-block"
      id='mexEco-save'
      onClick={this.handleSave.bind(this)}>Save</button>

    switch(this.props.state) {
      case STATES.IDLE:
        return drawButton
      case STATES.SELECTING_FIRST:
      case STATES.SELECTING_SECOND:
      case STATES.SELECTING_THIRD:
        return cancelButton
      case STATES.SELECTING_MORE:
      case STATES.INSERTING:
        return (
          <div className="row">
            <div className="col-md-6">{saveButton}</div>
            <div className="col-md-6">{cancelButton}</div>
          </div>
        )
      case STATES.UPDATING:
        return drawButton
    }
    return null;
  }
}

MapboxGLDraw.contextTypes = {
  map: PropTypes.object,
  setCurrentPolygon: PropTypes.func,
  setDrawState: PropTypes.func,
  state: PropTypes.string,
  user: PropTypes.object,
};
