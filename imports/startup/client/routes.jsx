import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';

import { piwik } from 'meteor/marvin:piwik-http-sandstorm';

import '../../ioplea.se/startup/client/routes.jsx';
import '../../mexEco/startup/client/routes.jsx';

import AppContainer from '../../ui/containers/AppContainer.jsx';
import IndexPage from '../../ui/pages/IndexPage.jsx';

FlowRouter.triggers.enter([piwik.flowTrackEnter]);

FlowRouter.route('/', {
  name: 'index',
  action() {
    mount(AppContainer, {
      main: <IndexPage />,
    });
  },
});
