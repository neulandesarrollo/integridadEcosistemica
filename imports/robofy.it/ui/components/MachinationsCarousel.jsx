import React, { Component } from 'react';

export default class MachinationsCarousel extends Component {
  renderFeature(machina) {
    return (
      <div className="machination">
        <h2>{machina.name}</h2>
      </div>
    )
  }

  render() {
    return (
      <div className="featured-machinations">
        <h1>Robofy</h1>
        {this.props.machinas.map(this.renderFeature)}
      </div>
    );
  }
}

MachinationsCarousel.propTypes = {
  machinas: React.PropTypes.array,
  isLoading: React.PropTypes.bool
};
