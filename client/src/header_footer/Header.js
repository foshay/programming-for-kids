import React, { Component } from 'react';
import { Button, Menu, MenuDivider, MenuItem, Popover, Position } from "@blueprintjs/core";

const jwt = require('jsonwebtoken');
const secret = "this is temporary";

class Header extends Component {
    state ={
        studentLoggedIn: false,
        teacherLoggedIn: false,
    }

    logOut = () => {
        // TODO implement logging out
        // alert("Logged out of account");
        localStorage.setItem('nccjwt', '');
    }

    checkTokenMenu = () => {
        var token = localStorage.getItem('nccjwt');
        if (!token) {
            this.setState({ studentLoggedIn: false, teacherLoggedIn: false });
        }
        else {
            jwt.verify(token, secret, (err, decoded) => {
                if (err) {
                    console.log("Error: " + err);
                    return false;
                }
                //Teacher is logging in
                else if (decoded.teacher == true) {
                    console.log("Teacher logged in");
                    this.setState({ teacherLoggedIn: true });
                }
                else {
                    console.log("Student logged in");
                    //Student is logging in
                    this.setState({ studentLoggedIn: true });
                    // console.log("In else: " + this.state.studentLoggedIn);
                }
            });
        }
    }

    render() {
        const student = this.state.studentLoggedIn;
        const teacher = this.state.teacherLoggedIn;
        const loggedOut = !(teacher||student);
        const popMenu = (
            <Menu >
                <MenuItem icon="home"
                    text="Home"
                    href={teacher ? "/TeacherHome" : "/Home"}
                    disabled={loggedOut}
                />
                <MenuItem icon="book"
                    text={teacher ? "Manage Lessons" : "Lessons"}
                    href={teacher ? "/ManageLessons" : "/LessonMenu"}
                    disabled={loggedOut}
                />
                <MenuItem
                    icon={teacher ? "clipboard" : "ninja"}
                    text={teacher ? "Manage Students" : "Card Game"}
                    href={teacher ? "/ManageStudents" : "/CardGame"}
                    disabled={loggedOut}
                />
                <MenuDivider />
                <MenuItem disabled icon="cog" text="Settings">
                    {/* TODO */}
                    <MenuItem text="option coming soon" />
                </MenuItem>
                <MenuDivider />
                <MenuItem
                    intent={loggedOut ? "success" : "danger"}
                    icon={loggedOut ? "log-in" : "log-out"}
                    text={loggedOut ? "Log In" : "Log Out"}
                    onClick={() => loggedOut ? this.logIn() : this.logOut()}
                    href={loggedOut ? "/login" : "/"}
                />
            </Menu>
        );

        return(
            <div className="Header">
                <h2 className="Header-Title">Native Code Creator</h2>
                <div className="Header-Hamburger">
                    <Popover content={popMenu} position={Position.LEFT_TOP} >
                        <Button onClick={()=>{ this.checkTokenMenu()}}icon="menu" />
                    </Popover>
                </div>
            </div>
        )
    }
}

export default Header