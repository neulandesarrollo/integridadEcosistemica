import React, { Component } from 'react';

import HeroSection from '../components/sections/HeroSection.jsx';
import MachinationsCarousel from '../containers/MachinationsCarouselContainer.jsx';

export default class IndexPage extends Component {
  render() {
    return (
      <div id="robofy-index">
        <HeroSection />
        <h2>Featured products</h2>
        <MachinationsCarouselContainer />
      </div>
    )
  }
}
