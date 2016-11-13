import { Meteor } from 'meteor/meteor';
import { Factory } from 'meteor/dburles:factory';
import React from 'react';
import { shallow } from 'enzyme';
import { chai } from 'meteor/practicalmeteor:chai';

// import '../../../tests/factories/machinations-factory.js';
import MachinationsCarouselItem from '../MachinationsCarouselItem.jsx';
import Machinations from '../../../common/collections/machinations.js';

describe('Machinations Carousel Item', function() {
  let machina1 = null;

  beforeEach(() => {
    machina1 = Factory.build('machination', {name: "test name"});
  });

  it('should render an item in the carousel.', function() {

    const item = shallow(
      <MachinationsCarouselItem
        isActive={true}
        machina={machina1}  />
    );

    chai.assert.equal(item.find('.active').length, 1);
    chai.assert.equal(item.contains("test name"), true);
  });
});
