const secretPath =
JsonRoutes.add("get", "/configs/" + Meteor.settings.appSecret + "/:id", function (req, res, next) {
  var id = req.params.id;

  JsonRoutes.sendResult(res, {
    data: Posts.findOne(id)
  });
});
