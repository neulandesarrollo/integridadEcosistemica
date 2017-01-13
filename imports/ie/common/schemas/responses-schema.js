// When a user responds to a group of questions
// immutable
export default ResponsesSchema = new SimpleSchema({
  userId: {
    type: String
  },
  polygonId: {
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
  }
});
