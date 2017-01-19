import Questions from '../../common/collections/questions.js'
import { questions } from '../../lib/question-fixtures.js'

export function seedQuestions() {
	// Comment in production
  // Questions.remove({})

  if(Questions.find().count() === 0) {
	  _.each(questions, question => {
			console.log("Inserting question...");
	    Questions.insert(_.defaults(question, {
				isMandatory: false,
				createdAt: new Date(),
				updatedAt: new Date()
			}));
	  });
  }
}
