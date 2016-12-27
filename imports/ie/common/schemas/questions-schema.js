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
  },
  createdAt : {
    type: Date,
    autoValue: function() {
      if (this.isInsert) {
        return new Date;
      } else if (this.isUpsert) {
        return {$setOnInsert: new Date};
      } else {
        this.unset();
      }
    }
  },
  updatedAt : {
    type: Date,
    autoValue: function() {
      if (this.isUpdate) {
        return new Date();
      }
    }
});
