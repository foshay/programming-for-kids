import React, { Component } from 'react';
import {Link} from "react-router-dom";
import { Button} from "@blueprintjs/core";
import '../../CSS_files/App.css';
import '../../CSS_files/Body.css';

import "../../../../node_modules/normalize.css";
import "../../../../node_modules/@blueprintjs/core/lib/css/blueprint.css";
import "../../../../node_modules/@blueprintjs/icons/lib/css/blueprint-icons.css";

class ManageStudent extends Component {
render() {
    return (
        <div className="BodyMenu">
          <h5> Manage Student </h5>
        </div>
    );
  }
}

export default ManageStudent;