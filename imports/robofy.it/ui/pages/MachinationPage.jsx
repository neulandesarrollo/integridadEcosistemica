import React, { Component } from 'react';

import MachinationSection from '../sections/MachinationSection.jsx';

export default class MachinationPage extends Component {
  renderPage() {
    if(this.props.loading) {
      return (
          <h1>Loading</h1>
      );
    } else if(this.props.machinationExists) {
      return (
        <div>
          <h1>Machination exists</h1>
          <MachinationSection />
        </div>
      );
    } else {
      return (
        <h1>Could not locate machination</h1>
      );
    }
  }

  render() {
    return (
      <div id="robofy-machination-page">
        {this.renderPage()}
      </div>
    )
  }
}

MachinationPage.propTypes = {
  machination: React.PropTypes.object,
  loading: React.PropTypes.bool,
  machinationExists: React.PropTypes.bool
};
