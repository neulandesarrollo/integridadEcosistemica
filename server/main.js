import { Meteor } from 'meteor/meteor';

import seed from '../imports/startup/server/fixtures.js';
import '../imports/startup/server/startup.js';

Meteor.startup(() => {
  seed();
});
