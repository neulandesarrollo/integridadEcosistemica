'use strict';

const _ = require("underscore");

const ACTIONS = {
  FOLLOW_USER: "follow-user",
  FOLLOW_ARTIST: "follow-artist",
  FOLLOW_PLAYLIST: "follow-playlist",
  SAVE_ALBUM: "save-album",
  SAVE_TRACK: "save-track",
  ADD_TO_PLAYLIST: "add-to-playlist"
};

exports.ACTIONS = ACTIONS;

exports.performActions = function(actions) {
  _.each(actions, performAction);
};

const performAction = function(action) {
  console.log("performAction");

  switch(action) {
    case ACTIONS.FOLLOW_ARTIST:
      console.log("FOLLOW ARTIST");
      break;
    default:
      console.log("Something else");
  }

}
