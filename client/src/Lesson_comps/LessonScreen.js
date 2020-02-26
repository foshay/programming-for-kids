import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
import { AnchorButton, Button, Code, H5, Intent, Switch as bpSwitch,Navbar, Alignment, Menu, MenuDivider, MenuItem, Popover, Position, Classes } from "@blueprintjs/core";
import Header from '../header_footer/Header.js'
import Footer from '../header_footer/Footer.js'
import BlocklyComp from '../Blockly_comps/BlocklyComp.js'
import LessonTemp from "./LessonTemplate.js"

class LessonScreen extends Component {

    render(){
        return(
            <div>
                <Header />
                    <LessonTemp change={{
                     question:"real Question",
                     blockly: <BlocklyComp />,
                     hints: "real Hints",
                     answer: "real Answerr"}}/>
                <Footer />
            </div>
        )
    }
}

export default LessonScreen