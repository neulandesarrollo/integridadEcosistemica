import React, { Component } from 'react';

import BannerSection from '../components/sections/BannerSection.jsx';
import HeroSection from '../components/sections/HeroSection.jsx';
import InfoSection from '../components/sections/InfoSection.jsx';
import MachinationsCarousel from '../containers/MachinationsCarouselContainer.jsx';

export default class IndexPage extends Component {
  render() {
    return (
      <div id="robofy-index">
        <HeroSection />
        <h3 className="text-xs-center my-2">Featured machinations</h3>
        <MachinationsCarouselContainer />
        <BannerSection />
        <InfoSection />
      </div>
    )
  }
}
