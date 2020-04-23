import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Button, } from '@blueprintjs/core';

// Blockly imports
import Blockly from 'blockly';
import ReactBlocklyComponent from 'react-blockly/dist-modules';
import ConfigFiles from 'react-blockly/src/initContent/content';
import parseWorkspaceXml from 'react-blockly/src/BlocklyHelper';
import ToggleToolbox from './ToggleToolbox';
require('blockly/python');

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toolboxCategories: parseWorkspaceXml(ConfigFiles.INITIAL_TOOLBOX_XML),
      //can use this.props.lessonID to select xml for the lesson based on lesson selected.
      // add deletable="false" to <block field of xml to make not deletable.
      // add editable="false" to make not editable
      initialXml: '<xml xmlns="https://developers.google.com/blockly/xml"><block type="procedures_defreturn" deletable="false" editable="false" id="XH45#0:M(suDIRq]3O1l" x="550" y="250"><field name="NAME">usercode</field><comment pinned="false" h="80" w="160">The base function block used for grading</comment></block></xml>',
      code: '',
      newxml: '',
    };
    
  }

//this is optional for adding custom categories of blocks

componentDidMount = (workspace) => {
    window.setTimeout(() => {
      
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
    }, 2000);
  }

  workspaceDidChange = (workspace) => {
      //this part you can do something when the workspace changes (when they place or move a block)
    /*
      workspace.registerButtonCallback('sendToGrade', () => {
      alert('Sent to grading script');
    });
    */
    //We can use this for saving user's progress
    //workspace.addChangeListener(Blockly.Events.disableOrphans);
    this.state.newXml = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(workspace));
    document.getElementById('newxml').value = this.state.initialXml;

    //print xml to screen instead. requires <pre id="generated-xml"></pre> to be on page.
    //document.getElementById('generated-xml').innerText = newXml;
    
    //this prints out the blocks to actual python code to the page.
    //require('blockly/python');
    //python = new Generator(name = "Python", INDENT = "4");
    this.state.code = Blockly.Python.workspaceToCode(workspace);
    document.getElementById('code').value = this.state.code;
  }

  render = () => (
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
    
  )
}


class BlocklyCompEdit extends Component {
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
        <div style={{ height: '600px', width: `100%` }} id="blockly"/>
        <p>{this.state.response}</p> 
        <form onSubmit={this.handleSubmit}>
          <textarea
            style={{display: "none"}}
            type="text"
            disabled
            id="code"
          />
          <textarea
            style={{display: "none"}}
            disabled
            id="newxml"
            />
          {/* <Button
            text="Grade code"
            large
            icon="tick"
            id="gradeButton"
            intent="success"
            onClick={(e) => this.handleSubmit(e)}
          /> */}
        </form>
        <p>{this.state.responseToPost}</p>
      </div>
    )
  }
}


export default BlocklyCompEdit