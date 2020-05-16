import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// blueprint imports
import { Card, Text } from '@blueprintjs/core';

// Blockly imports
import Blockly from 'blockly';
import ReactBlocklyComponent from 'react-blockly/dist-modules';
import ConfigFiles from 'react-blockly/src/initContent/content';
import parseWorkspaceXml from 'react-blockly/src/BlocklyHelper';
require('blockly/python');

class DisplayBlocks extends Component{
  state ={
    ranOnce: false,
  }
  
  componentDidMount = () => {
    var toolbox = parseWorkspaceXml(ConfigFiles.INITIAL_TOOLBOX_XML);
    var xml = this.props.initialXml;
    this.renderEditor(toolbox, xml);
  }

  componentDidUpdate = (prevProps) => {
    var toolboxCategories = parseWorkspaceXml(ConfigFiles.INITIAL_TOOLBOX_XML);
    var xml = this.props.initialXml;
    if (prevProps.lesson_id !== this.props.lesson_id){
      this.renderEditor(toolboxCategories, xml);
    }
  }

  // This renders the blockly editor by setting the div with id='blockly'
  // to be a blocklyEditor
  renderEditor = (toolboxCategories, xml) => {
    this.setState({ extrasHidden: false });
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
        initialXml={xml}
        //the div wrapper that will be generated for blockly
        wrapperDivClassName="fill-height"
        //what method to call when the workspace changes
        workspaceDidChange={(workspace) => this.workspaceDidChange(workspace)}
      />

    // TODO find a better way to render the editor
    if (document.getElementById('blockly') !== null){
      ReactDOM.render(Editor, document.getElementById('blockly'));
    }
  }

  workspaceDidChange = (workspace) => {
    workspace.addChangeListener(Blockly.Events.disableOrphans);
    // Hide extra things
    let array = document.getElementsByClassName("blocklyTrash");
    if (array.length !== 0) { for (let item of array) { item.style["display"] = "none"; } }
    array = document.getElementsByClassName("blocklyToolboxDiv");
    if (array.length !== 0) { for (let item of array) { item.style["display"] = "none"; } }
  }

  render = () => {
    if (this.props.hidden){
      return(<div/>);
    }
    if (!this.props.initialXml){
      return(
        <div className="Manage-Table">
          <Card onClick={() => this.props.hidePopup()}>
            <Text>Student has not attempted</Text>
            <Text>{"\"" + this.props.lesson_name + "\""}</Text>
            <br/>
            <Text>Click here to hide</Text>
          </Card>
        </div>
        )
    }
    return (
      <div >
        <div className="Manage-Table">
          <Card onClick={() => this.props.hidePopup()}>
            <Text>{"\"" + this.props.lesson_name + "\""}</Text>
            <br/>
            <Text>Click here to hide lesson progress</Text>
          </Card>
        </div>
        <br/>
        <div className="display-blocks">
          <div style={{ height: '600px', width: `100%` }} id="blockly" />
        </div>
      </div>
    )
  }
}


export default DisplayBlocks