import React, { Component } from 'react';
import {Link} from "react-router-dom";
import { Button, ButtonGroup } from "@blueprintjs/core";

class LoginMenu extends Component {

  render() {
    return (
      <div className="Body">
        <ButtonGroup vertical large>
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
          <br/>
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
        </ButtonGroup>
      </div>
    );
  }
}

export default LoginMenu;