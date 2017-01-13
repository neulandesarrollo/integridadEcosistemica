import '../../server/methods/polygon-methods.js';
// import '../../server/publications/answer-publications.js';
import '../../server/publications/answer-publications.js';
import '../../server/publications/polygon-publications.js';
import '../../server/publications/question-publications.js';
import '../../server/publications/response-publications.js';

import { seedQuestions } from './fixtures.js'

const startupIE = () => {
  seedQuestions();
}

export default startupIE;
