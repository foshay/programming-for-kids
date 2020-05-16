import React, { Component } from 'react';
import {Link} from "react-router-dom";
import { Button, ButtonGroup } from "@blueprintjs/core";

class LoginMenu extends Component {

  render() {
    return (
      <div className="home-menu">
        <ButtonGroup vertical large>
          <Link to="/login">
            <Button
              type="submit"
              id="loginButton"
              className="vertical-margin"
              icon="log-in"
              text="Log In"
              intent="success"
            />
          </Link>
          <Link to="/register">
            <Button
              type="submit"
              id="registerButton"
              className="vertical-margin"
              icon="log-in"
              icon="confirm"
              text="Register"
              intent="primary"
            />
          </Link>
        </ButtonGroup>
      </div>
    );
  }
}

export default LoginMenu;