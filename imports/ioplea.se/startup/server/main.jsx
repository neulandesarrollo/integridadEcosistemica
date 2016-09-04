import '../../server/algolia.js';
import '../../server/compatibilities-counter.js';
import { seed } from '../../server/fixtures/fixtures.js';
import '../../server/publications/classifications-publications.js';
import '../../server/publications/compatibilities-publications.js';
import '../../server/publications/controllings-publications.js';
import '../../server/publications/kinds-publications.js';
import '../../server/publications/stuffs-publications.js';
import '../../server/publications/things-publications.js';
import '../../server/methods/stuff-methods.js';
import '../../server/methods/thing-methods.js';

export function startupIOPlease() {
  seed();
}
