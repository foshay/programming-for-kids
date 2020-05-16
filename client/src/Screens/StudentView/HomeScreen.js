import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Button, ButtonGroup } from "@blueprintjs/core";

class HomeScreen extends Component {
  render() {
    return (
      <div className="home-menu">
        <ButtonGroup large vertical>
          <Link to="/LessonMenu">
            <Button
              className={"vertical-margin"}
              text="Lessons"
              icon="book"
              intent="primary"
            />
          </Link>
          <Link to="/Grades">
            <Button
              className={"vertical-margin"}
              text="Grades"
              type="button"
              icon="clipboard"
            />
          </Link>
          {/* <Button
            className={"vertical-margin"}
            text="Settings"
            icon="cog"
            disabled
          /> */}
          <Link to="/">
            <Button
              className={"vertical-margin"}
              text="Log-Out"
              icon="log-out"
              intent="danger"
              onClick={() =>{
                localStorage.setItem('nccjwt', '')
                window.location.reload(true);
              }
              } 
            />
          </Link>
        </ButtonGroup>
      </div>

    );
  }
}

export default HomeScreen;