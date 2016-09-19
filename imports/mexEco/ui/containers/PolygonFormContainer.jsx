import { Meteor } from 'meteor/meteor'
import { createContainer } from 'meteor/react-meteor-data'

import { STATES } from '../pages/MapPage.jsx'
import PolygonForm from '../components/PolygonForm.jsx'

import { Questions } from '../../common/collections/questions.js'

export default PolygonFormContainer = createContainer(({ currentPolygon, setDrawState, state }) => {
  let isLoading = false
  let questionsHandle = null

  if(state === STATES.INSERTING) {
    questionsHandle = Meteor.subscribe('questions.all');
    isLoading = !questionsHandle.ready();
  }

  return {
    currentPolygon,
    isLoading,
    setDrawState,
    questions: isLoading ? [] : Questions.find().fetch(),
  };
}, PolygonForm);
