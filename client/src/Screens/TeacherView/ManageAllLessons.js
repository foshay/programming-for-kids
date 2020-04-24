import React, { Component } from 'react';
import { HTMLTable, Card, Button } from "@blueprintjs/core";
import { Link } from 'react-router-dom';

class ManageAllLessons extends Component {
  state = {
    lessons: [{}]
  };

  getLessons = async () => {
    return fetch('api/Lesson/all')
      .then(response => {
        return response.json();
      })
      .then(json => {
        this.setState({ lessons: json.data });
      });
  }

  goToLesson = (lessonID) => {
    // changes the url when a button is clicked
    this.props.history.push(`/ManageLessons/${lessonID}`);
  }

  componentDidMount() {
    this.getLessons();
  }

  render() {
    return (
      <div className="Body">
        <Link to="/ManageLessons/NewLesson">
          <Button
            text="Create New Lesson"
            icon="build"
            intent="success"
          />
        </Link>
        <br/>
        <Card>
          <HTMLTable striped interactive bordered>
            <thead>
              <tr>
                <th/>
                <th>Lesson Name</th>
              </tr>
            </thead>
            <tbody key="table-body">
              {this.state.lessons.map((value, key) => {
                return (
                    <tr onClick={() => this.goToLesson(value.lesson_id)} key={key}>
                      <td > {value.lesson_id} </td>
                      <td > {value.name} </td>
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

export default ManageAllLessons;