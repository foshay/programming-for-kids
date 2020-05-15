import React, { Component } from 'react';

import { Button, ButtonGroup, Card, HTMLTable, Text} from "@blueprintjs/core";

import LoadingSymbol from '../../SmallComponents/LoadingSymbol';
import { Link } from 'react-router-dom';

// Token things
const jwt = require('jsonwebtoken');
const secret = "this is temporary"

class Grades extends Component {
  state={
    student: [{}],
    grades: [{}],
    isLoading: true,
    username: '',
  }

  componentDidMount = () => {
    this.getStudent();
  }

  getStudent = async () => {
    var username = '';
    const token = localStorage.getItem('nccjwt');

    // Check if anyone is logged in before showing anything
    if (!token) {
      console.log("No Token");
      this.setState({ isLoading: false });
    }
    else {
      // Make sure valid token and get username
      jwt.verify(token, secret, (err, decoded) => {
        if (err) { return; }
        username = decoded.username;
        this.setState({ username });
      });
      fetch('/api/User/' + username)
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
  }

  goToLesson = (lessonID) => {
    // changes the url when a button is clicked
    this.props.history.push(`/Lesson/${lessonID}`);
  }

  render() {
    if (this.state.isLoading){
      return (<LoadingSymbol/>);
    }
    if (this.state.username === "") {
      // no one is logged in
      return (<div />)
    }
    var student = this.state.student;
    return (
      <div>
        <div className="home-menu horizontal-margin">
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
                    <tr onClick={() => this.goToLesson(lesson.lesson_id)} key={key}>
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

export default Grades;
