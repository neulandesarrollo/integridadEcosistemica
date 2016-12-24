import startupRobofy from '../../robofy.it/startup/client/startup.js';
import startupIE from '../../ie/startup/client/startup.js';

const startupProjects = () => {
  startupRobofy();
  startupIE();
}

export default startupProjects;
