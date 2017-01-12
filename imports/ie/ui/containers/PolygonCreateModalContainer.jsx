import { Meteor } from 'meteor/meteor';
import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import Questions from '../../common/collections/questions.js';
import PolygonCreateModal from '../components/widgets/PolygonCreateModal.jsx';

export default PolygonCreateModalContainer = createContainer(({ currentPolygon, consumeMapboxEvent }) => {
  const questionsHandle = Meteor.subscribe('questions.active');
  const isLoading = !questionsHandle.ready();

  return {
    isLoading,
    questions: !isLoading ? Questions.find().fetch() : [],
		currentPolygon,
		consumeMapboxEvent
  };
}, PolygonCreateModal);
