import './methods/polygon-methods.js';
import './publications/answer-publications.js';
import './publications/polygon-publications.js';
import './publications/question-publications.js';

import { seedQuestions } from './fixtures/fixtures.js'

export function startupMexEco() {
  seedQuestions();
}
