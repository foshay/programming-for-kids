import React, { Component } from 'react';
import Header from '../header_footer/Header.js'
import Footer from '../header_footer/Footer.js'
import { Button, ButtonGroup } from "@blueprintjs/core";
import '../CSS_files/App.css';
import '../CSS_files/Body.css';
import "../../../node_modules/normalize.css";
import "../../../node_modules/@blueprintjs/core/lib/css/blueprint.css";
import "../../../node_modules/@blueprintjs/icons/lib/css/blueprint-icons.css";

// import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
// import { AnchorButton, Button, Code, H5, Intent, Switch as bpSwitch, Navbar, Alignment, Menu, MenuDivider, MenuItem, Popover, Position, Classes } from "@blueprintjs/core";
//import logo from './logo.svg';
//import { Text, View, StyleSheet } from 'react-native';
//import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
// import BlocklyComp from '../Blockly_comps/BlocklyComp.js'
//import LessonTemp from "./LessonTemplate.js"
// require('../Editor.jsx')

class LessonMenu extends Component {

  state = {
    lessons : [{}]
  };

  getLessons = async () => {
      return fetch('api/Lesson/all')
      .then(response => {
          return response.json();
      })
      .then(json =>{
          this.setState({lessons: json.data});
      });
  }

  goToLesson = (lessonID) => {
    // changes the url when a button is clicked
    this.props.history.push(`/Lesson/${lessonID}`);
  }
 
  componentDidMount(){
      this.getLessons();
  }

  render() {
    return (

      <div className="BodyMenu">
          <ButtonGroup large vertical>
            { /* This prints out a bunch of buttons based on arrays
                  These arrays are taken from the database*/}
            {this.state.lessons.map((value, index) => {
              return (
                <div >
                  <Button
                    // example text: Lesson 1: Proof of Concept 1
                    text={"Lesson " + this.state.lessons[index].lesson_id + ": " + this.state.lessons[index].name}
                    icon="code-block"
                    onClick={() => this.goToLesson(this.state.lessons[index].lesson_id)}
                  />
                  <br />
                  <br />
                </div>
              )
            })}
          </ButtonGroup>
      </div>
    );
  }
}

export default LessonMenu;
