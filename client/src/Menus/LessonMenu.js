import React, { Component } from 'react';
import Header from '../header_footer/Header.js'
import Footer from '../header_footer/Footer.js'
import { Button } from "@blueprintjs/core";
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
      console.log("Requesting all lessons data.");
      return fetch('api/Lesson/all')
      .then(response => {
          return response.json();
      })
      .then(json =>{
          console.log("Then: " + json.data);
          this.setState({lessons: json.data});
      });
      //const response = await fetch('/api/Lesson/all');
      //const body = await response.json();
      //console.log("LessonMenu getLessons body: " + body.data[0].lesson_id);
      //this.setState({lessons: body.data});
      //console.log("State within getLessons: " + this.state.lessons[0].lesson_id);
     // return body.data;
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
      <div className="App">

        <Header />

        <h1>Component LessonTemplate</h1>

        <main className="BodyMenu">
          <div class="bp3-button-group bp3-large bp3-vertical">
            { /* This prints out a bunch of buttons based on arrays
                  These arrays should be taken from the database*/}
            {this.state.lessonIDs.map((value, index) => {
              return (
                <div >
                  <Button id={`lesson_button`} type="button" class="bp3-button bp3-icon-code-block" icon="code-block" text={"Lesson " + this.state.lessons[index].lesson_id} onClick={() => this.goToLesson(this.state.lessons[index].lesson_id)} />
                  <br />
                </div>
              )
              // return <Button id={`lesson_button`} text={this.state.lessonNames[index]} onClick={() => this.goToLesson(value)} />
            })}
          </div>
        </main>

        <Footer />

      </div>
    );
  }
}

export default LessonMenu;
