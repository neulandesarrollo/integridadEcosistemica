import { Meteor } from 'meteor/meteor'
import React from 'react'
import { createContainer } from 'meteor/react-meteor-data'

import Navbar from '../components/sections/NavbarSection.jsx'
import Footer from '../components/sections/FooterSection.jsx';


const App = (props) => (
  <div id="robofy-it">
    <Navbar routeName={props.routeName} user={props.user} />
    {React.cloneElement(props.main, {token: props.token})}
    <Footer />
  </div>
);

export default AppContainer = createContainer(params => {
  let routeName = null;

  Tracker.autorun(function() {
    FlowRouter.watchPathChange();
    routeName = FlowRouter.current().route.name;
  });

  const token = FlowRouter.getQueryParam("token");
  const machinationId = FlowRouter.getParam("machinationId");

  if(token && machinationId) {
    const config = {
      name: "token",
      value: token,
      machinationId
    }

    Meteor.call("configs.insert", config, (error, result) => {
      if(error) {
        console.log("error", error);
      }
      if(result) {
        FlowRouter.go("/machinations/" + machinationId);
        console.log("inserted a new config");
        console.log(result);

      }
    });
  }

  return {
    routeName,
    user: Meteor.user(),
    token
  };
}, App);
