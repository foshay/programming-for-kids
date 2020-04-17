import React, { Component } from 'react';
import '../CSS_files/Body.css';
import LessonTemp from "./LessonTemplate.js"

class LessonScreen extends Component {
    componentDidMount(){

    }

    render(){
        return(
            <div>
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
            </div>
        )
    }
}

export default LessonScreen