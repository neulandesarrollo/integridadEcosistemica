import { Meteor } from 'meteor/meteor'
import { createContainer } from 'meteor/react-meteor-data'

import RegionPage, { STATES } from '../pages/RegionPage.jsx'

import { Polygons } from '../../common/collections/polygons.js'

export default RegionContainer = createContainer(({user}) => {
  console.log("MapContainer");
  console.log(user);

  const polygonId = FlowRouter.getParam("polygonId")
  console.log(polygonId);

  let isLoading = false
  let polygonHandle = null
  let currentPolygon = null

  if(polygonId) {
    polygonHandle = Meteor.subscribe("polygons.get", polygonId);
    isLoading = !polygonHandle.ready();

    if(!isLoading) {
      currentPolygon = Polygons.findOne(polygonId)
    }
  }


  return {
    user,
    currentPolygon,
    isLoading,
  };
}, RegionPage);
