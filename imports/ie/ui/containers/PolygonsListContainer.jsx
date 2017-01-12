import { Meteor } from 'meteor/meteor';
import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import Polygons from '../../common/collections/polygons.js';
import PolygonsList from '../components/widgets/PolygonsList.jsx';

export default PolygonsListContainer = createContainer(({currentPolygonId, consumeMapboxEvent}) => {
  const polygonsHandle = Meteor.subscribe('polygons.active');
  const isLoading = !polygonsHandle.ready();

  return {
    isLoading,
    polygons: !isLoading ? Polygons.find().fetch() : [],
		consumeMapboxEvent,
		currentPolygonId
  };
}, PolygonsList);
