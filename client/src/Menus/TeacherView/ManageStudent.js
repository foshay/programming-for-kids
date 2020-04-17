import React, { Component } from 'react';
import {Link} from "react-router-dom";
import { Button, ButtonGroup} from "@blueprintjs/core";
import '../../CSS_files/App.css';
import '../../CSS_files/Body.css';

import "../../../../node_modules/normalize.css";
import "../../../../node_modules/@blueprintjs/core/lib/css/blueprint.css";
import "../../../../node_modules/@blueprintjs/icons/lib/css/blueprint-icons.css";

class ManageStudent extends Component {
render() {
    return (
        <div className="BodyMenu">
          <ButtonGroup vertical>
            <h1> Manage Student </h1>
            <Button> Remove Student </Button>
            <br/>
            <Button> Remove Student </Button>
          </ButtonGroup>
        </div>
    );
  }
}

export default ManageStudent;