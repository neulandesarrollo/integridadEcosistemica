import Answers from '../../common/collections/answers.js';
import Polygons from '../../common/collections/polygons.js';
import Responses from '../../common/collections/responses.js';
import Questions from '../../common/collections/questions.js';

Meteor.methods({
	'polygons.insert': (polygon, answers) => {
		console.log('polygons.insert');
		console.log(answers);

		if(Meteor.userId()) {
			const user = Accounts.users.findOne(Meteor.userId());
			const email = user.emails[0].address
			const polygonId = Polygons.insert(_.extend(polygon, {
					username: email,
					isActive: true,
					lastRespondedAt: new Date(),
					numResponses: 0,
					createdAt: new Date(),
					updatedAt: new Date()
				}));

			const responseId = Responses.insert({
				userId: Meteor.userId(),
				username: email,
				polygonId,
				createdAt: new Date()
			});

			_.each(answers, a => {
				if(a.value) {
					Answers.insert({
						username: email,
						questionId: a.questionId,
						questionText: Questions.findOne(a.questionId).text,
						userId: Meteor.userId(),
						responseId,
						polygonId,
						value: a.value,
						createdAt: new Date(),
						updatedAt: new Date()
					});
				}
			});

			return polygonId;
		} else {
			throw new Meteor.Error("Must be logged in to create polygons");
		}
	}
})
