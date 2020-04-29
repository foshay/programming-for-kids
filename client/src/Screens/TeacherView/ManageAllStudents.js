import React, { Component } from 'react';
import { HTMLTable, Card, } from "@blueprintjs/core";

class ManageAllStudents extends Component {

  state = {
    students : [{}]
  };

  getStudents = async () => {
    return fetch('api/Student/all')
      .then(response => {
        return response.json();
      })
      .then(json => {
        this.setState({ students: json.data });
      });
  }

  goToStudent = (studentID) => {
    // changes the url when a button is clicked
    // TODO change this to a Link or Redirect rather than push
    this.props.history.push(`/ManageStudents/${studentID}`);
  }

  componentDidMount() {
    this.getStudents();
  }

  render() {
    return (
      <div className="Body">
        <Card>
          <HTMLTable striped interactive bordered>
            <thead>
              <tr>
                <th>First</th>
                <th>Last</th>
                <th>User Name</th>
                <th>Overall Grade</th>
              </tr>
            </thead>
            <tbody>
              {/* {this.state.students.map((_, index) => {
                const id = this.state.lessons[index].lesson_id;
                const name = this.state.lessons[index].name;
                return (
                  <tr onClick={() => this.goToLesson(id)} >
                    <td> {id} </td>
                    <td> {name} </td>
                  </tr>
                )
              })} */}
              {this.state.students.map((value, key) => {
                return (
                  <tr onClick={() => this.goToStudent(value.user_id)} key={key}>
                    <td> {value.first_name} </td>
                    <td> {value.last_name} </td>
                    <td> {value.username} </td>
                    {/* TODO add overall grade */}
                    <td> {100 + "%"} </td>
                  </tr>
                )
              })}
            </tbody>
          </HTMLTable>
        </Card>
      </div>
    );
  }
}

export default ManageAllStudents;