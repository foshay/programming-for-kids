import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
import { AnchorButton, Button, Code, H5, Intent, Switch as bpSwitch, Navbar, Alignment, Menu, MenuDivider, MenuItem, Popover, Position, Classes } from "@blueprintjs/core";
//import logo from './logo.svg';
//import { Text, View, StyleSheet } from 'react-native';
//import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import Header from '../header_footer/Header.js'
import Footer from '../header_footer/Footer.js'
import BlocklyComp from '../Blockly_comps/BlocklyComp.js'
//import LessonTemp from "./LessonTemplate.js"
import '../CSS_files/App.css';
require('../Editor.jsx')

class LessonMenu extends Component {

    goToLesson = (lessonID) => {
      // changes the url on click
        this.props.history.push(`/Lesson/${lessonID}`);
    }


  render() {
    return (
      <div className="App">

        <Header />

        <h1>Component LessonTemplate</h1>
        { /* We can change this so that the buttons come from an array of 
        lesson id's from the database*/}
        <Button id="1" text="Lesson 1" onClick ={() => this.goToLesson("Lesson_1")} />
        <Button id="2" text="Lesson 2" onClick ={() => this.goToLesson("Lesson_2")} />
        <Button id="3" text="Lesson 3" onClick ={() => this.goToLesson("Lesson_3")} />

        <Footer />

      </div>
    );
  }
}

export default LessonMenu;