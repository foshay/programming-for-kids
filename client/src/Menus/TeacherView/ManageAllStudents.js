import React, { Component } from 'react';
import { HTMLTable, Icon, Button } from "@blueprintjs/core";
import '../../CSS_files/App.css';
import '../../CSS_files/Body.css';

import "../../../../node_modules/normalize.css";
import "../../../../node_modules/@blueprintjs/core/lib/css/blueprint.css";
import "../../../../node_modules/@blueprintjs/icons/lib/css/blueprint-icons.css";
import { Link } from 'react-router-dom';

class ManageAllStudents extends Component {

  state = {
    students : [{student_name: "John", overall_grade: "80", student_id: "smithj2"}]
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
    return (
      <div className="BodyTable">
        <HTMLTable striped interactive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Overall Grade</th>
            </tr>
          </thead>
          <tbody>
            {this.state.students.map((value, index) => {
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