import AnswersSchema from '../schemas/answers-schema.js';

const Answers = new Mongo.Collection("Answers");
Answers.attachSchema(AnswersSchema);

export default Answers;
