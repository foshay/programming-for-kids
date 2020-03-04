import React from 'react';
import Blockly from 'blockly';


import ReactBlocklyComponent from 'react-blockly/dist-modules';
import ConfigFiles from 'react-blockly/src/initContent/content';
import parseWorkspaceXml from 'react-blockly/src/BlocklyHelper';

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toolboxCategories: parseWorkspaceXml(ConfigFiles.INITIAL_TOOLBOX_XML),
      //can use this.props.lessonID to select xml for the lesson based on lesson selected.
      // add deletable="false" to <block field of xml to make not deletable.
      // add editable="false" to make not editable
      initialXml: '<xml xmlns="https://developers.google.com/blockly/xml"><block type="procedures_defreturn" deletable="false" editable="false" id="XH45#0:M(suDIRq]3O1l" x="550" y="250"><field name="NAME">usercode</field><comment pinned="false" h="80" w="160">Describe this function...</comment></block></xml>',
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
    workspace.addChangeListener(Blockly.Events.disableOrphans);
    const newXml = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(workspace));
    console.info(newXml);

    //print xml to screen instead. requires <pre id="generated-xml"></pre> to be on page.
    //document.getElementById('generated-xml').innerText = newXml;
    
    //this prints out the blocks to actual python code to the page.
    //TODO send the const code to backend for grading
    require('blockly/python');
    //python = new Generator(name = "Python", INDENT = "4");
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

//on load we create an element of the class created above and insert into the element 'blockly'
window.addEventListener('load', () => {

    //const util = require('util');
    //const execFile = util.promisify(require('child_process').execFile);
    //async function runTest() {
    //const { stdout } = await execFile('node', ['--version']);
    //    console.log('stdout: ', stdout);
    //}
    //runTest();
    //const { exec } = require('child_process').exec;
    //exec('echo "The \\$Home variable is $HOME"', (error, stdout, stderr) => {
    //  if (error) {
    //    console.error('exec error: ${error}');
    //    return;
    //  }
    //  console.log('stdout: ${stdout}');
    //  console.error('stderr: ${stderr}');
    //});


    // This was commented out because it the same code is
    // run inside BlocklyComp.js
    // const editor = React.createElement(Editor);
    // if( document.getElementById('blockly') != null)
    //   ReactDOM.render(editor, document.getElementById('blockly'));
});

export default Editor;