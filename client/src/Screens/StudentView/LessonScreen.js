import React, { Component } from 'react';

// Our components
import BlocklyComp from '../../Blockly_comps/BlocklyComp.js'
import LoadingSymbol from '../../SmallComponents/LoadingSymbol.js';

// Token things
const jwt = require('jsonwebtoken');
const secret = "this is temporary"

class LessonScreen extends Component {
    state = {
        question: "[Loading]",
        hint: "[Loading]",
        answer: "[Loading]",
        initialXml: "",
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
                        question: json.data.question,
                        hint: json.data.hint,
                        answer: json.data.answer,
                        initialXml: json.data.xml
                    });
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
            <div className="BodyMenu-Lesson">
                <h3>Goal: {this.state.question}</h3>
                <h3>Hint: {this.state.hint}</h3>
                <BlocklyComp
                    lessonID={this.props.match.params.lessonID}
                    initialXml={this.state.initialXml}
                    username={this.state.username}
                />
                <h3>Expected Answer: {this.state.answer}</h3>
            </div>
        );
    }
}

export default LessonScreen
