import React, { Component } from 'react';

// Our components
import BlocklyComp from '../../Blockly_comps/BlocklyComp.js'
import LoadingSymbol from '../../SmallComponents/LoadingSymbol.js';
import { Card, Text } from '@blueprintjs/core';

// Token things
const jwt = require('jsonwebtoken');
const secret = "this is temporary"

// blank usercode xml
const initialXml = '<xml xmlns="https://developers.google.com/blockly/xml"><block type="procedures_defreturn" deletable="false" editable="false" id="XH45#0:M(suDIRq]3O1l" x="550" y="250"><field name="NAME">usercode</field><comment pinned="false" h="80" w="160">The base function block used for grading</comment></block></xml>';

class LessonScreen extends Component {
    state = {
        name: "[Loading]",
        question: "[Loading]",
        hint: "[Loading]",
        answer: "[Loading]",
        progressXml: '',
        isLoading: true,
        username: "",
    }

    componentDidMount(){
        this.getLesson();
    }

    getLesson = async () => {
        var username = '';
        const token = localStorage.getItem('nccjwt');
        const lessonID = this.props.match.params.lessonID;
        console.log("Lesson ID: " + lessonID);

        // Check if anyone is logged in before showing anything
        if (!token) {
            console.log("No Token");
            this.setState({ isLoading: false });
        }
        else {
            // Make sure valid token and get username
            jwt.verify(token, secret, (err, decoded) => {
                if (err) { return; }
                username = decoded.username;
                this.setState({ username });
            });
            // Get lesson info from api
            fetch('/api/studentlesson/' + lessonID + '/' + username)
                .then(response => {
                    // api call is finshed stop showing loading
                    this.setState({ isLoading: false });
                    return response.json();
                })
                .then(json => {
                    console.log(json);
                    this.setState({
                        name: json.data.name,
                        question: json.data.question,
                        hint: json.data.hint,
                        answer: json.data.answer,
                        progressXml: json.data.xml
                    });
                    // If no progress has been made, set the progressXml to the initialXml
                    // initialXml contains just the user code function block
                    if (!json.data.initialXml){
                        this.setState({
                            progressXml: initialXml,
                        })
                    }
                });
        }
    }

    render(){
        if (this.state.isLoading){
            // api call is loading
            return (<LoadingSymbol/>);
        }
        if (this.state.username === ""){
            // no one is logged in
            return (<div/>)
        }
        return (
            <div>
                <div className="Body">
                    <Card>
                        <Text><h1>{this.state.name} </h1> </Text>
                        <Text> {"Goal: " + this.state.question} </Text>
                        {"Hint: " + this.state.hint}
                    </Card>
                    <br />
                </div>
                <BlocklyComp
                    lessonID={this.props.match.params.lessonID}
                    initialXml={this.state.progressXml}
                />
                {/* <h3>Expected Answer: {this.state.answer}</h3> */}
            </div>
        );
    }
}

export default LessonScreen