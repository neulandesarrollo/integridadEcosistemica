import React, { Component } from 'react';

export default class MachinationsCarouselItem extends Component {
  activeClass() {
    return this.props.isActive ? " active" : "";
  }

  render() {
    return (
      <div className={"carousel-item" + this.activeClass()}>
        <img
          className="w-100"
          src={this.props.machina.src}
          alt={this.props.machina.name} />

          <div className="carousel-caption mt-2 bg-light">
            <p>{this.props.machina.description}</p>
            <button className="btn btn-outline-primary btn-lg">Explore the possibilities</button>
          </div>
      </div>
    )
  }
}

MachinationsCarouselItem.propTypes = {
  machina: React.PropTypes.object,
  isActive: React.PropTypes.bool
};
