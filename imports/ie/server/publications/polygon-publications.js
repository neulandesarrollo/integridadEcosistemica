import Polygons from '../../common/collections/polygons.js';

Meteor.publish("polygons.active", function() {
	return Polygons.find({ isActive: true });
});
