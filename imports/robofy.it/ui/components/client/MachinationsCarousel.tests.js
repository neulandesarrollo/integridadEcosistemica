import { Meteor } from 'meteor/meteor';
import { Factory } from 'meteor/dburles:factory';
import React from 'react';
import { shallow } from 'enzyme';
import { chai } from 'meteor/practicalmeteor:chai';
import chaiEnzyme from 'chai-enzyme'

chai.use(chaiEnzyme())

// import '../../../tests/factories/machinations-factory.js';
import MachinationsCarousel from '../MachinationsCarousel.jsx';
import MachinationsCarouselItem from '../MachinationsCarouselItem.jsx';
import Machinations from '../../../common/collections/machinations.js';

describe('Machinations Carousel', function() {
  let machina1 = null;
  let machina2 = null;

  beforeEach(() => {
    machina1 = Factory.build('machination', {_id: 1});
    machina2 = Factory.build('machination', {_id: 2, name: ""});
  });

  it('should render each Machination.', function() {

    const item = shallow(
      <MachinationsCarousel
        machinas={[machina1, machina2]}
        isLoading={false}  />
    );

    chai.expect(item).to.contain.exactly(2).descendants(MachinationsCarouselItem);
  });
});
