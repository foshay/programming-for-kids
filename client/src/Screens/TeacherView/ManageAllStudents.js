import React, { Component } from 'react';
import { HTMLTable, Card, } from "@blueprintjs/core";

class ManageAllStudents extends Component {

  state = {
    students : [{student_name: "Johnny Test", overall_grade: "80", student_id: "smithj2"}]
  };

  getStudents = async () => {
    // TODO make api call to get student info
      // return fetch('api/Students/all')
      // .then(response => {
      //     return response.json();
      // })
      // .then(json =>{
      //     this.setState({students: json.data});
      // });
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
                <th>Name</th>
                <th>Overall Grade</th>
              </tr>
            </thead>
            <tbody>
              {this.state.students.map((value, index) => {
                return (
                  <tr onClick={() => this.goToStudent(value.student_id)} >
                    {/* TODO add first name and last name */}
                    <td> {value.student_name} </td>
                    <td> {value.overall_grade + "%"} </td>
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