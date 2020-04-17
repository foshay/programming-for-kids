import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";
//import logo from './logo.svg';
//import { Text, View, StyleSheet } from 'react-native';
//import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
//import Header from '../header_footer/Header.js'
//import Footer from '../header_footer/Footer.js'
//import BlocklyComp from '../BlocklyComp.js'
//import { AnchorButton, Button, Code, H5, Intent, Switch as bpSwitch,Navbar, Alignment } from "@blueprintjs/core";
import Header from '../header_footer/Header.js';
import Footer from '../header_footer/Footer.js';
import LoginMenu from '../Menus/LoginMenu.js'
import LoginScreen from '../Menus/LoginScreen.js';
import RegisterStudent from '../Menus/RegisterStudent.js';
import RegisterTeacher from '../Menus/RegisterTeacher.js';
import HomeScreen from '../Menus/HomeScreen.js'
import LessonMenu from '../Menus/LessonMenu.js'
import LessonScreen from '../Lesson_comps/LessonScreen.js'
import CardGame from '../Menus/CardGameMenu.js'
//import LessonTemplate from '../Lesson_comps/LessonTemplate.js'
import '../CSS_files/App.css';
import RegisterChoice from '../Menus/RegisterChoice.js';
import TeacherHome from '../Menus/TeacherView/TeacherHome.js';
import ManageAllStudents from '../Menus/TeacherView/ManageAllStudents.js';
import ManageStudent from '../Menus/TeacherView/ManageStudent.js';
import ManageAllLessons from '../Menus/TeacherView/ManageAllLessons.js';
import ManageLesson from '../Menus/TeacherView/ManageLesson.js';
import NewLesson from '../Menus/TeacherView/NewLesson.js';

class App extends Component {
  state = {
    studentLoggedIn: false,
    teacherLoggedIn: false,
  };
  // need to add a handle login function
  // this needs to get whether the user successfully logged in
  // from LoginScreen

  // logInTeacher = () => {
  //   this.setState({teacherLoggedIn: true});
  // }

  // logInStudent = () => {
  //   this.setState({studentLoggedIn: true});
  // }

  componentDidMount = () => {
    // TODO figure out if this is where to check JWT token
  }


  render() {
    return (
      <div className="App">
        <Header studentLoggedIn={this.state.studentLoggedIn} teacherLoggedIn={this.state.teacherLoggedIn}/>

        <Router >
          {/* The components below are accessible to users that have not logged in*/}
          <Route exact path="/" component={LoginMenu} />
          <Route exact path="/Register" component={RegisterChoice} />
          <Route exact path="/Register/Student" component={RegisterStudent} />
          <Route exact path="/Register/Teacher" component={RegisterTeacher} />
          <Route exact path="/login" component={LoginScreen} />
          {/* <Route exact path="/Login" 
            render = {(props) => <LoginScreen 
              // the two functions below run in a successful login
              logInStudent={this.logInStudent}
              logInTeacher={this.logInTeacher}
            />}
          /> */}
          {/* <Route exact path="/Login" component={<LoginScreen
            // the two functions below run in a successful login
            logInStudent={() => this.logInStudent}
            logInTeacher={() => this.logInTeacher}
          />}
          /> */}
          {/* The components below should only be accessible for logged in students*/}
          <ProtectedRoute exact path="/Home" loggedIn={this.state.studentLoggedIn} component={HomeScreen} />
          {/* <Route exact path="/Home" component={HomeScreen} /> */}
          <ProtectedRoute exact path="/LessonMenu" loggedIn={this.state.studentLoggedIn} component={LessonMenu} />
          {/* <Route exact path="/LessonMenu" component={LessonMenu} /> */}
          <ProtectedRoute exact path="/CardGame" loggedIn={this.state.studentLoggedIn} component={CardGame} />
          {/* <Route exact path="/CardGame" component={CardGame} /> */}
          <ProtectedRoute path='/Lesson/:lessonID' loggedIn={this.state.studentLoggedIn} component={LessonScreen} />
          {/* <Route path='/Lesson/:lessonID' component={LessonScreen} /> */}

          {/* The components below should only be accessible for logged in teachers*/}
          <ProtectedRoute exact path='/teacherHome' loggedIn={this.state.teacherLoggedIn} component={TeacherHome} />

          {/* should be a list of all students with their overall grades */}
          {/* should have */}
          {/* button for delete student */}
          {/* student's overall grade */}
          {/* student's grade for each assignment */}
          <ProtectedRoute exact path='/manageStudents' loggedIn={this.state.teacherLoggedIn} component={ManageAllStudents} />

          <ProtectedRoute path='/manageStudents/:studentID' loggedIn={this.state.teacherLoggedIn} component={ManageStudent} />

          {/* teacher can click individual lessons */}
          {/* teacher can make new lesson */}
          <ProtectedRoute exact path='/manageLessons' loggedIn={this.state.teacherLoggedIn} component={ManageAllLessons} />

          {/* should be able to edit all parts of lesson, save, or delete */}
          <ProtectedRoute path='/manageLessons/:lessonID' loggedIn={this.state.teacherLoggedIn} component={ManageLesson} />

          <ProtectedRoute exact path='/newLesson' loggedIn={this.state.teacherLoggedIn} component={NewLesson} />


        </Router>

        <Footer />
      </div>
    );
  }
}

// This component was made with code from a tutorial
// https://codedaily.io/tutorials/49/Create-a-ProtectedRoute-for-Logged-In-Users-with-Route-Redirect-and-a-Render-Prop-in-React-Router
const ProtectedRoute = ({ component: Comp, loggedIn, path, ...params }) => {
  return (
    <Route
      path={path}
      {...params}
      render={(props) => {
        return loggedIn ? (
          <Comp {...props} />
        ) : (
            // When the user tries to go to a page that they should not be able
            // to see unless logged in, they are redirected to "/"
            <Redirect
              to={{
                pathname: "/",
                // Not sure how to access this state
                state: {
                  prevLocation: path,
                  error: "You need to login first!",
                },
              }}
            />
          );
      }}
    />
  );
};


export default App;