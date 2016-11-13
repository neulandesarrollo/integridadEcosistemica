import React, { Component } from 'react';

import MachinationsCarouselItem from './MachinationsCarouselItem.jsx';

export default class MachinationsCarousel extends Component {
  renderMachina(machina, i) {
    return (
      <MachinationsCarouselItem
        key={machina._id}
        machina={machina}
        isActive={i === 0} />
    )
  }

  render() {
    return (
      <div className="featured-machinations">
        <h1>Robofy</h1>
        <div id="carousel-example-generic" className="carousel slide" data-ride="carousel">
          <div className="carousel-inner" role="listbox">
            {this.props.machinas.map(this.renderMachina.bind(this))}
          </div>
          <a className="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
            <span className="icon-prev" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
          </a>
          <a className="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
            <span className="icon-next" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
      </div>
    );
  }
}

MachinationsCarousel.propTypes = {
  machinas: React.PropTypes.array,
  isLoading: React.PropTypes.bool
};
