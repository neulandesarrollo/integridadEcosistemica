export default AnswersSchema = new SimpleSchema({
  questionId: {
    type: String
  },
	questionText: {
		type: String
	},
  userId: {
    type: String
  },
	responseId: {
		type: String
	},
  polygonId: {
    type: String
  },
  value: {
    type: Number
  },
	text: {
		type: String
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
	}
});
