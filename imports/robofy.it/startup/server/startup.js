import '../../api/configs/configs-methods.js';
import '../../api/machinations/machinations-publications.js';
import '../accounts.js';
import '../lastfm.js';

import seedMachinas from './fixtures.js';

const startupRobofy = () => {
  seedMachinas();
}

export default startupRobofy;
