import { Meteor } from 'meteor/meteor';

import seed from '../imports/startup/server/fixtures.js';

Meteor.startup(() => {
  seed();
});
