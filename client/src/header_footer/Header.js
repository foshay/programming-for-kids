import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
import { AnchorButton, Button, Code, H5, Intent, Switch as bpSwitch,Navbar, Alignment, Menu, MenuDivider, MenuItem, Popover, Position, Classes } from "@blueprintjs/core";

//import HomeScreen from "../Menus/HomeScreen.js"
//import LessonMenu from "../Menus/LessonMenu.js"
import Header_Footer from "../CSS_files/header_footer.css"
import "../../../node_modules/normalize.css";
import "../../../node_modules/@blueprintjs/core/lib/css/blueprint.css";
import "../../../node_modules/@blueprintjs/icons/lib/css/blueprint-icons.css";

class Header extends Component {
    render(){
        const popMenu = (
            <Menu >
                <h6>
                    <ul class="bp3-menu bp3-elevation-1">
                        <li><Link to="/Home"><MenuItem class="bp3-menu-item bp3-icon-layout-home" icon="home" text="Home"/></Link></li>
                        <li><Link to="/LessonMenu"><MenuItem class="bp3-menu-item bp3-icon-layout-book" icon="book" text="Lessons" /></Link></li>
                        <li><Link to="/CardGame"><MenuItem class="bp3-menu-item bp3-icon-layout-ninja" icon="ninja" text="Card Game" /></Link></li>
                        <MenuDivider />
                        <li><MenuItem class="bp3-menu-item bp3-icon-layout-cog" disabled ={true} icon="cog" text="Settings">
                            {/* TODO */}
                            <li><MenuItem class="bp3-menu-item" text="option coming soon"/></li>
                        </MenuItem></li>
                        <MenuDivider />
                        <li><Link to="/"><MenuItem class="bp3-menu-item bp3-icon-layout-log-out" intent="danger" icon="log-out" text="Log-Out" /></Link></li>
                    </ul>
                </h6>
            </Menu>
        );

        return(
            <div className = "Header">
                <h2 className = "Header-Title">App Name</h2>
                {/* <Navbar>
                    <Navbar.Group align={Alignment.LEFT}>
                        <Navbar.Heading>Teach kids code</Navbar.Heading>
                        <Navbar.Divider />
                        <Link to="/Home"><Button className="bp3-minimal" icon="home" text="Home" /></Link>
                        <Link to="/LessonMenu"><Button className="bp3-minimal" icon="book" text="Lessons" /></Link>
                        <Link to="/"><Button className="bp3-minimal" icon="log-out" text="Log-Out" /></Link>
                    </Navbar.Group>
                </Navbar> */}
                {/* <div className = "Header-Hamburger"> */}
                    <Popover content={popMenu} position={Position.LEFT_BOTTOM} className = "Header-Hamburger" >
                        <Button icon="menu" />
                    </Popover>
                {/* </div> */}

        </div>
        )
    }
}

export default Header