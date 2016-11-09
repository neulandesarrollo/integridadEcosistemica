import { Meteor } from 'meteor/meteor';
import { Factory } from 'meteor/dburles:factory';
import React from 'react';
import { shallow } from 'enzyme';
import { chai } from 'meteor/practicalmeteor:chai';

// import '../../../tests/factories/machinations-factory.js';
import FeaturedMachinations from '../FeaturedMachinations.jsx';
import Machinations from '../../../common/collections/machinations.js';
describe('Featured Machinations', function() {
  console.log("another thing i am doing");

  let unFeaturedMachina = null;
  let featuredMachina = null;
  let router = null;

  beforeEach(() => {
    unFeaturedMachina = Factory.build('machination', { isFeatured: false });
    // featuredMachina = Factory.build('machination', { isFeatured: true });
  });

  it('should render', function() {

    const item = shallow(<FeaturedMachinations machinations={[unFeaturedMachina, featuredMachina]} />);

    chai.assert.equal(item.find('.machination').length, 1);
  });
});
