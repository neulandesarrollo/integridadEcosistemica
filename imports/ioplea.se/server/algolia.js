import algoliasearch from 'algoliasearch';

import { Things } from '../common/collections/things.js';

Meteor.startup(() => {
  console.log('Setting attributesToIndex');
  const client = algoliasearch(
    Meteor.settings.AGOLIA_SEARCH.applicationID,
    Meteor.settings.AGOLIA_SEARCH.apiKey
  );

  const thingsIndex = client.initIndex('things');

  thingsIndex.setSettings({attributesToIndex: ["searchableName"]}, err => {
    if (err) {
      console.log('Error setting attributesToIndex');
      console.error(err);
    } else {
      console.log("Success setting attributesToIndex");
    }
  })
});


Things.after.insert((thingId, doc) => {
  console.log('Adding Thing to Algolia index');
  const client = algoliasearch(
    Meteor.settings.AGOLIA_SEARCH.applicationID,
    Meteor.settings.AGOLIA_SEARCH.apiKey
  );

  const thingsIndex = client.initIndex('things');

  thingsIndex.addObject(doc, thingId, (err, content) => {
    if (err) {
      console.log('Error adding index');
      console.error(err);
    } else {
      console.log("Success adding index");
    }
  });
});
