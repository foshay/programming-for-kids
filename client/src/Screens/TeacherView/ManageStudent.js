import React, { Component } from 'react';

import { Button, ButtonGroup, Card, HTMLTable, Text} from "@blueprintjs/core";

import LoadingSymbol from '../../SmallComponents/LoadingSymbol';
import DisplayBlocks from '../../Blockly_comps/DisplayBlocks';
import { Link } from 'react-router-dom';

class ManageStudent extends Component {
  state={
    student: [{}],
    grades: [{}],
    viewed_xml: '',
    viewed_id: '',
    viewed_name: '',
    shown: false,
    isLoading: true,
  }

  componentDidMount = () => {
    this.getStudent();
  }

  getStudent = async () => {
    var username = this.props.match.params.username;
    return fetch('/api/User/' + username)
      .then(response => {
        console.log(response);
        return response.json();
      })
      .then(json => {
        console.log(json);
        console.log(json.data);
        this.setState({ student: json.data });
        this.setState({ grades: json.data.grades });
        this.setState({ isLoading: false });
      });
  }

  onRemoveStudent = async (e) => {
    console.log("in removeStudent");
    var result = window.confirm("Are you sure you want to delete this student?");
    if(result){

        e.preventDefault();
        console.log("student: " + this.state.student);
        var username = this.state.student.username;

      const response = await fetch('/api/RemoveStudent', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "username": username
        })
      });
      var body = await response.text();
      var message = await body.message;

      this.setState({ responseToPost: message });
      console.info(this.state.responseToPost);
      console.log("Console message: " + message);

      if (body === "Success") {
        alert("Removed " + username);
        this.props.history.push('/ManageStudents');
      } else {
        alert("Invalid username or otp");
      }
    }
  }

  clickOnRow = (lesson) => {
    if (this.state.shown) {
      // If another lesson is shown, just switch to this one
      if (this.state.viewed_id !== lesson.lesson_id) {
        this.showPopup(lesson);
      }
      else {
        // Clicked on the same lesson to hide
        this.hidePopup();
      }
    }
    else {
      // No lesson is shown, show this lesson
      this.showPopup(lesson);
    }
  }

  hidePopup = () => {
    this.setState({
      shown: false,
      viewed_xml: '',
      viewed_id: '',
      viewed_name: ''
    });
  }

  showPopup = (lesson) => {
    this.setState({
      shown: true,
      viewed_xml: lesson.progress_xml,
      viewed_id: lesson.lesson_id,
      viewed_name: lesson.name
    });
  }

  render() {
    if (this.state.isLoading){
      return (<LoadingSymbol/>);
    }
    var student = this.state.student;
    return (
      <div>
        <div className="Body" >
          <ButtonGroup vertical>
            <Link to="/ManageStudents">
              <Button
                className="vertical-margin"
                text="Back"
                intent="warning"
              />
            </Link>
            <Card className="vertical-margin" >
              <Text>{student.first_name + " " + student.last_name} </Text>
              <Text>{"(" + student.username + ")"}</Text>
            </Card>
            <Button
              className="vertical-margin"
              text="Remove Student"
              intent="danger"
              onClick={(e) => this.onRemoveStudent(e)}
            />
          </ButtonGroup>
        </div>

        <DisplayBlocks
          hidden={!this.state.shown}
          initialXml={this.state.viewed_xml}
          lesson_id={this.state.viewed_id}
          lesson_name={this.state.viewed_name}
          hidePopup={() => this.hidePopup()}
          key={this.state.viewed_id}
        />
        <br/>

        <div className="centered horizontal-margin">
          <Card >
            <HTMLTable striped interactive bordered>
              <thead>
                <tr>
                  <th />
                  <th>Lesson Name</th>
                  <th>Score</th>
                  <th>Attempted</th>
                </tr>
              </thead>
              <tbody key="table-body">
                {this.state.grades.map((lesson, key) => {
                  return (
                    <tr
                      onClick={() => this.clickOnRow(lesson)}
                      style={
                        {'background-color': 
                        (this.state.viewed_id === lesson.lesson_id) ?
                          { 'backgroud-color': 'blue' } :
                          { 'backgroud-color': 'black' }
                          }
                        // (this.state.viewed_id === lesson.lesson_id) ?
                        //   { 'backgroud-color': 'blue' } :
                        //   { 'backgroud-color': 'black' }
                      }
                      key={key}>
                      <td > {lesson.lesson_number} </td>
                      <td > {lesson.name} </td>
                      <td > {lesson.score} </td>
                      <td > {lesson.progress_xml ? "yes" : "no"} </td>
                    </tr>
                  )
                })}
              </tbody>
            </HTMLTable>
          </Card>
          <br/>
        </div>
      </div>
    );
  }
}

export default ManageStudent;
