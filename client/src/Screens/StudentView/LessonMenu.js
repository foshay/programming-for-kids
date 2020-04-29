import React, { Component } from 'react';
import { Button, ButtonGroup } from "@blueprintjs/core";
import { Link } from 'react-router-dom';

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

  componentDidMount(){
      this.getLessons();
  }

  render() {
    return (
      <div className="Body">
          <ButtonGroup large vertical>
            { /* This map prints out a bunch of buttons based on arrays
                  These arrays are taken from the database*/}
            {this.state.lessons.map((value, _) => {
              return (
                <div >
                  <Link to={"/Lesson/" + value.lesson_id}>
                    <Button
                      // example text: Lesson 1: Proof of Concept 1
                      text={"Lesson " + value.lesson_id + ": " + value.name}
                    />
                  </Link>
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
