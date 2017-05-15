import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Toggle from 'material-ui/Toggle';

const style = {
  toggle: {
    paddingTop: '32px'
  },
  reviewButton: {
    float: 'right',
    marginTop: '16px'
  }
};

export default class FormContent extends Component {
  render() {
    return (
      <div>
        <div>
          <TextField hintText="Your name"
            floatingLabelText="Name"
            value={this.props.formData.name}
            onChange={(event) => this.props.onFieldChange('name', event.target.value)}
          />
        </div>
        <div>
          <TextField hintText="Your company"
            floatingLabelText="Company"
            value={this.props.formData.company}
            onChange={(event) => this.props.onFieldChange('company', event.target.value)}
          />
        </div>
        <div>
          <Toggle label="I agree to the terms of service"
            style={style.toggle}
            toggled={this.props.formData.termsAccepted}
            onToggle={(event, value) => this.props.onFieldChange('termsAccepted', value)}
          />
        </div>
        <div>      
          <RaisedButton label="Review" 
            style={style.reviewButton}
            onTouchTap={this.props.onReviewClick}
          />
        </div>
      </div>
    );
  }
}

FormContent.PropTypes = {
  formData: PropTypes.shape({
    name: PropTypes.string,
    company: PropTypes.company,
  }),
  onReviewClick: PropTypes.func,
  onInputChange: PropTypes.func
};