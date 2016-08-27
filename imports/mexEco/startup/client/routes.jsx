import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';

import AppContainer from '../../ui/containers/AppContainer.jsx';
// import MapContainer from '../../ui/containers/MapContainer.jsx';

import ContactPage from '../../ui/pages/ContactPage.jsx';
import IndexPage from '../../ui/pages/IndexPage.jsx';
import MapPage from '../../ui/pages/MapPage.jsx';

FlowRouter.route('/integridad-ecosistemica', {
  name: 'mexEco',
  action() {
    mount(AppContainer, {
      main: <IndexPage />,
    });
  },
});

FlowRouter.route('/contacto', {
  name: 'contacto',
  action() {
    mount(AppContainer, {
      main: <ContactPage />,
    });
  },
});

FlowRouter.route('/mapa', {
  name: 'mapa',
  action() {
    mount(AppContainer, {
      main: <MapPage />,
    });
  },
});
