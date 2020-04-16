import React, { Component } from 'react';
import {BrowserRouter as Router,  Route, Switch, Link} from "react-router-dom";
import { Button } from "@blueprintjs/core";
import '../CSS_files/App.css';
import '../CSS_files/Body.css';

import "../../../node_modules/normalize.css";
import "../../../node_modules/@blueprintjs/core/lib/css/blueprint.css";
import "../../../node_modules/@blueprintjs/icons/lib/css/blueprint-icons.css";

class RegisterChoice extends Component {

  render() {
    return (
      <main className="BodyMenu">
        <ul style={{ paddingLeft: 0 }}>
          <Link to="/register/student">
            <Button
              type="submit"
              id="registerStudentButton"
              class="bp3-button bp3-icon-layout-log-in bp3-large"
              icon="confirm"
              text="Register New Student"
              intent="primary"
            />
          </Link>
        </ul>
        <ul style={{ paddingLeft: 0 }}>
          <Link to="/register/teacher">
            <Button
              type="submit"
              id="registerTeacherButton"
              class="bp3-button bp3-icon-layout-confirm bp3-large"
              icon="confirm"
              text="Register New Teacher"
              intent="primary"
            />
          </Link>
        </ul>
        <ul style={{ paddingLeft: 0 }}>
          <Link to="/">
            <Button
              type="button"
              class="bp3-button bp3-icon-layout-small-cross"
              intent="warning"
              icon="small-cross"
              text="Back"
            />
          </Link>
        </ul>
      </main>
    );
  }
}

export default RegisterChoice;