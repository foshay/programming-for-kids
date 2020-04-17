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
              text="Lessons" 
              type="button"
              icon="book"
              intent="primary" 
            />
          </Link>
          <br/>
          <Link to="/CardGame">
            <Button
              text="Card Game"
              type="button"
              icon="ninja"
            />
          </Link>
          <br/>
          <Button
            text="Settings"
            type="button"
            icon="cog"
            disabled
          />
          <br/>
          <Link to="/">
            <Button type="button"
              text="Log-Out" 
              icon="log-out"
              intent="danger"
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