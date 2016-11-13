import { Meteor } from 'meteor/meteor';
import { Factory } from 'meteor/dburles:factory';
import faker from 'faker';

import Machinations from '../../common/collections/machinations.js';

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
