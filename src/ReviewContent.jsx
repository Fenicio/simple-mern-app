import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  backButton: {
    float: 'left',
    marginTop: '36px'
  },
  submitButton: {
    float: 'right',
    marginTop: '36px'
  }
}

export default class ReviewContent extends Component {
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
          <RaisedButton label="Back" 
            style={style.backButton}
            onTouchTap={this.props.onBackClick}
          />
          <RaisedButton label="Submit" 
            style={style.submitButton}
            onTouchTap={this.props.onSubmit}
          />
        </div>
      </div>
    );
  }
}

ReviewContent.PropTypes = {
  formData: PropTypes.shape({
    name: PropTypes.string,
    company: PropTypes.company,
  }),
  onBackClick: PropTypes.func,
  onSubmit: PropTypes.func,
  onFieldChange: PropTypes.func
};