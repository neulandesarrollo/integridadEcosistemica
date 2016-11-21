import faker from 'faker';

const Configs = new Mongo.Collection("Configs");

const ConfigsSchema = new SimpleSchema({
  name: {
    type: String
  },
  value: {
    type: String
  },
  userId: {
    type: String
  },
  machinationId: {
    type: String
  },
  createdAt : {
		type: Date,
		autoValue: function() {
			if (this.isInsert) {
				return new Date;
			} else if (this.isUpsert) {
				return {$setOnInsert: new Date};
			} else {
				this.unset();
			}
		}
	},
	updatedAt : {
		type: Date,
		autoValue: function() {
			if (this.isUpdate) {
				return new Date();
			}
		},
		denyInsert: true,
		optional: true
  },
});
Configs.attachSchema(ConfigsSchema);

export default Configs;
