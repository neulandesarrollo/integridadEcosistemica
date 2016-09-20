import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';

import { LoadingSpinner } from './LoadingSpinner.jsx';

export class PolygonsList extends Component {
  renderPolygon(polygon) {
    return (
      <div className="row polygon p-y-1 m-b-1" key={polygon._id}>
        <a href={"/regions/" + polygon._id} className='a-no-style'>
          <div className="col-xs-12 col-md-3">
            IMG
          </div>
          <div className="col-xs-12 col-md-9">
            <h5><strong>{polygon.name}</strong></h5>
            <h5 className="text-muted">by {polygon.username}</h5>
          </div>
        </a>
      </div>
    )
    return <h1 key={polygon._id}>{polygon.name}</h1>
  }

  render() {
    const polygons = this.props.polygons
    if(this.props.isLoading) {
      return <LoadingSpinner />
    } else {
      return <div>{polygons.map(this.renderPolygon.bind(this))}</div>
    }
  }
}

PolygonsList.propTypes = {
  isLoading: PropTypes.bool,
  polygons: PropTypes.array
};
