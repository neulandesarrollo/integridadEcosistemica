import React from 'react'
import { FlowRouter } from 'meteor/kadira:flow-router'
import { mount } from 'react-mounter'

import AppContainer from '../../ui/containers/AppContainer.jsx'
import RegionContainer from '../../ui/containers/RegionContainer.jsx'

import ContactPage from '../../ui/pages/ContactPage.jsx'
import IndexPage from '../../ui/pages/IndexPage.jsx'
import LoginPage from '../../ui/pages/LoginPage.jsx'
import MapPage from '../../ui/pages/MapPage.jsx'
import PrivateProfilePage from '../../ui/pages/PrivateProfilePage.jsx'

const routes = [
  {
    path: '/integridad-ecosistemica',
    name: 'mexEco',
    main: <IndexPage />
  },
  {
    path: '/contacto',
    name: 'contacto',
    main: <ContactPage />
  },
  {
    path: '/mapa',
    name: 'mapa',
    main: <MapPage />
  },
  {
    path: '/login',
    name: 'login',
    main: <LoginPage />
  },
  {
    path: '/profile',
    name: 'profile',
    main: <PrivateProfilePage />
  },
  {
    path: '/regions/:polygonId',
    name: 'region',
    main: <RegionContainer />
  }
]

_.each(routes, route => {
  FlowRouter.route(route.path, {
    name: route.name,
    action() {
      mount(AppContainer, {
        main: route.main,
      });
    },
  });
})
