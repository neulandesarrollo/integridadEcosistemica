import React, { Component } from 'react';

import HeroSection from '../components/sections/HeroSection.jsx';
import MachinationsCarousel from '../components/MachinationsCarousel.jsx';

export default class IndexPage extends Component {
  render() {
    return (
      <div id="robofy-index">
        <HeroSection />
        <MachinationsCarousel machinas={[{_id:1, name: "test"}]} />
      </div>
    )
  }
}
