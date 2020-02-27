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
  state= {
    responseToPost: '',
  };
  handleLogin = async e => {
    e.preventDefault();
    var username = document.getElementById("unameL").value;
    var password = document.getElementById("pwordL").value;
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "username": username,
        "password": password,
      })
      
    });
    const body = await response.text();
    
    this.setState({ responseToPost: body });
    //body is the response from the server after receiving the login information
    //we can use this for authenticating users (cookie or something)
    console.info(this.state.responseToPost);

  };

  handleRegister = async e => {
    e.preventDefault();
    var username = document.getElementById("unameR").value;
    var password = document.getElementById("pwordR").value;
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "username": username,
        "password": password,
      })
      
    });
    const body = await response.text();
    
    this.setState({ responseToPost: body });
    //body is the response from the server after receiving the registration information
    //we can use this for authenticating users (cookie or something)
    console.info(this.state.responseToPost);

  };
  
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
                      <form onSubmit={this.handleLogin}>
                        <h4>Username:</h4>
                        <input type="text" placeholder="Enter Username" id="unameL" required></input>
                        <h4>Password:</h4>
                        <input type="password" placeholder="Enter Password" id="pwordL" required></input>
                        <button type="submit" id="loginButton" onClick={this.handleLogin}>Log in</button>
                      </form>
                        <Button><Link to="/">Back</Link></Button>
                      </Route>
                      <Route path="/register">
                        
                      <form onSubmit={this.handleRegister}>
                        <h4>Username:</h4>
                        <input type="text" placeholder="Enter Username" id="unameR" required></input>
                        <h4>Password:</h4>
                        <input type="password" placeholder="Enter Password" id="pwordR" required></input>
                        <button type="submit" id="registerButton" onClick={this.handleRegister}>Register</button>
                      </form>
                        
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