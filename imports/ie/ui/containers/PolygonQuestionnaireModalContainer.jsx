import { Meteor } from 'meteor/meteor';
import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import Questions from '../../common/collections/questions.js';
import PolygonQuestionnaireModal from '../components/widgets/PolygonQuestionnaireModal.jsx';

export default PolygonQuestionnaireModalContainer = createContainer(({ currentPolygonId }) => {
  const questionsHandle = Meteor.subscribe('questions.active');
  const isLoading = !questionsHandle.ready();

  return {
    isLoading,
    questions: !isLoading ? Questions.find().fetch() : [],
		currentPolygonId
  };
}, PolygonQuestionnaireModal);
