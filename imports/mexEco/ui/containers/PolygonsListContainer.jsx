import { Meteor } from 'meteor/meteor';
import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Polygons } from '../../common/collections/polygons.js'
import { PolygonsList } from '../components/PolygonsList.jsx'

export default PolygonsListContainer = createContainer(props => {
  // get polygons
  const polygonHandle = Meteor.subscribe("polygons.all");
  const isLoading = !polygonHandle.ready()

  return {
    user: props.user,
    isLoading,
    polygons: isLoading ? [] : Polygons.find().fetch(),
  };
}, PolygonsList);
