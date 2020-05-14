import React, { Component } from 'react';
import { Button, ButtonGroup, Card, HTMLTable} from "@blueprintjs/core";
import LoadingSymbol from '../../SmallComponents/LoadingSymbol';

class ManageStudent extends Component {
  state={
    student: [{}],
    grades: [{}],
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
    if (student === [{}]) {
      return (
        <h1 className="Body">Loading...</h1>
      )
    }
    else {
      return (
        <div className="Body">
          <ButtonGroup vertical>
            <h1> Manage Student </h1>
            <h3>{student.first_name + " " + student.last_name} </h3>
            <h5>{"(" + student.username + ")"}</h5>
            <Button
              text="Remove Student"
              intent="danger"
              onClick={(e) => this.onRemoveStudent(e)}
            />
            <br />
          </ButtonGroup>

          <Card>
            {/* <HTMLTable striped interactive bordered> */}
            <HTMLTable striped bordered>
              <thead>
                <tr>
                  <th />
                  <th>Lesson Name</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody key="table-body">
                {this.state.grades.map((value, key) => {
                  return (
                    <tr key ={key}> 
                      {/* <tr onClick={() => this.showXml(value.progress_xml)} key={key}> */}
                      <td > {value.lesson_number} </td>
                      <td > {value.name} </td>
                      <td > {value.score} </td>
                    </tr>
                  )
                })}
              </tbody>
            </HTMLTable>
          </Card>
        </div>
        // we want to see the grade for each lesson
        // we also want to access the saved xml for each lesson
      );
    }
  }
}

export default ManageStudent;
