import { Meteor } from 'meteor/meteor'
import React from 'react'
import { createContainer } from 'meteor/react-meteor-data'

import Navbar from '../components/sections/NavbarSection.jsx'
import Footer from '../components/sections/FooterSection.jsx';


const App = (props) => (
  <div id="robofy-it">
    <Navbar />
    {props.main}
    <Footer />
  </div>
);

export default AppContainer = createContainer(props => {
  // props here will have `main`, passed from the router
  // anything we return from this function will be *added* to it
  return {
    // user: Meteor.user(),
  };
}, App);
