
import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router-ssr';
import { mount } from 'react-mounter';

import AppContainer from '../../ui/containers/AppContainer.jsx';
import IndexPage from '../../ui/pages/IndexPage.jsx';
import MapPage from '../../ui/pages/MapPage.jsx';

FlowRouter.route('/ie', {
  name: 'ie-index',
  action() {
    mount(AppContainer, {
      main: <IndexPage />,
    });
  },
});


FlowRouter.route('/ie/mapa', {
  name: 'ie-map',
  action() {
    mount(AppContainer, {
      main: <MapPage />,
    });
  },
});
