import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
//import logo from './logo.svg';
//import { Text, View, StyleSheet } from 'react-native';
//import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import Header from './header_footer/Header.js'
import Footer from './header_footer/Footer.js'
import BlocklyComp from './BlocklyComp.js'
import HomeScreen from './HomeScreen.js'
import LessonMenu from './LessonMenu.js'
import './App.css';
require('./Editor.jsx')

class App extends Component {
render() {
    return (
      <div className="App">
        
          <Router>
              <Route exact={true} path="/Home" component={HomeScreen} />
              <Route exact={true} path="/LessonMenu" component={LessonMenu} />
              <Link to="/Home"><button>Home</button></Link>
              <Link to="/LessonMenu"><button>Lessons</button></Link>
          </Router>

        </div>
    );
  }
}

export default App;