import React from 'react';
import {mount} from 'enzyme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import injectTapEventPlugin from 'react-tap-event-plugin';


import FormContent from '../FormContent';

describe('Form Content Tests', () => {
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
        <FormContent 
          formData={sampleFormData}
        />
      </MuiThemeProvider>);
    done();
  });
  
  it('should mount', () => {
    expect(item).not.toBe(null);
  });
});