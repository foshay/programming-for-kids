import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
import { AnchorButton, Button, Code, H5, Intent, Switch as bpSwitch,Navbar, Alignment, Menu, MenuDivider, MenuItem, Popover, Position, Classes } from "@blueprintjs/core";
import HomeScreen from "../Menus/HomeScreen.js"
import LessonMenu from "../Menus/LessonMenu.js"

class Header extends Component {
    render(){
        const popMenu = (
            <Menu className={Classes.DARK}>
                <h6>
                    <ul class="bp3-menu bp3-elevation-1">
                        <li><Link to="/Home"><MenuItem class="bp3-menu-item bp3-icon-home" icon="home" text="Home"/></Link></li>
                        <Link to="/LessonMenu"><MenuItem class="bp3-menu-item bp3-icon-book"  icon="book" text="Lessons" /></Link>
                        <MenuDivider />
                        <MenuItem class="bp3-menu-item bp3-icon-cog" icon="cog" text="Settings">
                            {/* TODO */}
                            <MenuItem class="bp3-menu-item" text="option coming soon"/>
                        </MenuItem>
                        <MenuDivider />
                        <Link to="/"><MenuItem class="bp3-menu-item bp3-icon-log-out" icon="log-out" text="Log-Out" /></Link>
                    </ul>
                </h6>
            </Menu>
        );

        return(
            <div>
                {/* <Navbar>
                    <Navbar.Group align={Alignment.LEFT}>
                        <Navbar.Heading>Teach kids code</Navbar.Heading>
                        <Navbar.Divider />
                        <Link to="/Home"><Button className="bp3-minimal" icon="home" text="Home" /></Link>
                        <Link to="/LessonMenu"><Button className="bp3-minimal" icon="book" text="Lessons" /></Link>
                        <Link to="/"><Button className="bp3-minimal" icon="log-out" text="Log-Out" /></Link>
                    </Navbar.Group>
                </Navbar> */}
                <Popover content={popMenu} position={Position.LEFT_TOP} className={Classes.DARK}>
                    <Button icon="menu" />
                </Popover>
        </div>
        )
    }
}

export default Header