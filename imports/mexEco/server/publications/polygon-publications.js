import { Polygons } from '../../common/collections/polygons.js'

Meteor.publish("polygons.all", function() {
  return Polygons.find({})
});

Meteor.publish("polygons.get", function(polygonId) {
  return Polygons.find({_id: polygonId})
});
