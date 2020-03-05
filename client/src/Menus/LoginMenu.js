import React, { Component } from 'react';
import {BrowserRouter as Router,  Route, Switch, Link} from "react-router-dom";
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
        {/* TODO REMOVE THIS TEMPORARY BUTTON */}
        <Link to="/Home"><Button type="submit" id="homeButton" class="bp3-menu-item bp3-icon-layout-home" icon="home" text="Home" /></Link>
        <br />
        <br />

        <Link to="/login"><Button type="submit" id="loginButton" class="bp3-button bp3-icon-layout-log-in bp3-large" icon="log-in" text="Log In" /></Link>
        <Link to="/register"><Button type="submit" id="registerButton" class="bp3-button bp3-icon-layout-confirm bp3-large" icon="confirm" text="Register" /></Link>
      </main>
    );
  }
}

export default LoginMenu;