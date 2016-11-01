import { Meteor } from 'meteor/meteor';
import { Classifications } from '../../common/collections/classifications.js';

import { Kinds } from '../../common/collections/kinds.js';

// Meteor.publish("kinds", stuffId => {
//   const classifications = Classifications.find({stuffId}).fetch()
//   const kindIds = classifications.map(classification => { return classification.kindId })
//   return Kinds.find({_id: {$in: kindIds}})
// });

// Meteor.publish("kinds.all", () => {
//   return Kinds.find()
// });
