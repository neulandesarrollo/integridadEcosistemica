import { Meteor } from 'meteor/meteor';

// import startupNolaDataServer from '../imports/nola-data/server/startup.js';
import { startupIOPlease } from '../imports/ioplea.se/startup/server/main.jsx';
import { startupMexEco } from '../imports/mexEco/server/startup.js';

Meteor.startup(() => {
  // startupNolaDataServer();
  startupIOPlease();
  startupMexEco();
  process.env.MAIL_URL = Meteor.settings.MAIL_URL
});
