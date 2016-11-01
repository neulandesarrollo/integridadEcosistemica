import { Meteor } from 'meteor/meteor';

// import startupNolaDataServer from '../imports/nola-data/server/startup.js';
import { startupRobofy } from '../imports/robofy.it/startup/server/main.jsx';
// import { startupMexEco } from '../imports/mexEco/startup/server/startup.js';

Meteor.startup(() => {
  // startupNolaDataServer();
  startupRobofy();
  // startupMexEco();
  process.env.MAIL_URL = Meteor.settings.MAIL_URL
});
