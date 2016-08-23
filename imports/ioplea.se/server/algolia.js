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
  const doIndex = ["searchableName", "company", "name"]
  algoliaThingsIndex().setSettings({attributesToIndex: doIndex}, err => {
    if (err) {
      console.log('Error setting attributesToIndex');
      console.error(err);
    } else {
      console.log("Success setting attributesToIndex with Algolia");
    }
  })
});

Things.after.insert((error, doc) => {
  const thingId = doc._id
  console.log(thingId);
  algoliaThingsIndex().addObject(_.omit(doc, "_id"), thingId, (err, content) => {
    if (err) {
      console.log('Error adding index');
      console.error(err);
    } else {
      // console.log("Success adding index");
    }
  });
});

export function resetIndices(callback) {
  algoliaThingsIndex().deleteByQuery('', error => {
    console.log(error);
    if (!error) {
      console.log('Successfully deleted all Algolia indices');
    }
    callback(error)
  });
}
