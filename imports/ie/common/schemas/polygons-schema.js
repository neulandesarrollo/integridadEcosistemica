// const lnglatsSchema = new SimpleSchema({
//   lnglats: {
//     type: [Number]
//   },
// });
//
// const geometrySchema = new SimpleSchema({
//   coordinates: {
//     type: [lnglatsSchema]
//   },
//   type: {
//     type: String
//   }
// });

const geoJSONSchema = new SimpleSchema({
  geometry: {
    type: Object
  },
  type: {
    type: String
  }
});

export default PolygonsSchema = new SimpleSchema({
  name: {
    type: String
  },
  username: {
    type: String
  },
  geoJSON: {
    type: geoJSONSchema
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
