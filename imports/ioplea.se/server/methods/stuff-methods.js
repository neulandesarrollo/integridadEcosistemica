import { Meteor } from 'meteor/meteor';
import { Classifications } from '../../common/collections/classifications.js';
import { Compatibilities } from '../../common/collections/compatibilities.js';
import { Controllers } from '../../common/collections/controllers.js';
import { Kinds } from '../../common/collections/kinds.js';
import { Stuffs } from '../../common/collections/stuffs.js';
import { Things } from '../../common/collections/things.js';

Meteor.methods({
  'stuffs.insert': (stuff, thingIds, kindIds) => {
    stuff["isVisible"] = false
    const stuffId = Stuffs.insert(stuff)

    if(stuffId) {
      _.each(thingIds, thingId => {
        const thing = Things.findOne(thingId)
        if(thing)
          Compatibilities.insert({stuffId, thingId})
      })

      _.each(kindIds, kindId => {
        const kind = Kinds.findOne(kindId)
        if(kind)
          Classifications.insert({stuffId, kindId, kindName: kind.name, kindIconUrl: kind.iconUrl})
      })
    }

    return stuffId;
  }
});
