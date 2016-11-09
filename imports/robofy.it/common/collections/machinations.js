import faker from 'faker';
import './users-factory.js';

const Machinations = new Mongo.Collection("Machinations");

const MachinationsSchema = new SimpleSchema({
  name: {
    type: String
  },
  description: {
    type: String
  },
  userId: {
    type: String
  },
  iconUrl: {
    type: String
  },
  isActive: {
    type: Boolean
  },
  isFeatured: {
    type: Boolean
  },
  numCompats: {
    type: Number
  },
  updatedAt: {
    type: Date
  }
});
Machinations.attachSchema(MachinationsSchema);

Factory.define('machination', Machinations, {
  userId: Factory.get('user'),
  name: faker.lorem.sentence(),
  description: faker.lorem.sentence(),
  isActive: false,
  isFeatured: false,
  iconUrl: "/robofy.it/img/iotButton.jpg",
  createdAt: new Date(),
  updatedAt: new Date()
});

export default Machinations;
// export MachinationsSchema;
