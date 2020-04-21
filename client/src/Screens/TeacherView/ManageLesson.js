import React, { Component } from 'react';
import {Link} from "react-router-dom";
import { Button} from "@blueprintjs/core";

class ManageLesson extends Component {
  state={
    name:'',
    question:'',
    hint:''
  }
render() {
    return (
      <div className="Body">
        <h1>Back Button</h1>
        {/* <h1>{"Lesson id (temp): " + this.props.match.params.lessonID}</h1> */}
        <h1>Lesson Name</h1>
        <h1>Question</h1>
        <h1>Hint</h1>
        <h1>Blockly</h1>
        <h1>Cancel Button</h1>
        <h1>Save Button</h1>
      </div>
    );
  }
}

export default ManageLesson;