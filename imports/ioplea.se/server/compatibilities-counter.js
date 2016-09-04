import { Meteor } from 'meteor/meteor';
import { Compatibilities } from '../common/collections/compatibilities.js';
import { Stuffs } from '../common/collections/stuffs.js';

// Denormalize by keeping track of number of Compatibilities each Stuff has
Compatibilities.after.insert((error, doc) => {
  Stuffs.update(doc.stuffId, {$inc: {numCompats: 1}})
});
