import Machinations from '../../common/collections/machinations.js';

import machinations from '../../lib/fixtures/machinations.js';

const seedMachinas = () => {
  if(Machinations.find().count() === 0) {
    console.log("Seeding machinations.");
    _.each(machinations, m => {
      console.log("Inserting " + m.name);
      Machinations.insert(m)
    })
  } else {
    console.log("Machinations already seeded.");
  }
}

export default seedMachinas;
