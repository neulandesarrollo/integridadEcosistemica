import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';

import { piwik } from 'meteor/marvin:piwik-http-sandstorm';

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
        // Browse list should appear different on every visit
        thiz.setState({ kinds: _.shuffle(kinds) })
      }
    });
  }

  handleClick(kind, e) {
    console.log('handleClick');
    console.log(e.button);
    piwik.trackAction('ioplease', 'browse')

    // Prevent a middle click which opens in new tab
    // from having an effect on current tab
    if(e.button !== 1) {
      this.props.setKindId(kind._id)
    }
  }

  renderKind(_kind) {
    const kind = _kind.kind
    return (
      <div key={kind._id} className="col-xs-6 col-sm-4 col-lg-3 m-b-2">
        <a href={"/ioplease?k=" + kind._id} onClick={ this.handleClick.bind(this, kind) }>
          <img src={"/ioplea.se/kinds/" + kind.iconUrl} className="img-fluid img-circle" />
          <h5 className='m-t-1'>{kind.name}</h5>
          <h6 className="text-muted">{_kind.stuffsCount} kinds of stuff</h6>
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
