import { Meteor } from 'meteor/meteor';
import { Classifications } from '../../common/collections/classifications.js';
// import { Compatibilities } from '../../common/collections/compatibilities.js';
// import { Controllers } from '../../common/collections/controllers.js';
import { Kinds } from '../../common/collections/kinds.js';
// import { Stuffs } from '../../common/collections/stuffs.js';
// import { Things } from '../../common/collections/things.js';

Meteor.methods({
  'kinds.get': () => {
    console.log('kinds.get');
    const kinds = Kinds.find().fetch()

    return _.map(kinds, k => {
      console.log(k);
      return { kind: k, stuffsCount: Classifications.find({kindId: k._id}).count()}
    })
  }
})
