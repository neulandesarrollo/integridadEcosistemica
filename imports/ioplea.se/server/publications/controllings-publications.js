import { Meteor } from 'meteor/meteor';
import { Controllers } from '../../common/collections/controllers.js';
import { Controllings } from '../../common/collections/controllings.js';

Meteor.publish("controllings", () => {
  return Controllings.find();
});

Meteor.publish("controllers", () => {
  return Controllers.find();
});
