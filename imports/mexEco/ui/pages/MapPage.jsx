import { Meteor } from 'meteor/meteor';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Navbar } from '../components/Navbar.jsx';
// import PolygonFormContainer from '../containers/PolygonFormContainer.jsx';

export default class MapPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentDidMount() {
    this.props.initMap()
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
    return (
      <div className="container-fluid full-height m-l-0 p-l-0" id="map-container">
        <div className="col-xs-12 col-md-9 m-l-0 p-l-0 full-height">
          <div id="map"></div>
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
  initMap: React.PropTypes.func,
  // currentPolygon: React.PropTypes.object,
  // insertingPolygon: React.PropTypes.bool
};
