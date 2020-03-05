import React, { Component } from 'react';
import {BrowserRouter as Router,  Route, Switch, Link} from "react-router-dom";
import { Button } from "@blueprintjs/core";
import Header from '../header_footer/Header.js'
import Footer from '../header_footer/Footer.js'
import HomeScreen from '../Menus/HomeScreen.js'
import '../CSS_files/App.css';
import '../CSS_files/Body.css';

import "../../../node_modules/normalize.css";
import "../../../node_modules/@blueprintjs/core/lib/css/blueprint.css";
import "../../../node_modules/@blueprintjs/icons/lib/css/blueprint-icons.css";

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
    
    //this.setState({ responseToPost: body });
    //body is the response from the server after receiving the registration information
    //we can use this for authenticating users (cookie or something)
    
    if (body == 'Failure') {
      alert("Username taken");
      console.info("Taken: " + body);
    } else {
      console.info("Created " + body);
      alert("User created");
    }

  };
  
render() {
    return (
      <div>
        
        <Header>
          <Header />
        </Header>
        <Router>
            <main className="BodyMenu">
                {/* <h1>Button component log-in</h1> */}
                    {/* <Button><Link to="/login">Log in</Link></Button>
                    <Divider /> */}

                    <Switch>
                      <Route path="/login">
                        <form onSubmit={this.handleLogin}>
                          <h4>Username:</h4>
                          <input type="text" placeholder="Enter Username" id="unameL" required></input>
                          <h4>Password:</h4>
                          <input type="password" placeholder="Enter Password" id="pwordL" required></input>
                          <ul><Button type="submit" id="loginButton" class="bp3-button bp3-icon-layout-log-in" intent="success" icon="log-in" text="Log In" onClick={this.handleLogin} /></ul>
                        </form>
                          <ul><Link to="/"><Button type="button" class="bp3-button bp3-icon-layout-small-cross" intent="warning" icon="small-cross" text="Back" /></Link></ul>
                      </Route>
                      
                      <Route path="/register"> 
                        <form onSubmit={this.handleRegister}>
                          <h4>Username:</h4>
                          <input type="text" placeholder="Enter Username" id="unameR" required></input>
                          <h4>Password:</h4>
                          <input type="password" placeholder="Enter Password" id="pwordR" required></input>
                          <ul><Button type="submit" id="registerButton" class="bp3-button bp3-icon-layout-confirm" intent="success" icon="confirm" text="Register" onClick={this.handleRegister} /></ul>
                        </form>
                          <ul><Link to="/"><Button type="button" class="bp3-button bp3-icon-layout-small-cross" intent="warning" icon="small-cross" text="Back" /></Link></ul>
                      </Route>
                      <Route path="/Home" component={HomeScreen}/>
                      <Route path="/">
                        {/* TODO REMOVE THIS TEMPORARY BUTTON */}
                        <Link to="/Home"><Button type="submit" id="homeButton" class="bp3-menu-item bp3-icon-layout-home" icon="home" text="Home" /></Link>
                        <br/>
                        <br/>
                        <Link to="/login"><Button type="submit" id="loginButton" class="bp3-button bp3-icon-layout-log-in bp3-large" icon="log-in" text="Log In" /></Link>
                        <Link to="/register"><Button type="submit" id="registerButton" class="bp3-button bp3-icon-layout-confirm bp3-large" icon="confirm" text="Register" /></Link>
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