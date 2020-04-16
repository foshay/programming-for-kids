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

class App extends Component {
  state = {
    loggedIn: false,
    teacherLoggedIn: false,
  };
  // need to add a handle login function
  // this needs to get whether the user successfully logged in
  // from LoginScreen


  render() {
    return (
      <div className="App">
        <Header loggedIn={this.state.loggedIn} />

        <Router>
          {/* The components below are accessible to users that have not logged in*/}
          <Route exact path="/" component={LoginMenu} />
          <Route exact path="/Register" component={RegisterChoice} />
          <Route exact path="/Register/Student" component={RegisterStudent} />
          <Route exact path="/Register/Teacher" component={RegisterTeacher} />
          <Route exact path="/Login" component={LoginScreen} />

          {/* The components below should only be accessible for logged in students*/}
          <ProtectedRoute exact path="/Home" loggedIn={this.state.loggedIn} component={HomeScreen} />
          {/* <Route exact path="/Home" component={HomeScreen} /> */}
          <ProtectedRoute exact path="/LessonMenu" loggedIn={this.state.loggedIn} component={LessonMenu} />
          {/* <Route exact path="/LessonMenu" component={LessonMenu} /> */}
          <ProtectedRoute exact path="/CardGame" loggedIn={this.state.loggedIn} component={CardGame} />
          {/* <Route exact path="/CardGame" component={CardGame} /> */}
          <ProtectedRoute path='/Lesson/:lessonID' loggedIn={this.state.loggedIn} component={LessonScreen} />
          {/* <Route path='/Lesson/:lessonID' component={LessonScreen} /> */}

          {/* The components below should only be accessible for logged in teachers*/}
          <ProtectedRoute exact path='/teacherHome' loggedIn={this.state.teacherLoggedIn} component={TeacherHome} />

            {/* /teacherHome/managestudents */}
              {/* should be a list of all students with their overall grades */}
              {/* should have */}
                {/* button for delete student */}
                {/* student's overall grade */}
                {/* student's grade for each assignment */}
          <ProtectedRoute exact path='/teacherHome/manageStudents' loggedIn={this.state.teacherLoggedIn} component={ManageAllStudents} />

            {/* /teacherHome/managestudents/:studentID */}
          <ProtectedRoute path='/teacherHome/manageStudents/:studentID' loggedIn={this.state.teacherLoggedIn} component={ManageStudent} />

            {/* /teacherHome/managelessons */}
                {/* teacher can click individual lessons */}
                {/* teacher can make new lesson */}
          <ProtectedRoute exact path='/teacherHome/manageLessons' loggedIn={this.state.teacherLoggedIn} component={ManageAllLessons} />

              {/* /teacherHome/managelessons/:lessonID */}
              {/* should be able to edit all parts of lesson, save, or delete */}
          <ProtectedRoute path='/teacherHome/manageLessons/:lessonID' loggedIn={this.state.teacherLoggedIn} component={ManageLesson} />

              {/* /teacherHome/managelessons/newLesson */}
          <ProtectedRoute exact path='/teacherHome/manageLessons/newLesson' loggedIn={this.state.teacherLoggedIn} component={NewLesson} />

        </Router>

        <Footer />
      </div>
    );
  }
}

// This component was made with code from a tutorial
// https://codedaily.io/tutorials/49/Create-a-ProtectedRoute-for-Logged-In-Users-with-Route-Redirect-and-a-Render-Prop-in-React-Router
const ProtectedRoute = ({ component: Comp, loggedIn, path, ...rest }) => {
  return (
    <Route
      path={path}
      {...rest}
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