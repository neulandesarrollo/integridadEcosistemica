import React, { Component } from 'react';

export default class MachinationSection extends Component {
  render() {
    return (
      <div className="machination-section">
        <h1>{this.props.machination.name}</h1>
      </div>
    );
  }
}

MachinationSection.propTypes = {
  machination: React.PropTypes.object
};
