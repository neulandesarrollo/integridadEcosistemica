import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';

import '../../ioplea.se/startup/client/routes.jsx';
import '../../mexEco/startup/client/routes.jsx';

import AppContainer from '../../ui/containers/AppContainer.jsx';
import IndexPage from '../../ui/pages/IndexPage.jsx';

FlowRouter.route('/', {
  name: 'index',
  triggersEnter: [trackRouteEntry],
  action() {
    mount(AppContainer, {
      main: <IndexPage/>,
    });
  },
});

function trackRouteEntry(context) {
  HTTP.get(Meteor.settings.public.PIWIK.url, {
    headers: {"Authorization": "Bearer " + Meteor.settings.public.PIWIK.sandstormAuth},
    params: {
      idsite: 1,
      rec: 1,
      url: "https://www.geeky.rocks/joe",
    }
  }, (err, resp) => {
    console.log('posted');
    console.log(err);
    console.log(resp);
  })
}
