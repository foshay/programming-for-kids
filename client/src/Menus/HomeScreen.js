import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
//import logo from './logo.svg';
//import { Text, View, StyleSheet } from 'react-native';
//import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import { Button,Navbar ,Alignment, ButtonGroup, Divider } from "@blueprintjs/core";
import Header from '../header_footer/Header.js'
import Footer from '../header_footer/Footer.js'
//import BlocklyComp from '../BlocklyComp.js'
import '../CSS_files/App.css';
//require('./Editor.jsx')

class HomeScreen extends Component {

  
render() {
    return (
      <div className="App" position="fixed">
        
        <div>
          <Header />
        </div>
        <Router>
            <div>
                <h1>Button component home</h1>
            </div>
        </Router>
        
        <div>
          <Footer />
        </div>

        </div>
    );
  }
}

export default HomeScreen;