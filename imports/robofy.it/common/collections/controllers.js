import ControllersSchema from '../schemas/controllers-schema.js';

export const Controllers = new Mongo.Collection("Controllers");
Controllers.attachSchema(ControllersSchema);
