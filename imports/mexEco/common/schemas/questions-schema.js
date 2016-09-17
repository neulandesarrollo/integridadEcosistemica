export default QuestionsSchema = new SimpleSchema({
  category: {
    type: String
  },
  text: {
    type: String
  },
  answers: {
    type: [String]
  },
  isActive: {
    type: Boolean
  }
});
