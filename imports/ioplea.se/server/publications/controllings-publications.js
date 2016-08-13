import { Meteor } from 'meteor/meteor';
import { Controllings } from '../../common/collections/controllings.js';

Meteor.publish("controllings", () => {
  return Controllings.find();
});
