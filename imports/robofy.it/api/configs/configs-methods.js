import Configs from '../../common/collections/configs.js';

Meteor.methods({
  'configs.insert': function(config) {
    new SimpleSchema({
      name: {type: String},
      value: {type: String},
      machinationId: {type: String}
    }).validate(config);

    if(!this.userId) {
       throw new Meteor.Error("Must be logged")
    }

    config.userId = this.userId;

    return Configs.update({
      name: config.name,
      machinationId: config.machinationId,
      userId: config.userId
    }, {
      $set: config
    }, {
      upsert: true,
      multi: true
    });
  }
});
