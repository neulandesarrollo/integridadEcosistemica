export default StuffsSchema = new SimpleSchema({
  name: {
    type: String
  },
  description: {
    type: String
  },
  company: {
    type: String
  },
  iconUrl: {
    type: String
  },
  popularity: {
    type: Number,
    optional: true
  },
  isVisible: {
    type: Boolean
  },
  numCompats: {
    type: Number
  },
  updatedAt: {
    type: Date
  }
});
