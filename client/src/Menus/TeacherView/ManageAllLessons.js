import React, { Component } from 'react';
import {Link} from "react-router-dom";
import { Button} from "@blueprintjs/core";
import { HTMLTable, Icon } from "@blueprintjs/core";
import '../../CSS_files/App.css';
import '../../CSS_files/Body.css';

import "../../../../node_modules/normalize.css";
import "../../../../node_modules/@blueprintjs/core/lib/css/blueprint.css";
import "../../../../node_modules/@blueprintjs/icons/lib/css/blueprint-icons.css";

class ManageAllLessons extends Component {
  state = {
    lessons : [{}]
  };

  getLessons = async () => {
      return fetch('api/Lesson/all')
      .then(response => {
          return response.json();
      })
      .then(json =>{
          this.setState({lessons: json.data});
      });
  }

  goToLesson = (lessonID) => {
    // changes the url when a button is clicked
    // TODO change this to bringing to edit lesson page
    this.props.history.push(`/Lesson/${lessonID}`);
  }

  componentDidMount(){
      this.getLessons();
  }

  render() {
    return (
      <div className="BodyTable">
        <HTMLTable striped interactive>
          <thead>
            <tr>
              <th>Number</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {this.state.lessons.map((value, index) => {
              return (
                <tr onClick={() => this.goToLesson(this.state.lessons[index].lesson_id)} >
                  <td> {this.state.lessons[index].lesson_id} </td>
                  <td> {this.state.lessons[index].name} </td>
                </tr>
              )
            })}
          </tbody>

        </HTMLTable>
      </div>
    );
  }
}

export default ManageAllLessons;