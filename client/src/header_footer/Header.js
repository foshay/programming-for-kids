import React, { Component } from 'react';
import { Button, Menu, MenuDivider, MenuItem, Popover, Position } from "@blueprintjs/core";

//import HomeScreen from "../Menus/HomeScreen.js"
//import LessonMenu from "../Menus/LessonMenu.js"
import "../../../node_modules/normalize.css";
import "../../../node_modules/@blueprintjs/core/lib/css/blueprint.css";
import "../../../node_modules/@blueprintjs/icons/lib/css/blueprint-icons.css";

class Header extends Component {
    render(){
        const popMenu = (
            <Menu >
                <h6>
                    <ul class="bp3-menu bp3-elevation-1">
                        <li><MenuItem
                            class="bp3-menu-item bp3-icon-layout-home"
                            icon="home" text="Home" href="/Home" />
                        </li>
                        <li><MenuItem
                            class="bp3-menu-item bp3-icon-layout-book"
                            icon="book" text="Lessons" href="/LessonMenu" />
                        </li>
                        <li><MenuItem
                            class="bp3-menu-item bp3-icon-layout-ninja"
                            icon="ninja" text="Card Game" href="CardGame" />
                        </li>
                        <MenuDivider />
                        <li><MenuItem
                            class="bp3-menu-item bp3-icon-layout-cog"
                            disabled={true} icon="cog" text="Settings">
                            {/* TODO */}
                            <li><MenuItem class="bp3-menu-item" text="option coming soon"/></li>
                        </MenuItem></li>
                        <MenuDivider />
                        <li><MenuItem
                            class="bp3-menu-item bp3-icon-layout-log-out"
                            intent="danger" icon="log-out" text="Log-Out" href="/" />
                        </li>
                    </ul>
                </h6>
            </Menu>
        );

        return(
            <div className = "Header">
                <h2 className = "Header-Title">Native Code Creator</h2>
                {/* <Navbar>
                    <Navbar.Group align={Alignment.LEFT}>
                        <Navbar.Heading>Teach kids code</Navbar.Heading>
                        <Navbar.Divider />
                        <Link to="/Home"><Button className="bp3-minimal" icon="home" text="Home" /></Link>
                        <Link to="/LessonMenu"><Button className="bp3-minimal" icon="book" text="Lessons" /></Link>
                        <Link to="/"><Button className="bp3-minimal" icon="log-out" text="Log-Out" /></Link>
                    </Navbar.Group>
                </Navbar> */}
                <div className = "Header-Hamburger">
                    <Popover content={popMenu} position={Position.LEFT_TOP} >
                        <Button icon="menu" />
                    </Popover>
                </div>

        </div>
        )
    }
}

export default Header