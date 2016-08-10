import '../../server/algolia.js';
import { seed } from '../../server/fixtures/fixtures.js';
import '../../server/publications/classifications-publications.js';
import '../../server/publications/compatibilities-publications.js';
import '../../server/publications/kinds-publications.js';
import '../../server/publications/stuffs-publications.js';
import '../../server/publications/things-publications.js';

export function startupIOPlease() {
  seed();
}
