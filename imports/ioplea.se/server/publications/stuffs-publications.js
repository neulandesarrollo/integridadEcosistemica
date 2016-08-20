import { Meteor } from 'meteor/meteor';
import { Compatibilities } from '../../common/collections/compatibilities.js';
import { Stuffs } from '../../common/collections/stuffs.js';

Meteor.publish("stuffs.list", (stuffIds) => {
  return Stuffs.find({_id: {$in: stuffIds}, isVisible: true});
});

Meteor.publishComposite('stuffs.forThings', function(thingIds) {
  new SimpleSchema({
    thingIds: {type: [String]}
  }).validate({ thingIds });

  return {
    find() {
      const query = {thingId: {$in: thingIds}}

      // We only need the _id field in this query, since it's only
      // used to drive the child queries to get the Stuffs
      const options = {
        fields: { _id: 1, stuffId: 1 }
      };

      return Compatibilities.find(query, options);
    },

    children: [{
      find(compatibility) {
        return Stuffs.find({ _id: compatibility.stuffId });
      }
    }]
  };
});
