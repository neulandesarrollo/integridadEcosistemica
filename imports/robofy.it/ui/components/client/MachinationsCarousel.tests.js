import { Meteor } from 'meteor/meteor';
import { Factory } from 'meteor/dburles:factory';
import React from 'react';
import { shallow } from 'enzyme';
import { chai } from 'meteor/practicalmeteor:chai';

// import '../../../tests/factories/machinations-factory.js';
import MachinationsCarousel from '../MachinationsCarousel.jsx';
import Machinations from '../../../common/collections/machinations.js';

describe('Machinations Carousel', function() {
  console.log("another thing i am doing");

  let machina1 = null;
  let machina2 = null;

  beforeEach(() => {
    machina1 = Factory.build('machination');
    machina2 = Factory.build('machination');
  });

  it('should render each Machination.', function() {

    const item = shallow(
      <MachinationsCarousel
        machinas={[machina1, machina2]}
        isLoading={false}  />
    );

    chai.assert.equal(item.find('.machination').length, 2);
    chai.assert.equal(item.contains("Robofy"), true);
  });
});
