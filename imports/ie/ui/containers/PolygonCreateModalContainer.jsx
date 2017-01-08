import { Meteor } from 'meteor/meteor';
import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import Questions from '../../common/collections/questions.js';
import PolygonCreateModal from '../components/widgets/PolygonCreateModal.jsx';

export default PolygonCreateModalContainer = createContainer(params => {
  const questionsHandle = Meteor.subscribe('questions.active');
  const isLoading = !questionsHandle.ready();

	console.log('polys');
	console.log(Questions.find().count());

  return {
    isLoading,
    questions: !isLoading ? Questions.find().fetch() : [],
  };
}, PolygonCreateModal);
