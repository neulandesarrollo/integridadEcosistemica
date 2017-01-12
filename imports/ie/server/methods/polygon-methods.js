import Polygons from '../../common/collections/polygons.js';
import Answers from '../../common/collections/answers.js';

Meteor.methods({
	'polygons.insert': (polygon, answers) => {
		console.log(polygon.geoJSON.geometry);
		if(Meteor.userId()) {
			const user = Accounts.users.findOne(Meteor.userId());
			const email = user.emails[0].address
			const polygonId = Polygons.insert(_.extend(polygon, {
					username: email,
					isActive: true,
					createdAt: new Date(),
					updatedAt: new Date()
				}));

			// _.each(answers, a => {
			// 	Answers.insert({
			// 		polygonId,
			// 		questionId: a.questionId,
			// 		userId: Meteor.userId(),
			// 		val: a.val,
			// 		username: email
			// 	});
			// });

			return polygonId;
		} else {
			throw new Meteor.Error("Must be logged in to create polygons");
		}
	}
})
