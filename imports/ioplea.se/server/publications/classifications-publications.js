import { Meteor } from 'meteor/meteor';
import { Classifications } from '../../common/collections/classifications.js';

Meteor.publish("classifications", (stuffId) => {
  new SimpleSchema({
    stuffId: {type: String}
  }).validate({ stuffId });
  
  return Classifications.find({stuffId});
});
