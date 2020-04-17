import React, { Component } from 'react';
import { Button, Menu, MenuDivider, MenuItem, Popover, Position } from "@blueprintjs/core";

import "../../../node_modules/normalize.css";
import "../../../node_modules/@blueprintjs/core/lib/css/blueprint.css";
import "../../../node_modules/@blueprintjs/icons/lib/css/blueprint-icons.css";

class Header extends Component {
    logOut = () => {
        // TODO implement logging out
        alert("Logged out of account");
    }

    logIn = () => {

    }

    render() {
        const student = this.props.studentLoggedIn;
        const teacher = this.props.teacherLoggedIn;
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
                        <Button icon="menu" />
                    </Popover>
                </div>
            </div>
        )
    }
}

export default Header