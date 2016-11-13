import React, { Component } from 'react';

import MachinationsCarousel from '../components/MachinationsCarousel.jsx';

export default class IndexPage extends Component {
  render() {
    return (
      <div id="robofy-index">
        <MachinationsCarousel machinas={[{_id:1, name: "test"}]}/>
      </div>
    )
  }
}
