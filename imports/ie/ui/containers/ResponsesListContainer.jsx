import { Meteor } from 'meteor/meteor';
import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import Responses from '../../common/collections/responses.js';
import ResponsesList from '../components/widgets/ResponsesList.jsx';

export default ResponsesListContainer = createContainer(({currentPolygonId, currentUserId, setCurrentUserId}) => {
  const responsesHandle = Meteor.subscribe('responses.forPolygon', currentPolygonId);
  const isLoading = !responsesHandle.ready();

  return {
    isLoading,
    responses: !isLoading ? Responses.find().fetch() : [],
		currentUserId,
		setCurrentUserId
  };
}, ResponsesList);
