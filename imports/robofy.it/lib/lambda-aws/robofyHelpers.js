'use strict';

const spotifyHelpers = require('./spotifyHelpers.js');

exports.handleIoTButtonEvent = function(eventType) {
  const a = spotifyHelpers.ACTIONS;
  // TODO: Make these API calls to geeky.rocks to get the user preferences
  // Defaults should be defined on the API, not in the code

  const shortActions = [ a.FOLLOW_ARTIST ];
  const longActions = [ a.FOLLOW_ARTIST ];
  const doubleActions = [
    a.FOLLOW_USER,
    a.FOLLOW_ARTIST,
    a.FOLLOW_PLAYLIST
  ];

  let actions = null;
  switch(eventType) {
    case "long":
      actions = longActions;
      break;
    case "double":
      actions = doubleActions;
      break;
    case "short":
    default:
      actions = shortActions;
      break;
  }

  spotifyHelpers.performActions(actions);
}
