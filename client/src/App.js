import React, { Component } from 'react';

import logo from './logo.svg';

import './App.css';
require('./Editor.jsx');

class App extends Component {
  state = {
    response: '',
    post: '',
    responseToPost: '',
  };
  
  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.error(err));
      
  }
  
  callApi = async () => {
    const response = await fetch('/api/connect');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    
    return body;
  };
  
  handleSubmit = async e => {
    e.preventDefault();
    var ucode = document.getElementById('code').value;
    //var lesson = "1";
    //var formData = new FormData();
    //formData.append('code', code);
    //formData.append('lesson', lesson);
    const response = await fetch('/api/grade', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "lesson": '1',
        "code": ucode,
      })
      
    });
    const body = await response.text();
    
    this.setState({ responseToPost: body });
  };
  
render() {
    return (
      <div className="App">
    <div style={{height: "600px", width: "800px"}} id="blockly"></div>
    
        <p>{this.state.response}</p>
        <form onSubmit={this.handleSubmit}>
          <textarea
            type="text"
            disabled
            id="code"
            value={this.state.post}
            onChange={e => this.setState({ post: e.target.value })}
          />
          <button type="submit" id="gradeButton" onclick="handleSubmit()">Grade code</button>
        </form>
        <p>{this.state.responseToPost}</p>
      </div>
    );
  }
}

export default App;