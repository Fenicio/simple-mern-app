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
    maxWidth: '800px',
    minWidth: '400px',
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
    
    this.referencedId = null;
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
  }

  onFieldChange = (field, value) => {
    const currentFormData = this.state.formData;
    currentFormData[field] = value;
    this.setState({formData: currentFormData});
  }
  
  componentDidMount = () => {
    let id = this.referencedId;
    if (id) {
      console.log("Getting api/"+id);
      axios.get('/api/'+id).then((response) => {
        this.setState({
          formData: response.data
        });
      }).catch((error) => {
        console.error('error', error);
        //TODO
      });
    }
  }
  
  renderTopWithMatch = (match, phase) => {
    if(this.referencedId === null && match.match && match.match.params && match.match.params.id) {
      this.referencedId = match.match.params.id;
    }
    return ( <Top 
          onFormChange={this.onFormChange} 
          selectedTab={phase}
          formData={this.state.formData} 
          onFieldChange={this.onFieldChange}
          />);
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
        <Route path='/FORM/:id' render={(match) => this.renderTopWithMatch(match, FORM)} 
        />
        <Route path='/REVIEW/:id' render={(match) => this.renderTopWithMatch(match, REVIEW)} 
        />
        <Route path='/FINAL/:id' render={(match) => this.renderTopWithMatch(match, FINAL)} 
        />
      </div>
    </Router>
    );
  }
}
