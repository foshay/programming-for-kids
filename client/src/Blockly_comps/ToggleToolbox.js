import React, { Component } from 'react';
import { Icon } from '@blueprintjs/core';

class ToggleToolbox extends Component {
    state={
        toolboxShown: true,
    }

    toggleToolbox = () => {
        this.setState({ toolboxShown: !this.state.toolboxShown });
        var array = document.getElementsByClassName("blocklyToolboxDiv");
        // getElementsByClassName returns an array, so we must loop through it
        for (let item of array) {
            // this hides/shows the toolbox
            item.style["display"] = this.state.toolboxShown ? "none" : "block";
        }
        // Must hide blocklyFlyout as well in case the student clicked on a category
        array = document.getElementsByClassName("blocklyFlyout");
        for (let item of array) {
            // this hides/shows the toolbox flyouts
            item.style["display"] = this.state.toolboxShown ? "none" : "block";
        }
    }

    render() {
        return (
            <div>
                <button
                    className={"toolbox-toggle-button"}
                    icon={this.state.toolboxShown ? "menu-closed" : "menu-open"}
                    onClick={this.toggleToolbox}
                >
                    <Icon icon={this.state.toolboxShown ? "menu-closed" : "menu-open"} />
                </button>
            </div>
        );
    }
}

export default ToggleToolbox;