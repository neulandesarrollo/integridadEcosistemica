import { Meteor } from 'meteor/meteor';
import { Classifications } from '../../common/collections/classifications.js';

Meteor.publish("classifications", (stuffId) => {
  return Classifications.find({stuffId});
});
