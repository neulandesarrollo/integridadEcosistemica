import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import ReactMapboxGl from "react-mapbox-gl";
import Draw from 'mapbox-gl-draw';

// let index = 0;
const generateID = () => index++;

export default class MapboxGLDraw extends Component {
  constructor(props) {
    super(props);

    this.state = {
      draw: undefined
    };
  }

  // static contextTypes = {
  //   map: PropTypes.object
  // };
  //
  // static propTypes = {
  //   // id: PropTypes.string,
  //   //
  //   // type: PropTypes.oneOf([
  //   //   "symbol",
  //   //   "line",
  //   //   "fill",
  //   //   "circle"
  //   // ]),
  //   //
  //   // layout: PropTypes.object,
  //   // paint: PropTypes.object,
  //   // sourceOptions: PropTypes.object,
  //   // layerOptions: PropTypes.object,
  //   // sourceId: PropTypes.string,
  //   // before: PropTypes.string
  // };

  // id = this.props.id || `draw-${generateID()}`;
  // draw = undefined;
  // var draw = Draw({
  //   controls: {
  //     point: false,
  //     line_string: false,
  //     polygon: true,
  //     trash: false
  //   }
  // });
  // map.addControl(draw);

  componentWillMount() {
    console.log('componentWillMount');
    // console.log(this);
    // const { id, source } = this;
    // const { type, layout, paint, layerOptions, sourceId, before } = this.props;
    const { map } = this.context;
    // console.log(map);

    // console.log(Draw);
    const draw = Draw({
      controls: {
        point: false,
        line_string: false,
        polygon: true,
        trash: false
      },
      position: 'bottom-right'
    });
    //
    // this.setState({draw})

    // if(!sourceId) {
    //   map.addSource(id, source);
    // }
    map.addControl(draw)
    console.log('control added');
    // const thiz = this
    // map.on('load', () => {
    //   const draw = Draw({
    //     // controls: {
    //     //   point: true,
    //     //   line_string: false,
    //     //   polygon: true,
    //     //   trash: false
    //     // },
    //     // position: 'bottom-right'
    //   });
    //
    //   // // thiz.setState({draw})
    //   // const didAdd = map.addControl(draw)
    //   // console.log(didAdd);
    //   //
    //   // console.log("draw added===");
    //   // console.log(map.repaint);
    // });
    // map.on("click", this.onClick);
    // map.on("mousemove", this.onMouseMove);


    // draw controls
    // map.on('draw.create', (event) => {
    //   _.each(event.features, poly => {
    //     const polygon = {
    //       name: poly.id,
    //       geoJSON: {
    //         type: poly.type,
    //         geometry: {
    //           type: poly.geometry.type,
    //           coordinates: poly.geometry.coordinates[0]
    //         }
    //       }
    //     }
    //
    //     Session.set(SESSION.POLYGON, polygon);
    //     Session.set(SESSION.INSERTING, true);
    //   })
    // });
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
    // const { id } = this;
    const { map } = this.context;

    map.remove(this.state.draw);
    this.setState({draw: undefined})
    // map.removeSource(id);

    // map.off("click", this.onClick);
    // map.off("mousemove", this.onMouseMove);
  }

  // componentWillReceiveProps(props) {
  //   const { paint, layout } = this.props;
  //   const { map } = this.context;
  //
  //   if(!isEqual(props.paint, paint)) {
  //     const paintDiff = diff(paint, props.paint);
  //
  //     for (const key in paintDiff) {
  //       map.setPaintProperty(this.id, key, paintDiff[key]);
  //     }
  //   }
  //
  //   if(!isEqual(props.layout, layout)) {
  //     const layoutDiff = diff(layout, props.layout);
  //
  //     for (const key in layoutDiff) {
  //       map.setLayoutProperty(this.id, key, layoutDiff[key]);
  //     }
  //   }
  // }
  //
  // shouldComponentUpdate(nextProps) {
  //   return !isEqual(nextProps.children, this.props.children)
  //       || !isEqual(nextProps.paint, this.props.paint)
  //       || !isEqual(nextProps.layout, this.props.layout)
  // }

  handleClick() {
    console.log('handleClick');
    const drawBtn = $(".mapbox-gl-draw_ctrl-draw-btn")[0]
    if(drawBtn)
      drawBtn.click()
  }

  render() {
    console.log('rendered MapboxGLDraw');
    // return null;
    return <button className="btn btn-primary" id='mexEco-draw' onClick={this.handleClick.bind(this)}>Draw</button>
  }
}

MapboxGLDraw.contextTypes = {
  map: PropTypes.object
};
