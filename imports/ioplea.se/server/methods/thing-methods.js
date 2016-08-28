import { Things } from '../../common/collections/things.js';

Meteor.methods({
  'ioplease.shuffle': () => {
    const thingCount = Things.find().count()
    const n = getRandomInt(0, thingCount)

    return Things.findOne({},{skip: n})
  }
});

// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
