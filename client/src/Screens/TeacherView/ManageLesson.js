import React, { Component } from 'react';
import {Link} from "react-router-dom";
import { Button} from "@blueprintjs/core";

class ManageLesson extends Component {
render() {
    return (
      <div className="Body">
        <h1>Lesson Name</h1>
        <h1>Question</h1>
        <h1>Hint</h1>
      </div>
    );
  }
}

export default ManageLesson;