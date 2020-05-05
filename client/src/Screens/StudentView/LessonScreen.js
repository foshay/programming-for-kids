import React, { Component } from 'react';
import BlocklyComp from '../../Blockly_comps/BlocklyComp.js'

class LessonScreen extends Component {
    state = {
        question: "[Loading]",
        hint: "[Loading]",
        answer: "[Loading]",
        initialXml: "",
    }

    getLesson = async () => {
        const string = this.props.match.params.lessonID;
        console.log("String: " + string);
        return fetch('/api/lesson/' + string)
        .then(response =>{
            return response.json();
        })
        .then(json =>{
            this.setState({
                question: json.data.question,
                hint: json.data.hint,
                answer: json.data.answer,
                initialXml: json.data.xml
            });
        });
    }

    componentDidMount(){
        this.getLesson();
    }

    render(){
        return(
            <div className="BodyMenu-Lesson">
                <h3>Goal: {this.state.question}</h3>
                <h3>Hint: {this.state.hint}</h3>
                <BlocklyComp
                    lessonID={this.props.match.params.lessonID}
                    initialXml={this.state.initialXml}
                />
                <h3>Answer: {this.state.answer}</h3>
            </div>
        )
    }
}

export default LessonScreen
