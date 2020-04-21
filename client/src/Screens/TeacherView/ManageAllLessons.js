import React, { Component } from 'react';
import { HTMLTable, Button, Card } from "@blueprintjs/core";

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
        <Card>
          <HTMLTable striped interactive bordered>
            <thead>
              <tr>
                <th></th>
                <th>Lesson Name</th>
              </tr>
            </thead>
            <tbody>
              {this.state.lessons.map((_, index) => {
                const id = this.state.lessons[index].lesson_id;
                const name = this.state.lessons[index].name;
                return (
                  <tr onClick={() => this.goToLesson(id)} >
                    <td> {id} </td>
                    <td> {name} </td>
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