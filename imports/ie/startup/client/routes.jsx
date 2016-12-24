import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router-ssr';
import { mount } from 'react-mounter';

// import { piwik } from 'meteor/marvin:piwik-http-sandstorm';

// import '../../robofy.it/startup/client/routes.jsx';
// import '../../ie/startup/client/routes.jsx';

import AppContainer from '../../ui/containers/AppContainer.jsx';
import IndexPage from '../../ui/pages/IndexPage.jsx';

// FlowRouter.triggers.enter([piwik.flowTrackEnter]);

FlowRouter.route('/integridad-ecosistema', {
  name: 'index',
  action() {
    mount(AppContainer, {
      main: <IndexPage />,
    });
  },
});
