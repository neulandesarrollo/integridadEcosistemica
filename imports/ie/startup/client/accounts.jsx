import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router-ssr';
import { mount } from 'react-mounter';
import { Accounts, STATES } from 'meteor/std:accounts-ui';

import AppContainer from '../../ui/containers/AppContainer.jsx';

Accounts.ui.config({
  passwordSignupFields: 'EMAIL_ONLY',
  loginPath: '/login',
  signUpPath: '/join',
  resetPasswordPath: '/reset-password',
  profilePath: '/profile',
  changePasswordPath: '/change-password',
  onSignedInHook: () => FlowRouter.go('/general'),
  onSignedOutHook: () => FlowRouter.go('/')
});

FlowRouter.route("/login", {
  action(params) {
    mount(AppContainer, {
      main: <Accounts.ui.LoginForm />
    });
  }
});

FlowRouter.route("/join", {
  action(params) {
    mount(AppContainer, {
      main: <Accounts.ui.LoginForm formState={STATES.SIGN_UP} />
    });
  }
});

FlowRouter.route("/profile", {
  action(params) {
    mount(AppContainer, {
      main: <Accounts.ui.LoginForm formState={STATES.PROFILE} />
    });
  }
});

FlowRouter.route("/reset-password", {
  action(params) {
    mount(AppContainer, {
      main: <Accounts.ui.LoginForm formState={STATES.PASSWORD_RESET} />
    });
  }
});

FlowRouter.route("/change-password", {
  action(params) {
    mount(AppContainer, {
      main: <Accounts.ui.LoginForm formState={STATES.PASSWORD_CHANGE} />
    });
  }
});

if(Meteor.isServer) {
  var timeInMillis = 1000 * 10; // 10 secs
  FlowRouter.setPageCacheTimeout(timeInMillis)
}
