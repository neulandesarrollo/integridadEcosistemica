import QuestionsSchema from '../schemas/questions-schema.js';

const Questions = new Mongo.Collection("Questions");
Questions.attachSchema(QuestionsSchema);

export default Questions;
