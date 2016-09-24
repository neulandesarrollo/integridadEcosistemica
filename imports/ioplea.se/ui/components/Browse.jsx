import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';

export default class Browse extends Component {
  constructor(props) {
    super(props);

    this.state = {
      kinds: []
    }
  }

  componentDidMount() {
    const thiz = this
    Meteor.call("kinds.get", (error, kinds) => {
      if(error) {
        console.log("error", error);
      }

      if(kinds) {
        console.log(kinds);

        thiz.setState({ kinds })
      }
    });
  }

  renderKinds(_kind) {
    const kind = _kind.kind
    return (
      <div key={kind._id} className="col-xs-6 col-sm-4 col-lg-3 m-b-2">
        <a href={"/ioplease?k=" + kind._id} >
          <img src={"/ioplea.se/kinds/" + kind.iconUrl} className="img-fluid img-circle" />
          <h5 className='m-t-1'>{kind.name}</h5>
        </a>
      </div>
    )
  }

  render() {
    if(this.state.kinds.length > 0) {
      return (
        <div className="container text-xs-center">
          <h3 className="m-b-2 m-t-1">Browse</h3>
          <div className="row">
            { this.state.kinds.map(this.renderKinds.bind(this)) }
          </div>
        </div>
      )
    } else {
      return <div id="content"></div>
    }
  }
}
