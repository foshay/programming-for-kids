import React, { Component } from 'react';
import '../CSS_files/App.css';

import ReactDOM from 'react-dom';
import Editor from '../Editor.jsx';

import "../../../node_modules/normalize.css";
import "../../../node_modules/@blueprintjs/core/lib/css/blueprint.css";
import "../../../node_modules/@blueprintjs/icons/lib/css/blueprint-icons.css";
import { Button } from '@blueprintjs/core';

require('../Editor.jsx')



class BlocklyComp extends Component {
    state = {
      response: '',
      post: '',
      responseToPost: '',
      // by default, the toolbox should be shown
      toolboxHidden: true,
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
  
    toggleToolbox = () => {
      this.setState({toolboxHidden: !this.state.toolboxHidden});
      var array = document.getElementsByClassName("blocklyToolboxDiv blocklyNonSelectable");
      // getElementsByClassName returns an array, so we must loop through it
      for (let item of array) {
        // this hides/shows the toolbox
        item.style["display"] = this.state.toolboxHidden ? "none": "block";
      }
    }

  render() {
    return (
      <div className="App">
        <Button 
        type="button"
        class="bp3-button bp3-icon-menu-closed"
        icon={this.state.toolboxHidden ? "menu-closed" : "menu-open"}
        onClick={this.toggleToolbox}
        text={this.state.toolboxHidden ? "Hide Toolbox" : "Show Toolbox"}
        />

        <div style={{ height: '600px', width: `100%` }} id="blockly"/>

        <p>{this.state.response}</p> 
       
        <form onSubmit={this.handleSubmit}>
          <textarea
            type="text"
            disabled
            id="code"
          />
          <button type="submit" class="bp3-button bp3-icon-tick" icon="tick" id="gradeButton" intent="success" onClick={this.handleSubmit}>Grade code</button>
        </form>
        <p>{this.state.responseToPost}</p>
      </div>
    )
  }
}


export default BlocklyComp