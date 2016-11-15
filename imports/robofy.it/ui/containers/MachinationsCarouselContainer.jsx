import { Meteor } from 'meteor/meteor'
import React from 'react'
import { createContainer } from 'meteor/react-meteor-data'
// import Navbar from '../components/Navbar.jsx'

import MachinationsCarousel from '../components/MachinationsCarousel.jsx';

export default MachinationsCarouselContainer = createContainer(props => {
  // props here will have `main`, passed from the router
  // anything we return from this function will be *added* to it
  return {
    // user: Meteor.user(),
    machinas: [
      {_id:1, name: "test", src: "/robofy.it/img/bebop-wide.jpg"},
      {_id:2, name: "A better alternative"}
    ]
  };
}, MachinationsCarousel);
