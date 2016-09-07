import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';

import AppContainer from '../../ui/containers/AppContainer.jsx';
import IndexPage from '../../ui/pages/IndexPage.jsx';

FlowRouter.route('/swell', {
  name: 'swell',
  action() {
    mount(AppContainer, {
      main: <IndexPage />,
    });
  },
});
