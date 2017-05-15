import React from 'react';
import {mount} from 'enzyme';

import injectTapEventPlugin from 'react-tap-event-plugin';


import Top from '../Top';

describe('Top Tests', () => {
  let item = null;
  let sampleFormData = {
    name: "name",
    company: "company",
    termsAccepted: false
  };
  
  beforeEach((done) => {
    item = mount(
      <Top 
        formData={sampleFormData}
      />);
    done();
  });
  
  it('should mount', () => {
    expect(item).not.toBe(null);
  })
});