import { Meteor } from 'meteor/meteor';
import { Classifications } from '../../common/collections/classifications.js';
import { Compatibilities } from '../../common/collections/compatibilities.js';
import { Stuffs } from '../../common/collections/stuffs.js';

const MAX_STUFFS = 100

Meteor.publish('stuffs.forThings', function (thingIds, limit, sort) {
  this.autorun(function (computation) {
    new SimpleSchema({
      thingIds: {type: [String]},
      limit: {type: Number},
      sort: {type: String}
    }).validate({ thingIds, limit, sort });

    const query = {thingId: {$in: thingIds}}
    // We only need the _id field in this query, since it's only
    // used to drive the child queries to get the Stuffs
    const options = {
      fields: { _id: 1, stuffId: 1 }
    };

    // Find all compatibilities with thingId
    const compats = Compatibilities.find(query, options);
    let stuffIds = []
    compats.forEach(function(c) {
      stuffIds.push(c.stuffId)
    })

    // Sorting options for Stuffs query
    const stuffQuery = {_id: {$in: stuffIds}}
    let sortOptions = []
    const sortables = ["updatedAt", "name", "numCompats"]
    const defaultSort = [["numCompats", "desc"], ["name", "asc"], ["updatedAt", "desc"]]

    if(_.contains(sortables, sort)) {
      sortOptions.push([sort, "desc"])
    }
    _.each(defaultSort, s => { sortOptions.push(s) })
    const stuffOptions = {sort: sortOptions, limit: Math.min(limit, MAX_STUFFS)}

    Counts.publish(this, `stuffs.forThings.${thingIds}`, Stuffs.find(stuffQuery));
    return Stuffs.find(stuffQuery, stuffOptions)
  })
})

Meteor.publish("stuff", function(stuffId) {
  new SimpleSchema({
    stuffId: {type: String},
  }).validate({ stuffId });

  return Stuffs.find(stuffId)
});

Meteor.publish("stuffs.forKind", function(kindId, limit, sort) {
  new SimpleSchema({
    kindId: {type: String},
    limit: {type: Number},
    sort: {type: String}
  }).validate({ kindId, limit, sort });

  const classifications = Classifications.find({kindId})
  let stuffIds = []
  classifications.forEach(function(c) {
    stuffIds.push(c.stuffId)
  })

  // Sorting options for Stuffs query
  const stuffQuery = {_id: {$in: stuffIds}}
  let sortOptions = []
  const sortables = ["updatedAt", "name", "numCompats"]
  const defaultSort = [["numCompats", "desc"], ["name", "asc"], ["updatedAt", "desc"]]

  if(_.contains(sortables, sort)) {
    sortOptions.push([sort, "desc"])
  }
  _.each(defaultSort, s => { sortOptions.push(s) })
  const stuffOptions = {sort: sortOptions, limit: Math.min(limit, MAX_STUFFS)}

  Counts.publish(this, `stuffs.forKind.${kindId}`, Stuffs.find(stuffQuery));
  return Stuffs.find(stuffQuery, stuffOptions)
});
