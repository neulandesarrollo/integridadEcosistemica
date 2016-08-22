import { Meteor } from 'meteor/meteor';
import { Compatibilities } from '../../common/collections/compatibilities.js';

// Meteor.publish("compatibilities", () => {
//   return Compatibilities.find();
// });

Meteor.publish("compatibilities.forStuff", (stuffId) => {
  new SimpleSchema({
    stuffId: {type: String}
  }).validate({ stuffId });

  return Compatibilities.find({stuffId});
});

Meteor.publish("compatibilities.forStuffThing", (stuffId, thingId) => {
  new SimpleSchema({
    stuffId: {type: String},
    thingId: {type: String}
  }).validate({ stuffId, thingId });

  return Compatibilities.find({$and: [
    {stuffId},
    {thingId: {$not: {$eq: thingId}}}
  ]});
});
