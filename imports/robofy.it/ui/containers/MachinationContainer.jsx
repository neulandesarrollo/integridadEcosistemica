import { Meteor } from 'meteor/meteor'
import React from 'react'
import { createContainer } from 'meteor/react-meteor-data'

import Machinations from '../../common/collections/machinations.js';
import MachinationPage from '../pages/MachinationPage.jsx';

export default MachinationContainer = createContainer(params => {
  const machinationId = FlowRouter.getParam("machinationId");
  const machinationHandle = Meteor.subscribe('machinations.get', machinationId);
  const loading = !machinationHandle.ready();
  const machination = Machinations.findOne(machinationId);
  const machinationExists = !loading && !!machination;

  return {
    loading,
    machination,
    machinationExists
  };
}, MachinationPage);
