import React, { Component } from 'react';
import { HTMLTable, Card } from "@blueprintjs/core";

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
                <th/>
                <th>Lesson Name</th>
              </tr>
            </thead>
            <tbody>
              {this.state.lessons.map((value, index) => {
                // const id = this.state.lessons[index].lesson_id;
                // const name = this.state.lessons[index].name;
                return (
                  <tr onClick={() => this.goToLesson(value.id)} >
                    <td> {value.lesson_id} </td>
                    <td> {value.name} </td>
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