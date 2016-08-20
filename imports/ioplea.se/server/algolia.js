import { Meteor } from 'meteor/meteor';
import algoliasearch from 'algoliasearch';

import { Things } from '../common/collections/things.js';

import { indexName } from '../common/algolia.js';

const algoliaThingsIndex = () => {
  const client = algoliasearch(
    Meteor.settings.public.AGOLIA_SEARCH.applicationID,
    Meteor.settings.AGOLIA_SEARCH.apiKey
  );

  return client.initIndex(indexName('things'));
}

Meteor.startup(() => {
  console.log('Setting attributesToIndex');

  algoliaThingsIndex().setSettings({attributesToIndex: ["searchableName", "description", "company", "name"]}, err => {
    if (err) {
      console.log('Error setting attributesToIndex');
      console.error(err);
    } else {
      console.log("Success setting attributesToIndex");
    }
  })
});


Things.after.insert((error, doc) => {
  console.log('Adding Thing to Algolia index');

  const thingId = doc._id
  console.log(thingId);
  algoliaThingsIndex().addObject(_.omit(doc, "_id"), thingId, (err, content) => {
    if (err) {
      console.log('Error adding index');
      console.error(err);
    } else {
      console.log("Success adding index");
    }
  });
});

export function resetIndices(callback) {
  console.log('resetting all indices');

  algoliaThingsIndex().deleteByQuery('', error => {
    console.log(error);
    if (!error) {
      console.log('successfully deleted all indices');
    }
    callback(error)
  });

}
