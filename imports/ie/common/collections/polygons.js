import PolygonsSchema from '../schemas/polygons-schema.js';

const Polygons = new Mongo.Collection("Polygons");
Polygons.attachSchema(PolygonsSchema);

export default Polygons;
