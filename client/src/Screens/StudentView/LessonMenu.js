import React, { Component } from 'react';
import { Button, ButtonGroup } from "@blueprintjs/core";
import { Link } from 'react-router-dom';
import LoadingSymbol from '../../SmallComponents/LoadingSymbol';

class LessonMenu extends Component {
  state = {
    lessons : [{}],
    isLoading: true,
  };

  getLessons = async () => {
    fetch('api/Lesson/all')
      .then(response => {
        this.setState({ isLoading: false });
        return response.json();
      })
      .then(json => {
        if (json.message === "Success") {
          this.setState({ lessons: json.data });
        }
      })
  }

  componentDidMount(){
      this.getLessons();
  }

  render() {
    if (this.state.isLoading) {
      return (<LoadingSymbol/>);
    }
    return (
      <div className="Body">
        <ButtonGroup large vertical>
          { /* This map prints out a bunch of buttons based on arrays
                  These arrays are taken from the database*/}
          {this.state.lessons.map((value, index) => {
            return (
              <div key={index}>
                <Link to={"/Lesson/" + value.lesson_id}>
                  <Button
                    // example text: Lesson 1: Proof of Concept 1
                    text={"Lesson " + value.lesson_number + ": " + value.name}
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
