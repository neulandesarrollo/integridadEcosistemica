import React, { Component } from 'react';

export default class MachinationsCarouselItem extends Component {
  activeClass() {
    return this.props.isActive ? " active" : "";
  }

  render() {
    console.log('render carousel-item');
    return (
      <div className={"carousel-item" + this.activeClass()}>
        <img
          className="w-100"
          src={this.props.machina.src}
          alt={this.props.machina.name} />
      </div>
    )
  }
}

MachinationsCarouselItem.propTypes = {
  machina: React.PropTypes.object,
  isActive: React.PropTypes.bool
};
