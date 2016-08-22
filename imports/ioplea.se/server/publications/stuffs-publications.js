import { Meteor } from 'meteor/meteor';
import { Compatibilities } from '../../common/collections/compatibilities.js';
import { Stuffs } from '../../common/collections/stuffs.js';

const MAX_STUFFS = 100

Meteor.publish('stuffs.forThings', function (thingIds, limit) {
  this.autorun(function (computation) {
    new SimpleSchema({
      thingIds: {type: [String]},
      limit: {type: Number}
    }).validate({ thingIds, limit });

    const query = {thingId: {$in: thingIds}}

    // We only need the _id field in this query, since it's only
    // used to drive the child queries to get the Stuffs
    const options = {
      fields: { _id: 1, stuffId: 1 }
    };

    const compats = Compatibilities.find(query, options);
    let stuffIds = []
    compats.forEach(function(c) {
      stuffIds.push(c.stuffId)
    })

    const stuffQuery = {_id: {$in: stuffIds}}
    const stuffOptions = {sort: {popularity: -1}, limit: Math.min(limit, MAX_STUFFS)}

    Counts.publish(this, `stuffs.forThings.${thingIds}`, Stuffs.find(stuffQuery));
    return Stuffs.find(stuffQuery, stuffOptions)
  })
})
