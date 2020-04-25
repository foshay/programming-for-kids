import React, { Component } from 'react';
import {Link} from "react-router-dom";

import { Button, ButtonGroup, } from "@blueprintjs/core";

import BlocklyCompEdit from '../../Blockly_comps/BlocklyCompEdit';
import EditField from '../../SmallComponents/EditField';

class ManageLesson extends Component {
  state={
    // TODO change this to take in array of props
    name: '',
    question: '',
    hint: '',
    answer: '',
  }

  componentDidMount() {
    this.getLessonInfo();
  }

  getLessonInfo = async () => {
      const lesson_id = this.props.match.params.lessonID;
      // only load in info if this is an existing lesson
      if (lesson_id !== 'NewLesson'){
        return fetch('/api/lesson/' + lesson_id)
          .then(response => {
            return response.json();
          })
          .then(json => {
            this.setState({
              name: json.data.name,
              question: json.data.question,
              hint: json.data.hint,
              answer: json.data.answer
            });
          });
      }
  }

  handleSave = async e => {
    e.preventDefault();
    var name = this.state.name;
    var question = this.state.question;
    var hint = this.state.hint;
    var answer = this.state.answer;
    var lesson_id = this.props.match.params.lessonID;

    // check that none are empty
    if ((name === '') || (question === '') || (hint === '') || (answer === '')) {
      alert("Must fill in all fields. Content Not Saved.");
      return;
    }

    // If we are creating a new lesson
    if (lesson_id === 'NewLesson') {
      const response = await fetch('/api/NewLesson', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "question": question,
          "answer": answer,
          "name": name,
          "hint": hint,
          // TODO add xml
          // TODO add grading script?
        })
      });
      const body = await response.text();
      if (body === "Success"){
        console.info("Created " + name);
        alert("Lesson Created");
      }
      else {
        console.info("Error: " + body);
        alert("Database Error");
      }
    }
    // If we are editing an existing lesson
    else {
      const response = await fetch('/api/EditLesson/' + lesson_id, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "name": name,
          "question": question,
          "hint": hint,
          "answer": answer,
          "lesson_id": lesson_id,
          // TODO add xml
          // TODO add grading script?
        })
      });
      const body = await response.text();
      if (body.message === "Success"){
        console.info("Updated " + name);
        alert("Lesson Updated");
      }
      else {
        console.info("Error: " + body);
        alert("Database Error");
      }
    }
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
          onChange={(value) => { this.setState({ name: value }); }}
        />
        <br />
        <EditField
          title="Question"
          placeholder="Click to edit..."
          value={this.state.question}
          onChange={(value) => this.setState({ question: value })}
        />
        <br />
        <EditField
          title="Hint"
          placeholder="Click to edit..."
          value={this.state.hint}
          onChange={(value) => this.setState({ hint: value })}
        />
        <br />
        <EditField
          title="Answer"
          placeholder="Click to edit..."
          value={this.state.answer}
          onChange={(value) => this.setState({ answer: value })}
        />
        <br />
        <BlocklyCompEdit lessonID={this.props.match.params.lessonID} />
      </div>
    );
  }
}

export default ManageLesson;