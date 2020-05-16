import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Button, ButtonGroup } from "@blueprintjs/core";
import '../../CSS_files/App.css';
import '../../CSS_files/Body.css';

import "../../../../node_modules/normalize.css";
import "../../../../node_modules/@blueprintjs/core/lib/css/blueprint.css";
import "../../../../node_modules/@blueprintjs/icons/lib/css/blueprint-icons.css";

class TeacherHome extends Component {
  render() {
    return (
      <div className="home-menu">
          <ButtonGroup vertical large >
            <Link to="/ManageStudents">
              <Button
                text="Manage Students"
                className="vertical-margin"
                icon="clipboard"
                intent="success"
              />
            </Link>
            <Link to="/ManageLessons">
              <Button
                className="vertical-margin"
                text="Manage Lessons"
                icon="wrench"
                intent="primary"
              />
            </Link>
            <Link to="/ManageLessons/NewLesson">
              <Button
                text="New Lesson"
                className="vertical-margin"
                icon="build"
                intent="none"
              />
            </Link>
          </ButtonGroup>
      </div>
    );
  }
}

export default TeacherHome;