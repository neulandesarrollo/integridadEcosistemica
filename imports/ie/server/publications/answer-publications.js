import Answers from '../../common/collections/answers.js';

Meteor.publish("answers.find", function(selector) {
	new SimpleSchema({
		userId: {type: String},
    polygonId: {type: String},
  }).validate(selector);

	return Answers.find(selector);
});
