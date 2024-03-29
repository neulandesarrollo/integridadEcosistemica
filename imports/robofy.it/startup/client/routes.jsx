import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router-ssr';
import { mount } from 'react-mounter';

// import { piwik } from 'meteor/marvin:piwik-http-sandstorm';

// import '../../robofy.it/startup/client/routes.jsx';
// import '../../mexEco/startup/client/routes.jsx';

import AppContainer from '../../ui/containers/AppContainer.jsx';
import IndexPage from '../../ui/pages/IndexPage.jsx';

import MachinationContainer from '../../ui/containers/MachinationContainer.jsx';

// FlowRouter.triggers.enter([piwik.flowTrackEnter]);

FlowRouter.route('/robofy.it', {
  name: 'index',
  action() {
    mount(AppContainer, {
      main: <IndexPage />,
    });
  },
});

FlowRouter.route('/machinations/:machinationId', {
  name: 'machination',
  action() {
    mount(AppContainer, {
      main: <MachinationContainer />,
    });
  },
});
