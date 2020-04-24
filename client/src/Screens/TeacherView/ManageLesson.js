import React, { Component } from 'react';
import {Link} from "react-router-dom";

import { Button, ButtonGroup, } from "@blueprintjs/core";

import BlocklyCompEdit from '../../Blockly_comps/BlocklyCompEdit';
import EditField from '../../SmallComponents/EditField';

class ManageLesson extends Component {
  state={
    name:'',
    question:'',
    hint:'',
    answer:'',
  }

  componentDidMount() {
    this.getLessonInfo();
  }

  getLessonInfo = async () => {
    const lesson_id = this.props.match.params.lessonID;
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

  handleSave = async e => {
    e.preventDefault();
    var name = this.state.name;
    var question = this.state.question;
    var hint = this.state.hint;
    var answer = this.state.answer;
    var lesson_id = this.props.match.params.lessonID;

    // check that none are empty
    if ((name == '') || (question = '') || (hint = '') || (answer = '')) {
      alert("Must fill in all fields. Content Not Saved.");
      return;
    }

    if (lesson_id != 'NewLesson') {
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
          // TODO add xml
          // TODO add grading script?
        })
      });
      const body = await response.text();
      console.info("Updated " + body);
      alert("Lesson Updated");
    }
    else {
      const response = await fetch('/api/NewLesson', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "name": name,
          "question": question,
          "hint": hint,
          "answer": answer,
          // TODO add xml
          // TODO add grading script?
        })
      });
      const body = await response.text();
      console.info("Created " + body);
      alert("Lesson Created");
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
        <EditField
          title="Answer"
          placeholder="Click to edit..."
          value={this.state.answer}
          onChange={(e) => this.setState({ answer: e.value })}
        />
        <br />
        <BlocklyCompEdit lessonID={this.props.match.params.lessonID} />
      </div>
    );
  }
}

export default ManageLesson;