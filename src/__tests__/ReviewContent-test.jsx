import React from 'react';
import {mount} from 'enzyme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import injectTapEventPlugin from 'react-tap-event-plugin';


import ReviewContent from '../ReviewContent';

describe('Review Content Tests', () => {
  let item = null;
  let sampleFormData = {
    name: "name",
    company: "company",
    termsAccepted: false
  };
  
  beforeEach((done) => {
    injectTapEventPlugin();
    item = mount(
      <MuiThemeProvider>
        <ReviewContent 
          formData={sampleFormData}
        />
      </MuiThemeProvider>);
    done();
  });
  
  it('should mount', () => {
    expect(item).not.toBe(null);
  });
  
  it('onSubmit gets called', () => {
    //TODO
  });
  
  it('onBack gets called', () => {
    //TODO
  });
  
  it('onFieldChange gets called', () => {
    //TODO
  });
});