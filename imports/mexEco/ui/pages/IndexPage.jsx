import { Meteor } from 'meteor/meteor';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class IndexPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <div>
        <div id='mexEco-index-title'>
          <div className="container-fluid">
            <div className="row p-t-3">
              <div className="col-xs-10 offset-xs-1 col-md-8 offset-md-2 col-xl-6 offset-xl-3">
                <img className="img-fluid m-x-auto d-block" id="mexEco-index-title-img" src="mexEco/logo-white.png" />
              </div>
            </div>
            <div className="row text-muted p-t-3 p-b-2">
              <div className="col-xs-12 col-md-6 offset-md-6">
                <h4 className="text-muted">Some H4 title</h4>
                <p>Kendall reid beardsley moyes royle rideout whiteside goodison toffees. Dixie dean molyneux cuff mcintosh kelly catterick kendall. Harvey royle moyes southall stevens labone. Ratcliffe wilson steven ball sheedy sharp lawton mercer.</p>
              </div>
            </div>
          </div>
        </div>
        <img src='mexEco/index-green.jpg' style={{width: "100%"}} />
        <img src='mexEco/index-graph.jpg' style={{width: "100%"}} />
      </div>
    );
  }
}

IndexPage.propTypes = {
};
