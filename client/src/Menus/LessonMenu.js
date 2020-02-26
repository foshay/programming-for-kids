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

    goToLesson(lessonID){
        this.props.history.push("/Lesson/{lessonID}")
    }


  render() {
    return (
      <div className="App">

        <Header />

        <h1>Component LessonTemplate</h1>
        <Link to="/Lesson"><Button id="1" text="Lesson 1" onClick ={goToLesson('1')} /></Link>
        <Link to="/Lesson"><Button id="2" text="Lesson 2" /></Link>
        <Link to="/Lesson"><Button id="3" text="Lesson 3" /></Link>
        <Link to="/Lesson"><Button id="4" text="Lesson 4" /></Link>
        <Link to="/Lesson"><Button id="5" text="Lesson 5" /></Link>
        <Link to="/Lesson"><Button id="6" text="Lesson 6" /></Link>
        <Link to="/Lesson"><Button id="7" text="Lesson 7" /></Link>
        <Link to="/Lesson"><Button id="8" text="Lesson 8" /></Link>
        <Link to="/Lesson"><Button id="9" text="Lesson 9" /></Link>
        <Link to="/Lesson"><Button id="10" text="Lesson 10" /></Link>

        <Footer />

      </div>
    );
  }
}

export default LessonMenu;