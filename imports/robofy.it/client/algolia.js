import { indexName } from '../common/algolia.js';

export const algoliaThingsIndex = (win) => {
  const client = win.algoliasearch(
    Meteor.settings.public.AGOLIA_SEARCH.applicationID,
    Meteor.settings.public.AGOLIA_SEARCH.searchApiKey
  );

  return client.initIndex(indexName('things'));
}
