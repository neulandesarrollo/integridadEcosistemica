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

        // Browse list should appear different on every visit
        thiz.setState({ kinds: _.shuffle(kinds) })
      }
    });
  }

  renderKind(_kind) {
    const kind = _kind.kind
    return (
      <div key={kind._id} className="col-xs-6 col-sm-4 col-lg-3 m-b-2">
        <a href={"/ioplease?k=" + kind._id} >
          <img src={"/ioplea.se/kinds/" + kind.iconUrl} className="img-fluid img-circle" />
          <h5 className='m-t-1'>{kind.name}</h5>
          <h6 className="text-muted">{_kind.stuffsCount} stuff to do</h6>
        </a>
      </div>
    )
  }

  renderKindsRowEvery(kinds, n) {
    let _kinds = _.clone(kinds)
    let rows = []

    while(_kinds.length) {
      const kindRow = _kinds.splice(0, n);
      const row = (
        <div className="row" key={_kinds.length}>
          {kindRow.map(this.renderKind.bind(this))}
        </div>
      )
      rows.push(row)
    }

    return (
      <div key={_kinds.length}>
        {rows}
      </div>
    )
  }


  render() {
    if(this.state.kinds.length > 0) {
      return (
        <div className="container text-xs-center">
          <h3 className="m-b-2 m-t-1">Browse</h3>
            <div className='hidden-sm-up'>
              {this.renderKindsRowEvery(this.state.kinds, 2)}
            </div>
            <div className='hidden-lg-up hidden-xs-down'>
              {this.renderKindsRowEvery(this.state.kinds, 3)}
            </div>
            <div className='hidden-md-down'>
              {this.renderKindsRowEvery(this.state.kinds, 4)}
            </div>
        </div>
      )
    } else {
      return <div id="content"></div>
    }
  }
}
