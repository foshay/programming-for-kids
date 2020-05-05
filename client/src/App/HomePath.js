import React, { Component } from 'react';

// Home screens
import TeacherHome from '../Screens/TeacherView/TeacherHome.js';
import HomeScreen from '../Screens/StudentView/HomeScreen.js'
import LoginMenu from '../Screens/LoginRegister/LoginMenu.js'

// Token checking
const jwt = require('jsonwebtoken');
const secret = "this is temporary";

class HomePath extends Component{
    state ={
        loggedIn: "",
    }

    componentDidMount() {
        // This component needs to check the token
        // because it renders different home components
        // conditionally based on the token
        var token = localStorage.getItem('nccjwt');
        if (token) {
            this.setState({ loggedIn: "none" });
        }
        jwt.verify(token, secret, (err, decoded) => {
            var loggedIn = "none";
            if (err) { loggedIn = "none"; }
            // Teacher is logged in
            else if (Boolean(decoded.teacher)) {
                loggedIn = "teacher";
            }
            // Student is logged in
            else { loggedIn = "student"; }
            this.setState({ loggedIn: loggedIn });
        });
    }
    
    render () {
        var loggedIn = this.state.loggedIn;
        if (loggedIn === "") {
            return (<div/>);
        }
        if (loggedIn === "student") {
            console.log("/ Student logged in");
            return (<HomeScreen/>);
        }
        else if (loggedIn === "teacher") {
            console.log("/ Teacher logged in");
            return (<TeacherHome/>);
        }
        else {
            console.log("/ Not logged in");
            return (<LoginMenu/>);
        }
    }
}

export default HomePath