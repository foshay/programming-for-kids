import React, { Component } from 'react';
import BlocklyComp from '../../Blockly_comps/BlocklyComp.js'
import BounceLoader from 'react-spinners/BounceLoader';
import LoadingSymbol from '../../SmallComponents/LoadingSymbol.js';

class LessonScreen extends Component {
    state = {
        question: "[Loading]",
        hint: "[Loading]",
        answer: "[Loading]",
        isLoading: true,
    }

    getLesson = async () => {
        const string = this.props.match.params.lessonID;
        console.log("String: " + string);
        return fetch('/api/lesson/' + string)
        .then(response =>{
            this.setState({isLoading: false});
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
        this.getLesson();
    }

    render(){
        if (this.state.isLoading){
            return (<LoadingSymbol/>);
        }
        else {
            return (
                <div className="BodyMenu-Lesson">
                    <h3>Goal: {this.state.question}</h3>
                    <h3>Hint: {this.state.hint}</h3>
                    <BlocklyComp
                        lessonID={this.props.match.params.lessonID}
                    />
                    <h3>Answer: {this.state.answer}</h3>
                </div>
            )
        }
    }
}

export default LessonScreen
