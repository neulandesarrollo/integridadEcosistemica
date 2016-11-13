import React, { Component } from 'react';

export default class MachinationsCarouselItem extends Component {
  activeClass() {
    return this.props.isActive ? " active" : "";
  }

  render() {
    console.log('render carousel-item');
    return (
      <div className={"carousel-item" + this.activeClass()}>
        <h2>{this.props.machina.name}</h2>
      </div>
    )
  }
}

MachinationsCarouselItem.propTypes = {
  machina: React.PropTypes.object,
  isActive: React.PropTypes.bool
};
