import { Meteor } from 'meteor/meteor'
import React from 'react'
import { createContainer } from 'meteor/react-meteor-data'

import Machinations from '../../common/collections/machinations.js';
import MachinationsCarousel from '../components/MachinationsCarousel.jsx';

export default MachinationsCarouselContainer = createContainer(params => {
  const machinationsHandle = Meteor.subscribe('machinations.list');
  const loading = !machinationsHandle.ready();
  const machinations = Machinations.find().fetch();
  const machinationsExists = !loading && !!machinations;

  return {
    loading,
    machinations,
    machinationsExists
  };
}, MachinationsCarousel);
