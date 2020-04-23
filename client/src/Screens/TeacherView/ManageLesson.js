import React, { Component } from 'react';
import {Link} from "react-router-dom";

import { Button, ButtonGroup, } from "@blueprintjs/core";

import BlocklyCompEdit from '../../Blockly_comps/BlocklyCompEdit';
import EditField from '../../SmallComponents/EditField';

class ManageLesson extends Component {
  state={
    name:'',
    question:'',
    hint:''
  }

  handleSave = async e => {
    e.preventDefault();
    var name = this.state.name;
    var question = this.state.question;
    var hint = this.state.hint;
    // check that none are empty
    if ((name == '') || (question = '') || (hint = '')){
      alert("Must fill in all fields")
      return;
    }


    const response = await fetch('/NewLesson', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "name": name,
        "question": question,
        "hint": hint,
      })
    });
    const body = await response.text();
    console.info("Created " + body);
    alert("Lesson Created");
    // alert("Lesson Created" + body.data.name);

    // if (body == 'Failure') {
    //   alert("Username taken");
    //   console.info("Taken: " + body);
    // } else if (body == "DB Failure") {
    //   alert("Issue creating account");
    // } else {
    //   console.info("Created " + body);
    //   alert("User created");
    // }
  };

  render() {
    return (
      <div className="Edit-Lesson">
        <ButtonGroup large style={{ paddingBottom: "1vh" }}>
          <Link to="/ManageLessons">
            <Button
              text="Back"
              className={"Top-Left-Back"}
              style={{ marginRight: "1vh" }}
              intent="warning"
              icon="small-cross"
            />
          </Link>
          <Button
            text="Save"
            intent="success"
            icon="small-cross"
            onClick={(e) => this.handleSave(e)}
          />
        </ButtonGroup>
        <EditField
          title="Lesson Name"
          placeholder="Click to edit..."
          value={this.state.name}
          onChange={(e) => this.setState({ name: e.value })}
        />
        <br />
        <EditField
          title="Question"
          placeholder="Click to edit..."
          value={this.state.question}
          onChange={(e) => this.setState({ question: e.value })}
        />
        <br />
        <EditField
          title="Hint"
          placeholder="Click to edit..."
          value={this.state.hint}
          onChange={(e) => this.setState({ hint: e.value })}
        />
        <br />
        <BlocklyCompEdit lessonID={this.props.match.params.lessonID} />
      </div>
    );
  }
}

export default ManageLesson;