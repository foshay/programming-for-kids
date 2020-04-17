import React, { Component } from 'react';
import BlocklyComp from '../Blockly_comps/BlocklyComp.js'

class LessonTemp extends Component {
    state = {
        question: "[Loading]",
        hint: "[Loading]",
        answer: "[Loading]",
    }

    getLesson = async () => {
        const string = this.props.lessonID;
        console.log("String: " + string);
        return fetch(string)
        .then(response =>{
            return response.json();
        })
        .then(json =>{
            this.setState({
                question: json.data.question,
                hint: json.data.hint,
                answer: json.data.answer
            });
        });
    }

    componentDidMount(){
        console.log("props.history = " + this.props.lessonID);
        this.getLesson();
    }

    render(){
        return(
            <div>
                <h3>Goal: {this.state.question}</h3>
                <h3>Hint: {this.state.hint}</h3>
                <BlocklyComp
                    lessonID={this.props.lessonID}
                />
                <h3>Answer: {this.state.answer}</h3>
            </div>
        )
    }
}

export default LessonTemp
