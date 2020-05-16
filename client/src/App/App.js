import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";

// Login and Register Screens
import LoginScreen from '../Screens/LoginRegister/LoginScreen.js';
import RegisterChoice from '../Screens/LoginRegister/RegisterChoice.js';
import RegisterStudent from '../Screens/LoginRegister/RegisterStudent.js';
import RegisterTeacher from '../Screens/LoginRegister/RegisterTeacher.js';

// Student Screens
import LessonMenu from '../Screens/StudentView/LessonMenu.js'
import Grades from '../Screens/StudentView/Grades.js'
import LessonScreen from '../Screens/StudentView/LessonScreen.js'

// Teacher Screens
import ManageAllStudents from '../Screens/TeacherView/ManageAllStudents.js';
import ManageStudent from '../Screens/TeacherView/ManageStudent.js';
import ManageAllLessons from '../Screens/TeacherView/ManageAllLessons.js';
import ManageLesson from '../Screens/TeacherView/ManageLesson.js';

// CSS files
import '../CSS_files/App.css';
import '../CSS_files/Body.css';
import "../CSS_files/header_footer.css"
import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";

// Token Dependent files
import HomePath from './HomePath.js';
import ProtectedRoute from './ProtectedRoute.js';
import Header from '../header_footer/Header.js';

// For checking token
const jwt = require('jsonwebtoken');
const secret = "this is temporary";

class App extends Component {
  state = {
    loggedIn: "",
  };

  componentDidMount = () => {
    this.checkTokenRoute();
  }

  checkTokenRoute = () => {
    console.log("checking token");
    var token = localStorage.getItem('nccjwt');
    if (!token) {
      console.log("ctr: No Token");
      return "none";
    }
    else {
      jwt.verify(token, secret, (err, decoded) => {
        var loggedIn = "none";
        if (err) { loggedIn = "none"; }
        // Teacher is logged in
        else if (Boolean(decoded.teacher)) { loggedIn = "teacher"; }
        // Student is logged in
        else { loggedIn = "student"; }
        console.log("ctr: " + loggedIn);
        return loggedIn;
      });
    }
  }

  render() {
    return (
      <div className="App">
        <Header studentLoggedIn={this.state.loggedIn === "student"}
          teacherLoggedIn={this.state.loggedIn === "teacher"} />
        <Router >
          {/* This component handles conditional rendering of different home
              screens based on who is logged in. TeacherHome for teacher,
              HomeScreen for student, LoginMenu for none */}
          <Route exact path="/" component={HomePath} />

          {/* The components below are accessible to users that have not logged in*/}
          <Route exact path="/Register" component={RegisterChoice} />
          <Route exact path="/Register/Student" component={RegisterStudent} />
          <Route exact path="/Register/Teacher" component={RegisterTeacher} />
          <ProtectedRoute exact path="/login" component={LoginScreen}
            requiredUser="none" secret={secret} />

          {/* The components below should only be accessible for logged in students */}
          <ProtectedRoute exact path="/LessonMenu" component={LessonMenu}
            requiredUser="student" secret={secret} />
          <ProtectedRoute exact path="/Grades" component={Grades}
            requiredUser="student" secret={secret} />
          <ProtectedRoute path="/Lesson/:lessonID" component={LessonScreen}
            requiredUser="student" secret={secret} />

          {/* The components below should only be accessible for logged in teachers */}
          <ProtectedRoute exact path="/ManageStudents" component={ManageAllStudents}
            requiredUser="teacher" secret={secret} />
          <ProtectedRoute path="/ManageStudents/:username" component={ManageStudent} 
            requiredUser="teacher" secret={secret} />
          <ProtectedRoute exact path="/ManageLessons" component={ManageAllLessons}
            requiredUser="teacher" secret={secret} />
          <ProtectedRoute path="/ManageLessons/:lessonID" component={ManageLesson}
            requiredUser="teacher" secret={secret} />
        </Router>
      </div>
    );
  }
}

export default App;
