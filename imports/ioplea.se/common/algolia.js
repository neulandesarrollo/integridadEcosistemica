export const indexName = (name) => {
  return Meteor.isDevelopment ? ("dev-" + name) : name
}
