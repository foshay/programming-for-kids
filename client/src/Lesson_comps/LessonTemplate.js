import React, { Component } from 'react';
//import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
//import { AnchorButton, Button, Code, H5, Intent, Switch as bpSwitch,Navbar, Alignment, Menu, MenuDivider, MenuItem, Popover, Position, Classes } from "@blueprintjs/core";
//import Header from '../header_footer/Header.js'
//import Footer from '../header_footer/Footer.js'
import BlocklyComp from '../Blockly_comps/BlocklyComp.js'

class LessonTemp extends Component {
    // constructor(){
    //     super(props);
    state = {
        question: "question temp", 
        blockly: <BlocklyComp lessonID={this.props.lessonID}/>,
        hints: "HintTemp",
        answer: "AnswerTemp",
    }
    // }

    render(){
        return(
            <div>
                <h3>Question: {this.state.question}</h3>
                <h3>Lesson ID (temporarily displayed): {this.props.lessonID}</h3>
                <h3>{this.state.blockly}</h3>
                <h3>Hints: {this.state.hints}</h3>
                <h3>Answer: {this.state.answer}</h3>
            </div>
        )
    }
}

// function LessonTemp (props)
// {
//         return(
//             <div>
//                 <h3>Question: {props.change.question}</h3>
//                 <h3>{props.change.blockly}</h3>
//                 <h3>Hints: {props.change.hints}</h3>
//                 <h3>Answer: {props.change.answer}</h3>
//             </div>
//         )
// }

export default LessonTemp