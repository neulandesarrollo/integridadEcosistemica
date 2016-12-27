ServiceConfiguration.configurations.update(
  { "service": "spotify" },
  {
    $set: {
      "clientId": Meteor.settings.public.robofy.spotify.clientId,
      "secret": Meteor.settings.robofy.spotify.clientSecret
    }
  },
  { upsert: true }
);
