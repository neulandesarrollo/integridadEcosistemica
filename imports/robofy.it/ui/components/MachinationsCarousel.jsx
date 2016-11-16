import React, { Component } from 'react';

import MachinationsCarouselItem from './MachinationsCarouselItem.jsx';

export default class MachinationsCarousel extends Component {
  renderMachina(machina, i) {
    return (
      <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12" key={i}>
        <div className="card">
          <img className="card-img-top img-fluid" src={machina.src} alt={machina.name} />
          <div className="card-block">
            <h4 className="card-title">{machina.name}</h4>
            <p className="card-text">{machina.description}</p>
            <a href="#" className="btn btn-primary">Go somewhere</a>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="featured-machinations container">
        <div className="row">
          {this.props.machinas.map(this.renderMachina.bind(this))}
        </div>
      </div>
    );
  }
}

MachinationsCarousel.propTypes = {
  machinas: React.PropTypes.array,
  isLoading: React.PropTypes.bool
};
