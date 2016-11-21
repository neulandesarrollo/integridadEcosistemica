import { Meteor } from 'meteor/meteor';

import startupProjects from '../imports/startup/server/startup-projects.js';

Meteor.startup(() => {
  startupProjects();
});
