// package metadata file for Meteor.js

/* global Package:true */

Package.describe({
  name: 'twbs:bootstrap',  // https://atmospherejs.com/twbs/bootstrap
  summary: 'The most popular front-end framework for developing responsive, mobile first projects on the web.',
  version: '4.0.0-geeky',
  git: 'https://github.com/twbs/bootstrap.git'
});

Package.onUse(function (api) {
  api.versionsFrom('METEOR@1.0');
  api.use('jquery', 'client');
  api.addFiles([
    'tether/dist/css/tether.min.css',
    'tether/dist/js/tether.min.js',
    'dist/css/bootstrap.css',
    'dist/js/bootstrap.js'
  ], 'client');
});
