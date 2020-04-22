import React, { Component } from 'react';
import {Link} from "react-router-dom";

import { Button, ButtonGroup, } from "@blueprintjs/core";

import BlocklyCompEdit from '../../Blockly_comps/BlocklyCompEdit';
import EditField from '../../SmallComponents/EditField';

class ManageLesson extends Component {
  state={
    name:'',
    question:'',
    hint:''
  }

render() {
    return (
      <div className="Edit-Lesson">
        <ButtonGroup large style={{paddingBottom: "1vh"}}>
          <Link to="/ManageLessons">
            <Button
              className={"Top-Left-Back"}
              style={{marginRight: "1vh"}}
              type="button"
              intent="warning"
              icon="small-cross"
              text="Back"
            />
          </Link>
          <Link to="/">
            <Button
              type="button"
              intent="success"
              icon="small-cross"
              text="Save"
            />
          </Link>
        </ButtonGroup>
        <EditField
          title="Lesson Name"
          placeholder="Click to edit..."
          value={this.state.name}
          onChange={(e) => this.setState({name: e.value})}
        />
        <br/>
        <EditField
          title="Question"
          placeholder="Click to edit..."
          value={this.state.question}
          onChange={(e) => this.setState({question: e.value})}
        />
        <br/>
        <EditField
          title="Hint"
          placeholder="Click to edit..."
          value={this.state.hint}
          onChange={(e) => this.setState({hint: e.value})}
        />
        <br/>
        <BlocklyCompEdit lessonID={this.props.match.params.lessonID} />
      </div>
    );
  }
}

export default ManageLesson;