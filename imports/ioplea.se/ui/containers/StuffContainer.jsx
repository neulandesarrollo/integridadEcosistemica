import { Meteor } from 'meteor/meteor';
import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Stuffs } from '../../common/collections/stuffs.js';
import StuffPage from '../pages/StuffPage.jsx';

export default StuffContainer = createContainer(({stuffId}) => {
  const stuffHandle = Meteor.subscribe("stuff", stuffId);
  const stuff = Stuffs.findOne(stuffId)

  return {
    loading: !stuff,
    stuff
  };
}, StuffPage);
