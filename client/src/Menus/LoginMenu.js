import React, { Component } from 'react';
import {BrowserRouter as Router,  Route, Switch, Link} from "react-router-dom";
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
                    {/* <Button><Link to="/login">Log in</Link></Button>
                    <Divider /> */}

                    <Switch>
                      <Route path="/login">
                        <h4>Username:</h4>
                        <h4>Password:</h4>
                        <Button>Submit</Button>
                        <Button><Link to="/">Back</Link></Button>
                      </Route>
                      <Route path="/register">
                        <h4>Username:</h4>
                        <h4>Password:</h4>
                        <Button>Submit</Button>
                        <Button><Link to="/">Back</Link></Button>
                      </Route>
                      <Route path="/">
                        <Button><Link to="/login">Log in</Link></Button>
                        <Button><Link to="/register">Register</Link></Button>
                      </Route>
                    </Switch>
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