import ControllingsSchema from '../schemas/controllings-schema.js';

export const Controllings = new Mongo.Collection("Controllings");
Controllings.attachSchema(ControllingsSchema);
