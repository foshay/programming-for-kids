import React, { Component } from 'react';

import { Button, ButtonGroup, Card, HTMLTable} from "@blueprintjs/core";

import LoadingSymbol from '../../SmallComponents/LoadingSymbol';
import DisplayBlocks from '../../Blockly_comps/DisplayBlocks';

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

  render() {
    if (this.state.isLoading){
      return (<LoadingSymbol/>);
    }
    var student = this.state.student;
    return (
      <div>
        <div className="Body" >

          <ButtonGroup vertical>
            <h3>{student.first_name + " " + student.last_name} </h3>
            <h5>{"(" + student.username + ")"}</h5>
            <Button
              text="Remove Student"
              intent="danger"
              onClick={(e) => this.onRemoveStudent(e)}
            />
            <br />
          </ButtonGroup>
        </div>

        <DisplayBlocks
          hidden={!this.state.shown}
          initialXml={this.state.viewed_xml}
          lesson_id={this.state.viewed_id}
          lesson_name={this.state.viewed_name}
          key={this.state.viewed_id}
        />
        <br/>

        <div className="Manage-Table">
          <Card >
            <HTMLTable striped interactive bordered>
              {/* <HTMLTable striped bordered> */}
              <thead>
                <tr>
                  <th />
                  <th>Lesson Name</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody key="table-body">
                {this.state.grades.map((lesson, key) => {
                  return (
                    <tr onClick={() => {
                      if (this.state.shown) {
                        this.setState({
                          shown: false,
                          viewed_xml: '',
                          viewed_id: '',
                          viewed_name: ''
                        });
                      }
                      else {
                        this.setState({
                          shown: !this.state.shown,
                          viewed_xml: lesson.progress_xml,
                          viewed_id: lesson.lesson_id,
                          viewed_name: lesson.name
                        });
                      }
                    }} key={key}>
                      <td > {lesson.lesson_number} </td>
                      <td > {lesson.name} </td>
                      <td > {lesson.score} </td>
                    </tr>
                  )
                })}
              </tbody>
            </HTMLTable>
          </Card>
        </div>
      </div>
    );
  }
}

export default ManageStudent;
