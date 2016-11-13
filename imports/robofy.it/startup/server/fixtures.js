import Machinations from '../../common/collections/machinations.js';

const machinations = [
  {
    name: "TODO"
  }
]

const seedMachinas = () => {
  if(Machinations.find().count() === 0) {
    console.log("no machinations");
    _.each(machinations, m => {
      console.log(m.name);
    })
  } else {
    console.log("Machinations already seeded.");
  }
}

export default seedMachinas;
