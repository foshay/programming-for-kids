import React, { Component } from 'react';
import {Link} from "react-router-dom";

import { Button, ButtonGroup } from "@blueprintjs/core";

class RegisterChoice extends Component {
  render() {
    return (
      <div className="Body">
        <ButtonGroup vertical large>
          <Link to="/register/student">
            <Button
              type="submit"
              id="registerStudentButton"
              icon="confirm"
              text="New Student"
              intent="primary"
            />
          </Link>
          <br/>
          <Link to="/register/teacher">
            <Button
              type="submit"
              id="registerTeacherButton"
              icon="confirm"
              text="New Teacher"
              intent="primary"
            />
          </Link>
          <br/>
          <Link to="/">
            <Button
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