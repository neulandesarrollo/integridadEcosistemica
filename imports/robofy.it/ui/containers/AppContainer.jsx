import { Meteor } from 'meteor/meteor'
import React from 'react'
import { createContainer } from 'meteor/react-meteor-data'
// import Navbar from '../components/Navbar.jsx'

const App = (props) => (
  <div id="robofy-it">
    {props.main}
  </div>
);

export default AppContainer = createContainer(props => {
  // props here will have `main`, passed from the router
  // anything we return from this function will be *added* to it
  return {
    // user: Meteor.user(),
  };
}, App);
