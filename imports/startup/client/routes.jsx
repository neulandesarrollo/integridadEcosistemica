import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';

import '../../ioplea.se/startup/client/routes.jsx';

import AppContainer from '../../ui/containers/AppContainer.jsx';
import IndexPage from '../../ui/pages/IndexPage.jsx';

FlowRouter.route('/', {
  name: 'index',
  action() {
    mount(AppContainer, {
      main: <IndexPage/>,
    });
  },
});
