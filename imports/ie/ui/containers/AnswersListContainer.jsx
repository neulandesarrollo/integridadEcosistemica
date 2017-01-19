import { Meteor } from 'meteor/meteor';
import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import Answers from '../../common/collections/answers.js';
import AnswersList from '../components/widgets/AnswersList.jsx';

export default AnswersListContainer = createContainer(({ currentResponseId }) => {
	const selector = {
		responseId: currentResponseId
	}

	console.log('AnswersListContainer');
	console.log(selector);
	
	let isLoading = true;

	if(currentResponseId) {
		const answersHandle = Meteor.subscribe('answers.find', selector);
		isLoading = !answersHandle.ready();
	}

  return {
    isLoading,
    answers: !isLoading ? Answers.find(selector).fetch() : [],
		currentResponseId
  };
}, AnswersList);
