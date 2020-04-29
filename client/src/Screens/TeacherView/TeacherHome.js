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
      <div className="Body">
          <ButtonGroup vertical large >
            <Link to="/ManageStudents">
              <Button
                text="Manage Students"
                className="MenuItem"
                icon="clipboard"
                intent="success"
              />
            </Link>
            <br />
            <Link to="/ManageLessons">
              <Button
                className="MenuItem"
                text="Manage Lessons"
                icon="wrench"
                intent="primary"
              />
            </Link>
            <br />
            <Link to="/NewLesson">
              <Button
                text="New Lesson"
                className="MenuItem"
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