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
    toolboxCategories: '',
    code: '',
    newXml: '',
    initialXml: this.props.initialXml,

    gradeResponse: '',
    connectedResponse: '',
  }

  componentDidMount = () => {
    this.checkApiConnection();
    var toolbox = this.loadBlocks();

    // This runs if initialXml is being passed in without an api call
    // i.e. when making New Lesson
    if (this.props.initialXml){
      // since there is no re render between loading toolbox and rendering
      // the editor, we must pass in the toolbox
      this.renderEditor(toolbox);
    }
  }

  componentDidUpdate = (prevProps) => {
    // This runs if a new intialXml has loaded from the database
    if (this.props.initialXml !== prevProps.initialXml) {
      console.log("InitialXml updated");
      this.renderEditor();
    }
  }

  // This renders the blockly editor by setting the div with id='blockly'
  // to be a blocklyEditor
  renderEditor = (toolbox) => {
    // toolboxCategories is passed in if there was no waiting
    // for a promise to finish. Otherwise, toolbox has been
    // loaded into the toolboxCategories state because the page
    // was re rendered when the new initialXml was passed in through the
    // props after being loaded in the api call
    var toolboxCategories;
    if (toolbox) { toolboxCategories = toolbox; }
    else { toolboxCategories = this.state.toolboxCategories; }
    const Editor =
      <ReactBlocklyComponent.BlocklyEditor
        // The block categories to be available.
        toolboxCategories={toolboxCategories} //this is obvious what it does
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

  loadBlocks = () => {
    var toolboxCategories = parseWorkspaceXml(ConfigFiles.INITIAL_TOOLBOX_XML);
    if (this.props.edit) {
      // make a block for user_code
      Blockly.Blocks['user_code'] = {
        init: function () {
          this.appendValueInput("input")
            .setCheck(null)
            .appendField("User Code");
          this.setOutput(true, null);
          this.setColour(0);
          this.setTooltip("This block runs the user's written code");
          this.setHelpUrl("");
        }
      };
      Blockly.Python['user_code'] = function (block) {
        var value_input = Blockly.Python.valueToCode(block, 'input', Blockly.Python.ORDER_ATOMIC);
        var code = 'usercode(' + value_input + ')';
        return [code, Blockly.Python.ORDER_NONE];
      }
      toolboxCategories = toolboxCategories.concat([
          {
            // TODO add color
            name: 'User code',
            blocks: [
              { type: 'user_code' },
            ],
          },
      ]);
      this.setState({ toolboxCategories: toolboxCategories });
    }
    else {
      toolboxCategories = toolboxCategories.concat([
          {
            // TODO add color
            name: 'AI category',
            blocks: [
              { type: 'text' },
            ],
          },
        ]);
      this.setState({ toolboxCategories: toolboxCategories });
    }
    return toolboxCategories;
  }

  // This is to show the user whether they are connected to the grading server
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

  // Checks the token and calls the api/grade call if the token is valid
  handleSubmit = (e) => {
    e.preventDefault();
    var username;
    var token = localStorage.getItem('nccjwt');
    if (!token) {
      console.log("No Token");
    }
    else {
      var userCode = this.state.code;
      var newXml = this.state.newXml;
      jwt.verify(token, secret, (err, decoded) => {
        if (err) { return; }
        // TODO possibly add grading for teacher as they test the code they made
        if (decoded.is_teacher) { return; }
        username = decoded.username;
      });
      fetch('/api/grade', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "lessonID": this.props.lessonID,
          "code": userCode,
          "username": username,
          "xml": newXml
        })
      })
      .then((response) => {
        console.log(response);
        return response.json();
      }).then((json) => {
        this.setState({gradeResponse: json.message});
        console.log(json);
      });
    }
  }

  workspaceDidChange = (workspace) => {
    workspace.addChangeListener(Blockly.Events.disableOrphans);
    const oldCode = this.state.code;
    const newXml = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(workspace));
    const code = Blockly.Python.workspaceToCode(workspace);

    // We need to send the code and newXml up to the manageLesson comp
    // it can then be sent to the api
    if (this.props.edit) {
      this.props.setCode(code);
      this.props.setXml(newXml);
    }
    else {
      this.setState({ newXml: newXml });
      this.setState({ code: code });
      // if code has changed
      // Save lesson progress
      if (code !== oldCode && oldCode) {
        console.log(oldCode);
        console.log(code);
        var username;
        var token = localStorage.getItem('nccjwt');
        if (!token) {
          console.log("No Token");
        }
        else {
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
              return response.json();
            }).then((json) => {
              console.log("Saving progress...");
              console.log(json);
            });
        }
      }
    }
  }

  GradeButton = () => {
    // don't show the grade button if this is being shown for editing a lesson
    if (this.props.edit) {
      return <div/>
    }
    else {
      return (
        <Button
          text={"Grade code"}
          large
          icon="tick"
          id="gradeButton"
          intent="success"
          onClick={(e) => this.handleSubmit(e)}
        />
      )
    }
  }

  render = () => {
    return (
      <div>
        <ToggleToolbox/>
        <div style={{ height: '600px', width: `100%` }} id="blockly" />
        <p>{this.state.gradeResponse}</p>
        <this.GradeButton/>
        <p>{this.state.connectedResponse}</p>
      </div>
    )
  }

}
export default BlocklyComp