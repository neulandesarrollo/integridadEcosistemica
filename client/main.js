import '../imports/startup/client/routes.jsx';

import startupProjects from '../imports/startup/client/startup-projects.js';

Meteor.startup(() => {
  startupProjects();
});
