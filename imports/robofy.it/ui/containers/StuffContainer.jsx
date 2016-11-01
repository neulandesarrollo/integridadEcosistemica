import { Meteor } from 'meteor/meteor';
import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Stuffs } from '../../common/collections/stuffs.js';
import StuffPage from '../pages/StuffPage.jsx';

export default StuffContainer = createContainer(({stuffId}) => {
  const stuffHandle = Meteor.subscribe("stuff", stuffId);
  const stuff = Stuffs.findOne(stuffId)

  if(stuff) {
    DocHead.removeDocHeadAddedTags()

    DocHead.setTitle(stuff.name + " = good stuff");
    var metaInfo =[
      {
        name: "description",
        content: stuff.name + " is just one of the many cool things you can do with your IoT. " + stuff.description,
      },
    ]

    _.each(metaInfo, m => {
      DocHead.addMeta(m);
    })
  }

  return {
    loading: !stuff,
    stuff
  };
}, StuffPage);
