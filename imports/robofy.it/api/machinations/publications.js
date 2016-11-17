import Machinations from '../../common/collections/machinations.js';

Meteor.publish("machinations.get", function(machinationId) {
  console.log('machinations.get');
  console.log(machinationId);
  new SimpleSchema({
    machinationId: {type: String}
  }).validate({ machinationId });

  console.log('padded validation');
  return Machinations.find({_id: machinationId});
});

Meteor.publish("machinations.list", function() {
  return Machinations.find();
});
