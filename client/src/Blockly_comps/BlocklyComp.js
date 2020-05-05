import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// blueprint imports
import { Button } from '@blueprintjs/core';

// Our components
import ToggleToolbox from './ToggleToolbox.js';

// Blockly imports
import Blockly from 'blockly';
import ReactBlocklyComponent from 'react-blockly/dist-modules';
import ConfigFiles from 'react-blockly/src/initContent/content';
import parseWorkspaceXml from 'react-blockly/src/BlocklyHelper';
require('blockly/python');

class BlocklyComp extends Component {
  constructor(props) {
  super(props);
    this.state = {
      response: '',
      post: '',
      responseToPost: '',
      // by default, the toolbox should be shown
      toolboxShown: true,
    };
  }
    
    componentDidMount() {
      this.setState({
        toolboxCategories: this.state.toolboxCategories.concat([
          {
            name: 'AI category',
            blocks: [
              { type: 'text' },
              ],
          },
        ]),
      });
      this.callApi()
        .then(res => this.setState({ response: res.express }))
        .catch(err => console.error(err));
      
      // Adding this allows the blockly edit area to show up after routing to the page
      // lessonID is send to editor.jsx for xml loading as well as storing progress
      // lessonID is passed to blockly comp from lessonScreen.
      //const editor = React.createElement(Editor, {lessonID: this.props.lessonID});
      //if( document.getElementById('blockly') != null)
      //  ReactDOM.render(editor, document.getElementById('blockly'));
    }
    workspaceDidChange = (workspace) => {
      this.state.newXml = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(workspace));
      document.getElementById('newxml').value = this.state.initialXml;
      this.state.code = Blockly.Python.workspaceToCode(workspace);
      document.getElementById('code').value = this.state.code;
    }
    
    callApi = async () => {
      const response = await fetch('/api/connect');
      const body = await response.json();
      if (response.status !== 200) throw Error(body.message);
      
      return body;
    };
    
    handleSubmit = async e => {
      e.preventDefault();
      const jwt = require('jsonwebtoken');
      const secret = "this is temporary";
      var user = '';
      console.log("checking token");
      var token = localStorage.getItem('nccjwt');
      if (!token) {
        console.log("CT: No Token");
        return "none";
      }
      else {
        var ucode = document.getElementById('code').value;
        jwt.verify(token, secret, (err, decoded) => {
          if (err) {
            console.log("Error: " + err);
            return "none";
          }
          else {
            user = decoded.username;
          }
        });
        const response = await fetch('/api/grade', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "lesson": this.props.lessonID,
            "code": ucode,
            "user": user,
          })
        });
        const body = await response.text();
        
        this.setState({ responseToPost: body });
      }
      
      var newxml = document.getElementById('newxml').value;
      //var lesson = "1";
      //var formData = new FormData();
      //formData.append('code', code);
      //formData.append('lesson', lesson);
      
    };
  

  render() {
    return (
      <div> 
        <ToggleToolbox/>
        
        <div style={{ height: '600px', width: `100%` }} id="blockly" />
<ReactBlocklyComponent.BlocklyEditor
        // The block categories to be available.
      toolboxCategories={this.state.toolboxCategories}
      //this is obvious what it does
      workspaceConfiguration={{
        grid: {
          spacing: 20,
          length: 3,
          colour: '#0000FF',
          snap: true,
        },
      }}
      //we can possibly change the initial xml on a per lesson basis... or not
      initialXml={this.state.initialXml}
      //the div wrapper that will be generated for blockly
      wrapperDivClassName="fill-height"
      //what method to call when the workspace changes
      workspaceDidChange={this.workspaceDidChange}
    />
        <p>{this.state.response}</p>
        <textarea
          style={{display: "none"}}
          disabled
          id="code"
        />
        <textarea
          style={{display: "none"}}
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