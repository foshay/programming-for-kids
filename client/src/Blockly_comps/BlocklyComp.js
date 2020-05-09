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

const jwt = require('jsonwebtoken');
const secret = "this is temporary"

class BlocklyComp extends Component{
  state ={
    toolboxCategories: parseWorkspaceXml(ConfigFiles.INITIAL_TOOLBOX_XML),
    code: '',
    newXml: '',
    initialXml: this.props.initialXml,

    gradeResponse: '',
    connectedResponse: '',
  }

  componentDidMount = () => {
    this.checkApiConnection();
    this.loadOurBlocks();
  }

  componentDidUpdate = (prevProps) => {
    if (this.props.initialXml !== prevProps.initialXml) {
      const Editor =
        <ReactBlocklyComponent.BlocklyEditor
          // The block categories to be available.
          toolboxCategories={this.state.toolboxCategories} //this is obvious what it does
          workspaceConfiguration={{
            grid: {
              spacing: 20,
              length: 3,
              colour: '#0000FF',
              snap: true,
            },
          }}
          //we can possibly change the initial xml on a per lesson basis... or not
          initialXml={this.props.initialXml}
          //the div wrapper that will be generated for blockly
          wrapperDivClassName="fill-height"
          //what method to call when the workspace changes
          workspaceDidChange={(workspace) => this.workspaceDidChange(workspace)}
        />

      // TODO find a better way to render the editor
      if (document.getElementById('blockly') !== null)
        ReactDOM.render(Editor, document.getElementById('blockly'));
    }
  }

  loadOurBlocks = () => {
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
  }

  checkApiConnection = () => {
    fetch('/api/connect')
    .then(response => {
      // if (response.status !== 200) {
      //   throw Error(response.json.message);
      // }
      return response.json();
    })
    .then(json => {
      // TODO don't render if not connected?
      this.setState({connectedResponse: json.message});
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    var user;
    var token = localStorage.getItem('nccjwt');
    if (!token) {
      console.log("No Token");
    }
    else {
      var userCode = this.state.code;
      var newXml = this.state.newXml;
      jwt.verify(token, secret, (err, decoded) => {
        if (err) { return; }
        user = decoded.username;
      });
      fetch('/api/grade', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "lessonID": this.props.lessonID,
          "code": userCode,
          "user": user,
          "xml": newXml
        })
      })
      .then((response) => {
        console.log(response);
        // this.setState({gradeResponse: response});
      }).then((json) => {
        console.log(json);
      });
    }
  }

  workspaceDidChange = (workspace) => {
    workspace.addChangeListener(Blockly.Events.disableOrphans);
    this.setState({ newXml: Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(workspace)) });
    this.setState({ code: Blockly.Python.workspaceToCode(workspace) });

    var username;
    var token = localStorage.getItem('nccjwt');
    if (!token) {
      console.log("No Token");
    }
    else {
      var newXml = this.state.newXml;
      jwt.verify(token, secret, (err, decoded) => {
        if (err) { return; }
        username = decoded.username;
      });
      fetch('/api/SaveLessonProgress/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "lesson_id": this.props.lessonID,
          "username": username,
          "xml": newXml
        })
      })
      .then((response) => {
        console.log(response);
      }).then((json) => {
        console.log(json);
      });
    }
  }

  render = () => {
    return (
      <div>
        <ToggleToolbox/>
        <div style={{ height: '600px', width: `100%` }} id="blockly" />
        <p>{this.state.gradeResponse}</p>
        <Button
          text="Grade code"
          large
          icon="tick"
          id="gradeButton"
          intent="success"
          onClick={(e) => this.handleSubmit(e)}
        />
        <p>{this.state.connectedResponse}</p>
      </div>
    )
  }

}
export default BlocklyComp