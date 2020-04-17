import React, { Component } from 'react';
import {Link} from "react-router-dom";
import { Button, ButtonGroup} from "@blueprintjs/core";
import '../CSS_files/App.css';
import '../CSS_files/Body.css';

import "../../../node_modules/normalize.css";
import "../../../node_modules/@blueprintjs/core/lib/css/blueprint.css";
import "../../../node_modules/@blueprintjs/icons/lib/css/blueprint-icons.css";

class HomeScreen extends Component {
  render() {
    return (
      <div className="BodyMenu">
        <ButtonGroup large vertical>
          <Link to="/LessonMenu">
            <Button
              type="button"
              icon="book"
              text="Lessons" />
          </Link>
          <Link to="/CardGame">
            <Button
              type="button"
              icon="ninja"
              text="Card Game"
            />
          </Link>
          <Button
            type="button"
            disabled
            icon="cog"
            text="Settings"
          />
          <Link to="/">
            <Button type="button"
              intent="danger"
              icon="log-out"
              text="Log-Out" 
              // TODO implement logout functionality
              // onClick = {}
              />
          </Link>
        </ButtonGroup>
      </div>
    );
  }
}

export default HomeScreen;