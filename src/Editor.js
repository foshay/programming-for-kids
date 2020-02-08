import React from 'react';
import ReactDOM from 'react-dom';
import Blockly from 'blockly';

import ReactBlocklyComponent from 'react-blockly/src/index';
import ConfigFiles from 'react-blockly/src/initContent/content';
import parseWorkspaceXml from 'react-blockly/src/BlocklyHelper';

class Editor extends React.Component {
    constructor(props) {
        this.state = {
            toolboxCategories: parseWorkspaceXml(ConfigFiles.INITIAL_TOOLBOX_CATEGORIES)
        };
    }

componentDidMount = () => {
    window.setTimeout(() => {
        toolboxCategories: this.state.toolboxCategories.concat([
            {
                name: 'Text',
                blocks: [
                    { type: 'text' },
                    {
                        type: 'text_print',
                        values: {
                            TEXT: {
                                type: 'text',
                                shadow: true,
                                fields: {
                                    TEXT: 'basic text',
                                },
                            },
                        },
                    },
                ],
            },
        ]);
    }, 2000);
}

workspaceDidChange = (workspace) => {
    workspace.registerButtonCallback('firstButtonPress', () => {
    alert('button pressed');
    });
    // This will get xml representation of current block arrangement.
    //const newXml = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(workspace));
    //document.getElementByID('foo').innerText = newXml;
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
                colour: '#AAA',
                snap: true,
            },
        }}
        intitialXml={ConfigFiles.INITIAL_TOOLBOX_XML}
        wrapperDivClassName="fill-height"
        workspaceDidChange={this.workspaceDidChange}
        />
    )
}
window.addEventListener('load', () => {
    const editor = React.createElement(Editor);
    ReactDOM.render(editor, document.getElementById('blockly'));
});

export default Editor;
