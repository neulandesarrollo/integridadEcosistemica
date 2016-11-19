import { Meteor } from 'meteor/meteor'
import React from 'react'
import { createContainer } from 'meteor/react-meteor-data'

import Navbar from '../components/sections/NavbarSection.jsx'
import Footer from '../components/sections/FooterSection.jsx';


const App = (props) => (
  <div id="robofy-it">
    <Navbar routeName={props.routeName} />
    {React.cloneElement(props.main, {routeName: props.routeName})}
    <Footer />
  </div>
);

export default AppContainer = createContainer(params => {
  let routeName = null;

  Tracker.autorun(function() {
    FlowRouter.watchPathChange();
    routeName = FlowRouter.current().route.name;
  });

  return {
    routeName
  };
}, App);
