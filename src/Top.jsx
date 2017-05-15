import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Tabs, Tab} from 'material-ui/Tabs';

import FormContent from './FormContent';
import ReviewContent from './ReviewContent';
import FinalContent from './FinalContent';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {blue500, black700} from 'material-ui/styles/colors';

const FORM = 'FORM';
const REVIEW = 'REVIEW';
const FINAL = 'FINAL';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: blue500,
    accent1Color: black700
  }
});

export default class Top extends Component {
  onTabChange = (value) => {
    this.props.onFormChange(value);
  }
  
  onReviewClick = () => {
    this.onTabChange(REVIEW);
  };
  
  onBackClick = () => {
    this.onTabChange(FORM);
  };
  
  onSubmit = () => {
    this.onTabChange(FINAL);
  };
    
  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <Tabs value={this.props.selectedTab}
          onChange={this.onTabChange}
        >
          <Tab label="Form" value={FORM} >
            <FormContent formData={this.props.formData}
              onReviewClick={this.onReviewClick}
              onFieldChange={this.props.onFieldChange}
            />
          </Tab>
          <Tab label="Review" value={REVIEW} >
            <ReviewContent formData={this.props.formData}
              onBackClick={this.onBackClick}
              onSubmit={this.onSubmit}
              onFieldChange={this.props.onFieldChange}
            />
          </Tab>
          <Tab label="Final" value={FINAL} >
            <FinalContent formData={this.props.formData}
              onFieldChange={this.props.onFieldChange}
            />
          </Tab>
        </Tabs>
      </MuiThemeProvider>
    );
  }
}

Top.PropTypes = {
  onFormChange: PropTypes.func.required,
  formData: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    company: PropTypes.string,
    termsAccepted: PropTypes.boolean
  }),
  formPage: PropTypes.string,
  onFieldChange: PropTypes.func
};