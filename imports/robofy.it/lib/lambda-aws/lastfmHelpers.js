'use strict';

const LastFmNode = require('lastfm').LastFmNode;

exports.getCurrentTrack = function() {
  const lastfm = new LastFmNode({
    api_key: process.env.LASTFM_KEY,    // sign-up for a key at http://www.last.fm/api
    secret: process.env.LASTFM_SECRET,
    // useragent: 'appname/vX.X MyApp' // optional. defaults to lastfm-node.
  });

  const recentTracks = lastfm.request("user.getRecentTracks", {
    user: "maaarnold",
    limit: 1
  });

  recentTracks.on('success', function(json) {
    console.log('last fm say:');
    console.log(json.recenttracks.track[0]);
  });

  return "something I made up";
}
