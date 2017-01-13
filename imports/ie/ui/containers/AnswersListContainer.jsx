import { Meteor } from 'meteor/meteor';
import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import Answers from '../../common/collections/answers.js';
import AnswersList from '../components/widgets/AnswersList.jsx';

export default AnswersListContainer = createContainer(({currentPolygonId, currentUserId}) => {
	const selector = {
		userId: currentUserId,
		polygonId: currentPolygonId
	}

	let isLoading = true;

	if(currentUserId) {
		const answersHandle = Meteor.subscribe('answers.find', selector);
		isLoading = !answersHandle.ready();
	}

  return {
    isLoading,
    answers: !isLoading ? Answers.find(selector).fetch() : [],
		currentUserId
  };
}, AnswersList);
