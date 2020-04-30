import React, { Component } from 'react';
import { user } from 'blockly';
import LoginScreen from './LoginRegister/LoginScreen';
import LoginMenu from './LoginRegister/LoginMenu';
import HomeScreen from './StudentView/HomeScreen';
import TeacherHome from './TeacherView/TeacherHome';
const jwt = require('jsonwebtoken');
const secret = "this is temporary";

class Home extends Component {
    checkTokenRoute = () => {
        console.log("checking token");
        var token = localStorage.getItem('nccjwt');
        if (!token) {
            console.log("CT: No Token");
            return "none";
        }
        else {
            console.log("ctr has token");
            jwt.verify(token, secret, (err, decoded) => {
                if (err) {
                    console.log("Error: " + err);
                    return "none";
                }
                // Teacher is logged in
                else if (Boolean(decoded.teacher) === true) {
                    console.log("ctr Teacher");
                    return "teacher";
                }
                // Student is logged in
                else {
                    console.log("ctr Student");
                    return "student";
                }
            });
        }
    }

    render (){
        var userType = this.checkTokenRoute();
        console.log(userType);
        if (userType === "student") {
            return (
                <HomeScreen />
            );
        }
        else if (userType === "teacher") {
            return (
                <TeacherHome />
            );
        }
        else {
            return (
                <LoginMenu />
            );
        }
    }

}

export default Home;