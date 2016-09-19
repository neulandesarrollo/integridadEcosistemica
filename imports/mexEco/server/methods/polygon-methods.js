import { Polygons } from '../../common/collections/polygons.js'
import { Answers } from '../../common/collections/answers.js'

Meteor.methods({
  'polygons.insert': (polygon, answers) => {
    Polygons.simpleSchema().namedContext().validate(polygon)

    // Ensure answers is an array of objects
    new SimpleSchema({
      answers: { type: [Object] },
    }).validate({answers});
    _.each(answers, a => {
      Answers.simpleSchema().namedContext().validate(a)
    })
    
    console.log('count');
    console.log(polygon);
    // console.log(polygon.geoJSON.geometry.coordinates);
    console.log(Polygons.find().count());
    const polygonId = Polygons.insert(polygon)

    _.each(answers, a => {
      Answers.insert({
        polygonId,
        questionId: a.questionId,
        userId: this.userId,
        val: a.val
      })
    })
  },
});
