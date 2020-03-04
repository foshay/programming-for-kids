import React, { Component } from 'react';
//import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
//import { AnchorButton, Button, Code, H5, Intent, Switch as bpSwitch,Navbar, Alignment, Menu, MenuDivider, MenuItem, Popover, Position, Classes } from "@blueprintjs/core";
import Header from '../header_footer/Header.js'
import Footer from '../header_footer/Footer.js'
import '../CSS_files/Body.css';
//import BlocklyComp from '../Blockly_comps/BlocklyComp.js'
import LessonTemp from "./LessonTemplate.js"

class LessonScreen extends Component {
    

    componentDidMount(){

    }

    render(){
        return(
            <div>
                <Header />
                    <main className="BodyMenu-Lesson">
                        <LessonTemp 
                        // change={{
                        //  blockly: <BlocklyComp />,
                        //  hints: "real Hints",
                        //  answer: "real Answer"}}
                        // We can get these other things in an api/database call inside the lesson
                        // rather than passing them in
                        lessonID={this.props.match.params.lessonID}
                      />
                    </main>
                <Footer />
            </div>
        )
    }
}

export default LessonScreen