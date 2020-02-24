import React, { Component } from 'react';
import {BrowserRouter as Router,  Route, Switch} from "react-router-dom";
//import logo from './logo.svg';
//import { Text, View, StyleSheet } from 'react-native';
//import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import { Button,Navbar ,Alignment, ButtonGroup, Divider } from "@blueprintjs/core";
import Header from '../header_footer/Header.js'
import Footer from '../header_footer/Footer.js'
//import BlocklyComp from '../BlocklyComp.js'
import '../CSS_files/App.css';
//require('./Editor.jsx')

class LoginMenu extends Component {

  
render() {
    return (
      <div className="App">
        
        <Header>
          <Header />
        </Header>
        <Router>
            <main>
                <h1>Button component log-in</h1>
                <ButtonGroup>
                    <Button>Log in</Button>
                    <Divider />
                </ButtonGroup>
            </main>
        </Router>
        
        <footer>
          <Footer />
        </footer>

        </div>
    );
  }
}

export default LoginMenu;