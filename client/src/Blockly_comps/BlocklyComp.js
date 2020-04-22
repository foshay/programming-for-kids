import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Editor from '../Editor.jsx';
import { Button, Icon } from '@blueprintjs/core';
import ToggleToolbox from './ToggleToolbox.js';


class BlocklyComp extends Component {
    state = {
      response: '',
      post: '',
      responseToPost: '',
      // by default, the toolbox should be shown
      toolboxShown: true,
    };
    props = {
      lessonID: '',
    };
    
    componentDidMount() {
      this.callApi()
        .then(res => this.setState({ response: res.express }))
        .catch(err => console.error(err));
      
      // Adding this allows the blockly edit area to show up after routing to the page
      // lessonID is send to editor.jsx for xml loading as well as storing progress
      // lessonID is passed to blockly comp from lessonScreen.
      const editor = React.createElement(Editor, {lessonID: this.props.lessonID});
      if( document.getElementById('blockly') != null)
        ReactDOM.render(editor, document.getElementById('blockly'));
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
      var newxml = document.getElementById('newxml').value;
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
          "lesson": this.props.lessonID,
          "code": ucode,
        })
        
      });
      const body = await response.text();
      
      this.setState({ responseToPost: body });
    };
  

  render() {
    return (
      <div> 
        <ToggleToolbox/>
        <div style={{ height: '600px', width: `100%` }} id="blockly" />
        <p>{this.state.response}</p>
        <textarea
          type="text"
          disabled
          id="code"
        />
        <textarea
          type="text"
          disabled
          id="newxml"
        />
        <Button
          text="Grade code"
          large
          icon="tick"
          id="gradeButton"
          intent="success"
          onClick={(e) => this.handleSubmit(e)}
        />
        <p>{this.state.responseToPost}</p>
      </div>
    )
  }
}


export default BlocklyComp