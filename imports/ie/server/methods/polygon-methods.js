import Answers from '../../common/collections/answers.js';
import Polygons from '../../common/collections/polygons.js';
import Responses from '../../common/collections/responses.js';
import Questions from '../../common/collections/questions.js';

const classifyPolygon = (userId, username, polygonId, answers) => {
	const responseId = Responses.insert({
		userId,
		username,
		polygonId,
		createdAt: new Date()
	});

	Polygons.update(polygonId, {
		$inc: {numResponses: 1},
		$set: {lastRespondedAt: new Date()}
	});

	_.each(answers, a => {
		const question = Questions.findOne(a.questionId)
		if(a.value) {
			Answers.insert({
				username,
				questionId: a.questionId,
				questionText: question.text,
				userId,
				responseId,
				polygonId,
				value: a.value,
				text: question.answers[a.value],
				createdAt: new Date(),
				updatedAt: new Date()
			});
		}
	});
}

Meteor.methods({
	'polygons.insert': (polygon, answers) => {
		const userId = Meteor.userId();

		if(userId) {
			const user = Accounts.users.findOne(userId);
			const email = user.emails[0].address
			const polygonId = Polygons.insert(_.extend(polygon, {
					username: email,
					isActive: true,
					lastRespondedAt: new Date(),
					numResponses: 0,
					createdAt: new Date(),
					updatedAt: new Date()
				}));

			classifyPolygon(userId, email, polygonId, answers);

			return polygonId;
		} else {
			throw new Meteor.Error("Must be logged in to create polygons");
		}
	}
});

Meteor.methods({
	'polygons.classify': (polygonId, answers) => {
		const userId = Meteor.userId();

		if(userId) {
			const user = Accounts.users.findOne(userId);
			const email = user.emails[0].address
			classifyPolygon(userId, email, polygonId, answers);

			return polygonId;
		} else {
			throw new Meteor.Error("Must be logged in to create polygons");
		}
	}
})
