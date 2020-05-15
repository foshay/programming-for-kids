import React, { Component } from 'react';
import {Link} from "react-router-dom";

import { Button, ButtonGroup } from "@blueprintjs/core";

class RegisterChoice extends Component {
  render() {
    return (
      <div className="home-menu">
        <ButtonGroup vertical large>
          <Link to="/register/student">
            <Button
              className={"vertical-margin"}
              type="submit"
              id="registerStudentButton"
              icon="confirm"
              text="New Student"
              intent="primary"
            />
          </Link>
          <Link to="/register/teacher">
            <Button
              className={"vertical-margin"}
              type="submit"
              id="registerTeacherButton"
              icon="confirm"
              text="New Teacher"
              intent="primary"
            />
          </Link>
          <Link to="/">
            <Button
              className={"vertical-margin"}
              type="button"
              intent="warning"
              icon="small-cross"
              text="Back"
            />
          </Link>
        </ButtonGroup>
      </div>
    );
  }
}

export default RegisterChoice;