import { Polygons } from '../../common/collections/polygons.js'
import { Answers } from '../../common/collections/answers.js'

Meteor.methods({
  'polygons.insert': (polygon, answers) => {
    // TODO validate input
    // Polygons.simpleSchema().namedContext().validate(polygon)
    //
    // // Ensure answers is an array of objects
    // new SimpleSchema({
    //   answers: { type: [Object] },
    // }).validate({answers});
    // _.each(answers, a => {
    //   Answers.simpleSchema().namedContext().validate(a)
    // })
    const user = Accounts.users.findOne(Meteor.userId())
    const email = user.emails[0].address
    polygon.username = email
    const polygonId = Polygons.insert(polygon)

    _.each(answers, a => {
      Answers.insert({
        polygonId,
        questionId: a.questionId,
        userId: this.userId,
        val: a.val,
        username: email
      })
    })
  },
});
