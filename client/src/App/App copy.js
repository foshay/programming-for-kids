import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";

import Header from '../header_footer/Header.js';

// Login and Register Screens
import LoginMenu from '../Screens/LoginRegister/LoginMenu.js'
import LoginScreen from '../Screens/LoginRegister/LoginScreen.js';
import RegisterChoice from '../Screens/LoginRegister/RegisterChoice.js';
import RegisterStudent from '../Screens/LoginRegister/RegisterStudent.js';
import RegisterTeacher from '../Screens/LoginRegister/RegisterTeacher.js';

// Student Screens
import HomeScreen from '../Screens/StudentView/HomeScreen.js'
import LessonMenu from '../Screens/StudentView/LessonMenu.js'
import CardGame from '../Screens/StudentView/CardGameMenu.js'
import LessonScreen from '../Screens/StudentView/LessonScreen.js'

// Teacher Screens
import TeacherHome from '../Screens/TeacherView/TeacherHome.js';
import ManageAllStudents from '../Screens/TeacherView/ManageAllStudents.js';
import ManageStudent from '../Screens/TeacherView/ManageStudent.js';
import ManageAllLessons from '../Screens/TeacherView/ManageAllLessons.js';
import ManageLesson from '../Screens/TeacherView/ManageLesson.js';
import NewLesson from '../Screens/TeacherView/NewLesson.js';

// CSS files
import '../CSS_files/App.css';
import '../CSS_files/Body.css';
import "../CSS_files/header_footer.css"
import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";

const jwt = require('jsonwebtoken');
const secret = "this is temporary";

class App extends Component {
  state = { 
    loggedIn: '',
  };

  componentDidMount = () => {
    this.checkTokenRoute();
  }
  
  componentWillReceiveProps = () => {
    this.checkTokenRoute();
  }

  checkTokenRoute = () => {
    var token = localStorage.getItem('nccjwt');
    console.log(token);
    if (!token) {
      console.log("CT: No Token");
      this.setState({loggedIn: "none"});
    }
    else {
      jwt.verify(token, secret, (err, decoded) => {
        if (err) {
          console.log("Error: " + err);
          return false;
        }
        // Teacher is logged in
        else if (Boolean(decoded.teacher) === true) {
          console.log("Teacher logged in");
          this.setState({loggedIn: "teacher"});
          // if (userType === "teacher"){
          //   return true;
          // }
        }
        // Student is logged in
        else {
          console.log("Student logged in");
          this.setState({loggedIn: "student"});
          // if (userType === "student"){
          //   return true;
          // }
        }
      });
    }
  }

  render() {
    return (
      <div className="App">
        <Header />
        <AppBody loggedIn={this.state.loggedIn}/>
      </div>
    );
  }
}

// This component was made with code from a tutorial
// https://codedaily.io/tutorials/49/Create-a-ProtectedRoute-for-Logged-In-Users-with-Route-Redirect-and-a-Render-Prop-in-React-Router
const ProtectedRoute = ({ component: Comp, loggedIn, path, ...params }) => {
  // loggedIn ? console.log("PR: logged in") : console.log("PR: not logged in");
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

class AppBody extends Component {
  homeComponent = () => {
    if (this.props.loggedIn === "student"){
      console.log("/ Student logged in");
      return( HomeScreen );
    }
    else if (this.props.loggedIn === "teacher"){
      console.log("/ Teacher logged in");
      return( TeacherHome );
    }
    else {
      console.log("/ Not logged in");
      return( LoginMenu );
    }
  }

  render(){
    if (this.props.loggedIn == ''){
      return (
        <Router>
          <h1>Loading...</h1>
        </Router>
      )
    }
    return (
      <Router >
        {/* The components below are accessible to users that have not logged in*/}
        <Route exact path="/" component={this.homeComponent()} />
        <Route exact path="/Register" component={RegisterChoice} />
        <Route exact path="/Register/Student" component={RegisterStudent} />
        <Route exact path="/Register/Teacher" component={RegisterTeacher} />
        <Route exact path="/login" component={LoginScreen} />

        {/* The components below should only be accessible for logged in students */}
        <ProtectedRoute exact path="/Home"
          loggedIn={this.props.loggedIn === "student"} component={HomeScreen} />
        <ProtectedRoute exact path="/LessonMenu"
          loggedIn={this.props.loggedIn === "student"} component={LessonMenu} />
        <ProtectedRoute exact path="/CardGame"
          loggedIn={this.props.loggedIn === "student"} component={CardGame} />
        <ProtectedRoute path='/Lesson/:lessonID'
          loggedIn={this.props.loggedIn === "student"} component={LessonScreen} />

        {/* The components below should only be accessible for logged in teachers*/}
        <ProtectedRoute exact path='/teacherHome'
          loggedIn={this.props.loggedIn === "teacher"} component={TeacherHome} />
        <ProtectedRoute exact path='/manageStudents'
          loggedIn={this.props.loggedIn === "teacher"} component={ManageAllStudents} />
        <ProtectedRoute path='/manageStudents/:studentID'
          loggedIn={this.props.loggedIn === "teacher"} component={ManageStudent} />
        <ProtectedRoute exact path='/manageLessons'
          loggedIn={this.props.loggedIn === "teacher"} component={ManageAllLessons} />
        <ProtectedRoute path='/manageLessons/:lessonID'
          loggedIn={this.props.loggedIn === "teacher"} component={ManageLesson} />
        <ProtectedRoute exact path='/newLesson'
          loggedIn={this.props.loggedIn === "teacher"} component={NewLesson} />
      </Router>
    );
  }
}


export default App;
