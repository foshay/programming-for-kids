import React, { Component } from 'react';
import { Button, ButtonGroup} from "@blueprintjs/core";

class ManageStudent extends Component {
render() {
    return (
        <div className="BodyMenu Body">
          <ButtonGroup vertical>
            <h1> Manage Student </h1>
            <Button> Remove Student </Button>
            <br/>
            <Button> Remove Student </Button>
          </ButtonGroup>
        </div>
        // we want to see the grade for each lesson
        // we also want to access the saved xml for each lesson
    );
  }
}

export default ManageStudent;