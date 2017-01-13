import Responses from '../../common/collections/responses.js';

Meteor.publish("responses.forPolygon", function(polygonId) {
	new SimpleSchema({
    polygonId: {type: String}
  }).validate({ polygonId });

	return Responses.find({ polygonId });
});
