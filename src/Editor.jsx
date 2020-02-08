import React from 'react';
import ReactDOM from 'react-dom';
import Blockly from 'blockly';
import PythonGenerator from 'blockly/python';

import ReactBlocklyComponent from 'react-blockly';
import ConfigFiles from 'react-blockly/src/initContent/content';
import parseWorkspaceXml from 'react-blockly/src/BlocklyHelper';

class TestEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toolboxCategories: parseWorkspaceXml(ConfigFiles.INITIAL_TOOLBOX_XML),
    };
  }

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

  workspaceDidChange = (workspace) => {
    workspace.registerButtonCallback('sendToGrade', () => {
      alert('Sent to grading script');
    });
    //We can use this for saving user's progress
    //const newXml = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(workspace));
    //document.getElementById('generated-xml').innerText = newXml;

    const code = Blockly.Python.workspaceToCode(workspace);
    document.getElementById('code').value = code;
  }

  render = () => (
    <ReactBlocklyComponent.BlocklyEditor
      toolboxCategories={this.state.toolboxCategories}
      workspaceConfiguration={{
        grid: {
          spacing: 20,
          length: 3,
          colour: '#ccc',
          snap: true,
        },
      }}
      initialXml={ConfigFiles.INITIAL_XML}
      wrapperDivClassName="fill-height"
      workspaceDidChange={this.workspaceDidChange}
    />
  )
}

window.addEventListener('load', () => {
  const editor = React.createElement(TestEditor);
  ReactDOM.render(editor, document.getElementById('blockly'));
});
