import { Meteor } from 'meteor/meteor';
import { Things } from '../../common/collections/things.js';

Meteor.publish("thing", (thingId) => {
  new SimpleSchema({
    thingId: {type: String},
  }).validate({ thingId });

  return Things.find(thingId);
});
