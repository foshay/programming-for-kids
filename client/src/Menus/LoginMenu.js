import React, { Component } from 'react';
import {Link} from "react-router-dom";
import { Button } from "@blueprintjs/core";
import '../CSS_files/App.css';
import '../CSS_files/Body.css';

import "../../../node_modules/normalize.css";
import "../../../node_modules/@blueprintjs/core/lib/css/blueprint.css";
import "../../../node_modules/@blueprintjs/icons/lib/css/blueprint-icons.css";

class LoginMenu extends Component {

  render() {
    return (
      <main className="BodyMenu">
        <ul style={{ paddingLeft: 0 }}>
          <Link to="/login">
            <Button
              type="submit"
              id="loginButton"
              className="bp3-button bp3-icon-layout-log-in bp3-large"
              icon="log-in"
              text="Log In"
              intent="success"
            />
          </Link>
        </ul>
        <ul style={{ paddingLeft: 0 }}>
          <Link to="/register">
            <Button
              type="submit"
              id="registerButton"
              className="bp3-button bp3-icon-layout-confirm bp3-large"
              icon="confirm"
              text="Register"
              intent="primary"
            />
          </Link>
        </ul>
      </main>
    );
  }
}

export default LoginMenu;