import React, { Component } from 'react';
import { Button, ButtonGroup } from "@blueprintjs/core";

class LessonMenu extends Component {

  state = {
    lessons : [{}]
  };

  getLessons = async () => {
      return fetch('api/Lesson/all')
      .then(response => {
          console.log(response);
          console.log(response.message);
          return response.json();
      })
      .then(json =>{
        console.log("json: " + json);
          this.setState({lessons: json.data});
      });
  }

  goToLesson = (lessonID) => {
    // changes the url when a button is clicked
    this.props.history.push(`/Lesson/${lessonID}`);
  }

  componentDidMount(){
      this.getLessons();
  }

  render() {
    return (
      <div className="Body">
          <ButtonGroup large vertical>
            { /* This map prints out a bunch of buttons based on arrays
                  These arrays are taken from the database*/}
            {this.state.lessons.map((_, index) => {
              return (
                <div >
                  <Button
                    // example text: Lesson 1: Proof of Concept 1
                    text={"Lesson " + this.state.lessons[index].lesson_id + ": " + this.state.lessons[index].name}
                    icon="code-block"
                    onClick={() => this.goToLesson(this.state.lessons[index].lesson_id)}
                  />
                  <br />
                  <br />
                </div>
              )
            })}
          </ButtonGroup>
      </div>
    );
  }
}

export default LessonMenu;
