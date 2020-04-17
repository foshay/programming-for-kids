import React, { Component } from 'react';
import { Button, Menu, MenuDivider, MenuItem, Popover, Position } from "@blueprintjs/core";

import "../../../node_modules/normalize.css";
import "../../../node_modules/@blueprintjs/core/lib/css/blueprint.css";
import "../../../node_modules/@blueprintjs/icons/lib/css/blueprint-icons.css";

class Header extends Component {
    // TODO add functionality so that user that has not logged in cannot press these buttons
    render(){
        const popMenu = (
            <Menu >
                <MenuItem icon="home" text="Home" href="/Home" />
                <MenuItem icon="book" text="Lessons" href="/LessonMenu" />
                <MenuItem icon="ninja" text="Card Game" href="CardGame" />
                <MenuDivider />
                <MenuItem disabled icon="cog" text="Settings">
                    {/* TODO */}
                    <MenuItem class="bp3-menu-item" text="option coming soon" />
                </MenuItem>
                <MenuDivider />
                <MenuItem intent="danger" icon="log-out" text="Log-Out" href="/" />
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