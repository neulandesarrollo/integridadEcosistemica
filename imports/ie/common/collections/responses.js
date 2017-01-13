import ResponsesSchema from '../schemas/responses-schema.js';

const Responses = new Mongo.Collection("Responses");
Responses.attachSchema(ResponsesSchema);

export default Responses;
