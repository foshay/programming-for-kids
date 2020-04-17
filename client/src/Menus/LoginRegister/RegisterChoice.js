import React, { Component } from 'react';
import {Link} from "react-router-dom";

import { Button, ButtonGroup } from "@blueprintjs/core";
import '../CSS_files/App.css';
import '../CSS_files/Body.css';

import "../../../node_modules/normalize.css";
import "../../../node_modules/@blueprintjs/core/lib/css/blueprint.css";
import "../../../node_modules/@blueprintjs/icons/lib/css/blueprint-icons.css";

class RegisterChoice extends Component {

  render() {
    return (
      <div className="Body">
        <ButtonGroup vertical large>
          <Link to="/register/student">
            <Button
              type="submit"
              id="registerStudentButton"
              class="bp3-button bp3-icon-layout-log-in bp3-large"
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
              class="bp3-button bp3-icon-layout-confirm bp3-large"
              icon="confirm"
              text="New Teacher"
              intent="primary"
            />
          </Link>
          <br/>
          <Link to="/">
            <Button
              type="button"
              class="bp3-button bp3-icon-layout-small-cross"
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