import { Meteor } from 'meteor/meteor'
import { createContainer } from 'meteor/react-meteor-data'

import { STATES } from '../pages/MapPage.jsx'
import PolygonForm from '../components/PolygonForm.jsx'

import { Questions } from '../../common/collections/questions.js'

export default PolygonFormContainer = createContainer(({state, setDrawState}) => {
  console.log("PolygonFormContainer");
  console.log(state);
  let isLoading = false
  let questionsHanle = null

  if(state === STATES.INSERTING) {
    questionsHandle = Meteor.subscribe('questions.all');
    isLoading = !questionsHandle.ready();
  }

  console.log("questions loading");
  console.log(isLoading);

  console.log(Questions.find().fetch());

  return {
    isLoading,
    questions: isLoading ? [] : Questions.find().fetch(),
    setDrawState
  };
}, PolygonForm);
