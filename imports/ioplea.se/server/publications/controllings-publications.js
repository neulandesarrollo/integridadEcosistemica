import { Meteor } from 'meteor/meteor';
import { Controllers } from '../../common/collections/controllers.js';
import { Controllings } from '../../common/collections/controllings.js';

Meteor.publish("controllings.forStuff", (stuffId) => {
  new SimpleSchema({
    stuffId: {type: String}
  }).validate({ stuffId });
  
  return Controllings.find();
});
