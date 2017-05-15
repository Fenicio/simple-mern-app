import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';

const style = {
  toggle: {
    paddingTop: '32px'
  }
}

export default class FinalContent extends Component {
  render() {
    return (
      <div>
        <div>
          <TextField hintText="Your name"
            floatingLabelText="Name"
            value={this.props.formData.name}
            disabled
          />
        </div>
        <div>
          <TextField hintText="Your company"
            floatingLabelText="Company"
            value={this.props.formData.company}
            disabled
          />
        </div>
        <div>
          <Toggle label="I agree to the terms of service"
            style={style.toggle}
            toggled={this.props.formData.termsAccepted}
            disabled
          />
        </div>
      </div>
    );
  }
}

FinalContent.PropTypes = {
  formData: PropTypes.shape({
    name: PropTypes.string,
    company: PropTypes.company,
  })
};