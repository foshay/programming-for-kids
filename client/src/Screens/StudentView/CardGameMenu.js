import React, { Component } from 'react';

class CardGameMenu extends Component {

//   state = {
//     lessonIDs: [],
//     lessonNames: []
//   }

//   componentDidMount = () => {
//     // This is where the arrays would be set from the database
//     this.setState({
//       lessonIDs: [
//         'lesson_1',
//         'lesson_2'
//       ]
//     });

//     this.setState({
//       lessonNames: [
//         'Lesson 1',
//         'Lesson 2'
//       ]
//     });
//   }
//   goToLesson = (lessonID) => {
//     // changes the url when a button is clicked
//     this.props.history.push(`/Lesson/${lessonID}`);
//   }

//   render() {
//     return (
//       <div className="App">

//         <Header />

//         <h1>Component LessonTemplate</h1>

//         <div class="bp3-button-group bp3-large bp3-vertical">
//           { /* This prints out a bunch of buttons based on arrays 
//                 These arrays should be taken from the database*/}
//           {this.state.lessonIDs.map((value, index) => {
//             return (
//               <div >
//                 <Button id={`lesson_button`} type="button" class="bp3-button bp3-icon-code-block" icon="code-block" text={this.state.lessonNames[index]} onClick={() => this.goToLesson(value)} />
//                 <br />
//               </div>
//             )
//             // return <Button id={`lesson_button`} text={this.state.lessonNames[index]} onClick={() => this.goToLesson(value)} />
//           })}
//         </div>

//         <Footer />

//       </div>
//     );
//   }

    render() {
        return (
            <main className="Body">
                <h1>Card Game Place Holder</h1>
            </main>
        )
    }
}

export default CardGameMenu;