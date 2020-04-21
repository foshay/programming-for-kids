import React, { Component } from 'react';
import { HTMLTable, Button, } from "@blueprintjs/core";
import { Link } from 'react-router-dom';

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
    this.props.history.push(`/ManageStudents/${studentID}`);
  }

  componentDidMount() {
    this.getStudents();
  }

  render() {
        {/* <div className="Body">
          <Link to ="/TeacherHome">
            <Button
              style ={{padding: }}
              text="Back"
              icon="cross"
              intent="warning"
            />
          </Link>
        </div> */}
    return (
      <div className="Body">
        <HTMLTable striped interactive bordered>
          <thead>
            <tr>
              <th>Name</th>
              <th>Overall Grade</th>
            </tr>
          </thead>
          <tbody>
            {this.state.students.map((_, index) => {
              return (
                <tr onClick={() => this.goToStudent(this.state.students[index].student_id)} >
                  <td> {this.state.students[index].student_name} </td>
                  <td> {this.state.students[index].overall_grade + "%"} </td>
                </tr>
              )
            })}
          </tbody>
        </HTMLTable>
      </div>
    );
  }
}

export default ManageAllStudents;