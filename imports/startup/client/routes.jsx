import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router-ssr';
import { mount } from 'react-mounter';

// import { piwik } from 'meteor/marvin:piwik-http-sandstorm';

import AppContainer from '../../ui/containers/AppContainer.jsx';
import IndexPage from '../../ui/pages/IndexPage.jsx';

// FlowRouter.triggers.enter([piwik.flowTrackEnter]);

FlowRouter.route('/', {
  name: 'index',
  action() {
    mount(AppContainer, {
      main: <IndexPage />,
    });
  },
});
