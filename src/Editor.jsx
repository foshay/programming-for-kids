import React from 'react';
import ReactDOM from 'react-dom';
import Blockly from 'blockly';


import ReactBlocklyComponent from 'react-blockly';
import ConfigFiles from 'react-blockly/src/initContent/content';
import parseWorkspaceXml from 'react-blockly/src/BlocklyHelper';

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toolboxCategories: parseWorkspaceXml(ConfigFiles.INITIAL_TOOLBOX_XML),
    };
  }

//this is optional for adding custom categories of blocks
/*
componentDidMount = () => {
    window.setTimeout(() => {
      this.setState({
        toolboxCategories: this.state.toolboxCategories.concat([
          {
            name: 'AI category',
            blocks: [
              { type: 'text' },
              { type: 'text_print'},
              {
                type: 'text_print',
                values: {
                  TEXT: {
                    type: 'text',
                    shadow: false,
                    fields: {
                      TEXT: 'Preloaded example text uwu',
                    },
                  },
                },
              },
            ],
          },
        ]),
      });
    }, 2000);
  }
*/

  workspaceDidChange = (workspace) => {
      //this part you can do something when the workspace changes (when they place or move a block)
    /*
      workspace.registerButtonCallback('sendToGrade', () => {
      alert('Sent to grading script');
    });
    */
    //We can use this for saving user's progress
    /*
    const newXml = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(workspace));
    document.getElementById('generated-xml').innerText = newXml;
    */
    //this prints out the blocks to actual python code to the page.
    //TODO send the const code to backend for grading
    require('blockly/python');
    const code = Blockly.Python.workspaceToCode(workspace);
    document.getElementById('code').value = code;
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
          colour: '#ccc',
          snap: true,
        },
      }}
      //we can possibly change the initial xml on a per lesson basis... or not
      initialXml={ConfigFiles.INITIAL_XML}
      //the div wrapper that will be generated for blockly
      wrapperDivClassName="fill-height"
      //what method to call when the workspace changes
      workspaceDidChange={this.workspaceDidChange}
    />
  )
}

//on load we create an element of the class created above and insert into the element 'blockly'
window.addEventListener('load', () => {
    const button = document.getElementById('gradeButton');

    const util = require('util');
    const execFile = util.promisify(require('child_process').execFile);
    async function runTest() {
    const { stdout } = await execFile('node', ['--version']);
        console.log('stdout: ', stdout);
    }
    runTest();

    button.addEventListener('click', function(e) {
        alert(document.getElementById('code').value);
    });
    const editor = React.createElement(Editor);
    ReactDOM.render(editor, document.getElementById('blockly'));
});
