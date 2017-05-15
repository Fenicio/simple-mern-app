import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import Top from './Top';
import axios from 'axios';

const FORM = 'FORM';
const REVIEW = 'REVIEW';
const FINAL = 'FINAL';

const style = {
  container: {
    width: '60%',
    'maxWidth': '800px',
    'minWidth': '400px',
    margin: 'auto'
  }
};

export default class CustomRouter extends Component {
  constructor(props) {
    super(props);
    this.state={
      formData: {
        name: '',
        company: '',
        termsAccepted: false
      }
    };
  }
  
  onFormChange = (newTab) => {
    const currentFormData = this.state.formData;
    const id = currentFormData._id
    if(id) {
      axios.post('/api/', currentFormData).then((res) => {
        this.setState({formData: res.data});
        this.router.history.push('/'+newTab+'/'+res.data._id);
      });
    } else {
      axios.post('/api/', currentFormData).then((res) => {
        this.setState({formData: res.data});
        this.router.history.push('/'+newTab+'/'+res.data._id);
      });
    }
    this.router.history.push('/'+newTab+(id ? '/'+id : ''));
    this.router.forceUpdate();
    
    if (id) {
      axios.get('/api/'+id).then(function (response) {
        this.setState({
          formData: response
        });
      }).catch(function(error) {
        this.setState({ formData: {
          name: '',
          company: '',
          termsAccepted: false
        }});
      });
    } else {
      this.setState({ formData: {
        name: '',
        company: '',
        termsAccepted: false
      }});
    }
  }

  onFieldChange = (field, value) => {
    console.log("onFieldChange(", field,", ",value,")");
    const currentFormData = this.state.formData;
    currentFormData[field] = value;
    this.setState({formData: currentFormData});
  }
  
  render() {
    return (
    <Router ref={(component) => this.router = component}>
      <div style={style.container}>
        <Route exact path='/' render={() => ( <Top 
          onFormChange={this.onFormChange} 
          selectedTab={FORM}
          formData={this.state.formData}
          onFieldChange={this.onFieldChange}
          />)} 
        />
        <Route exact path='/FORM' render={() => ( <Top 
          onFormChange={this.onFormChange} 
          selectedTab={FORM}
          formData={this.state.formData} 
          onFieldChange={this.onFieldChange}
          />)} 
        />
        <Route path='/FORM/:id' render={(match) => ( <Top 
          onFormChange={this.onFormChange} 
          selectedTab={FORM}
          formData={this.state.formData} 
          onFieldChange={this.onFieldChange}
          />)} 
        />
        <Route path='/REVIEW/:id' render={(match) => ( <Top 
          onFormChange={this.onFormChange} 
          selectedTab={REVIEW}
          formData={this.state.formData} 
          onFieldChange={this.onFieldChange}
          />)} 
        />
        <Route path='/FINAL/:id' render={(match) => ( <Top 
          onFormChange={this.onFormChange} 
          selectedTab={FINAL}
          formData={this.state.formData} 
          onFieldChange={this.onFieldChange}
          />)} 
        />
      </div>
    </Router>
    );
  }
}
