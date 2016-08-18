import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';

import AppContainer from '../../ui/containers/AppContainer.jsx';
import IndexContainter from '../../ui/containers/IndexContainer.jsx';

FlowRouter.route('/mexEco', {
  name: 'mexEco',
  action() {
    mount(AppContainer, {
      main: <IndexContainer />,
    });
  },
});
