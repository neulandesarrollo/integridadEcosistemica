ServiceConfiguration.configurations.update(
  { "service": "spotify" },
  {
    $set: {
      "clientId": Meteor.settings.public.spotify.clientId,
      "secret": Meteor.settings.spotify.clientSecret
    }
  },
  { upsert: true }
);
