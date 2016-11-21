import { LastFmNode } from "lastfm";
import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router-ssr';
import { mount } from 'react-mounter';

import AppContainer from '../../ui/containers/AppContainer.jsx';
import LoadingPage from '../../ui/pages/LoadingPage.jsx';

// var lastfm = new LastFmNode({
//   api_key: Meteor.settings.public.lastFM.apiKey,
//   secret: Meteor.settings.lastFM.sharedSecret
// });
FlowRouter.route("/callbacks/spotify/authorize/:machinationId", {
  action(params) {
    mount(AppContainer, {
      main: <LoadingPage />
    });
  }
});
