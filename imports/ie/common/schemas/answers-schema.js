export default PolygonsSchema = new SimpleSchema({
  questionId: {
    type: String
  },
  userId: {
    type: String
  },
  polygonId: {
    type: String
  },
  value: {
    type: Number
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
    },
});
