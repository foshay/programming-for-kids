import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
import { AnchorButton, Button, Code, H5, Intent, Switch as bpSwitch, Navbar, Alignment, Menu, MenuDivider, MenuItem, Popover, Position, Classes } from "@blueprintjs/core";
//import logo from './logo.svg';
//import { Text, View, StyleSheet } from 'react-native';
//import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import Header from '../header_footer/Header.js'
import Footer from '../header_footer/Footer.js'
import BlocklyComp from '../Blockly_comps/BlocklyComp.js'
import '../CSS_files/App.css';
require('../Editor.jsx')

class LessonMenu extends Component {


  render() {
    return (
      <div className="App">

        <Header />

        <h1>Component LessonTemplate</h1>
        <Link to="/Lesson"><Button text="Lesson 1" /></Link>

        <Footer />

      </div>
    );
  }
}

export default LessonMenu;