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
      //<xml xmlns="https://developers.google.com/blockly/xml"><variables><variable id="ErpV]!}X6kPbrq*n_`iN">result</variable></variables><block type="procedures_defreturn" id="XH45#0:M(suDIRq]3O1l" deletable="false" editable="false" x="310" y="170"><field name="NAME">grade</field><comment pinned="false" h="80" w="160">The base function block used for grading</comment><statement name="STACK"><block type="variables_set" deletable="false" editable="false" id="6xOK)3K|RZkq$i,D2_))"><field name="VAR" id="ErpV]!}X6kPbrq*n_`iN">result</field><value name="VALUE"><block type="logic_boolean" deletable="false" id=".$k.:z=-]T^;!lB.XaY5"><field name="BOOL">FALSE</field></block></value></block></statement><value name="RETURN"><block type="variables_get" deletable="false" editable="false" id="%wF(EBeasse-{5yvnKdz"><field name="VAR" id="ErpV]!}X6kPbrq*n_`iN">result</field></block></value></block></xml>
      initialXml: '<xml xmlns="https://developers.google.com/blockly/xml"><variables><variable id="ErpV]!}X6kPbrq*n_`iN">result</variable></variables><block type="procedures_defreturn" id="XH45#0:M(suDIRq]3O1l" deletable="false" editable="false" x="310" y="170"><field name="NAME">grade</field><comment pinned="false" h="80" w="160">The base function block used for grading</comment><statement name="STACK"><block type="variables_set" deletable="false" editable="false" id="6xOK)3K|RZkq$i,D2_))"><field name="VAR" id="ErpV]!}X6kPbrq*n_`iN">result</field><value name="VALUE"><block type="math_number" deletable="false" id=".$k.:z=-]T^;!lB.XaY5"><field name="NUM">100</field></block></value></block></statement><value name="RETURN"><block type="variables_get" deletable="false" editable="false" id="%wF(EBeasse-{5yvnKdz"><field name="VAR" id="ErpV]!}X6kPbrq*n_`iN">result</field></block></value></block></xml>',
      code: '',
      newxml: '',
    };
    
  }

//this is optional for adding custom categories of blocks

componentDidMount = (workspace) => {
    
  Blockly.Blocks['user_code'] = {
    init: function() {
      this.appendValueInput("input")
        .setCheck(null)
        .appendField("User Code");
      this.setOutput(true, null);
      this.setColour(0);
      this.setTooltip("This block runs the user's written code");
      this.setHelpUrl("");
    }
  };
  Blockly.Python['user_code'] = function(block) {
    var value_input = Blockly.Python.valueToCode(block, 'input', Blockly.Python.ORDER_ATOMIC);
    var code = 'usercode(' + value_input + ')';
    return [code, Blockly.Python.ORDER_NONE];
  }
      this.setState({
        toolboxCategories: this.state.toolboxCategories.concat([
          {
            name: 'User code',
            blocks: [
              { type: 'user_code' },
              ],
          },
        ]),
      });
  }

  workspaceDidChange = (workspace) => {
      //this part you can do something when the workspace changes (when they place or move a block)
    /*
      workspace.registerButtonCallback('sendToGrade', () => {
      alert('Sent to grading script');
    });
    */
    //We can use this for saving user's progress
    workspace.addChangeListener(Blockly.Events.disableOrphans);
    var newXml = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(workspace));
    //document.getElementById('newxml').value = this.state.initialXml;
    console.log(newXml);
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
        </form>
        <p>{this.state.responseToPost}</p>
      </div>
    )
  }
}


export default BlocklyCompEdit