import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
import { AnchorButton, Button, Code, H5, Intent, Switch as bpSwitch,Navbar, Alignment } from "@blueprintjs/core";
import HomeScreen from "../Menus/HomeScreen.js"
import LessonMenu from "../Menus/LessonMenu.js"

class Header extends Component {
    render(){
        return(
            <div>
                <Router>
                    {/* <Route exact={true} path="/" component={HomeScreen} />
                    <Route exact={true} path="/LessonMenu" component={LessonMenu} /> */}
                    {/* <Link to="/"><button>Home</button></Link>
                    <Link to="/LessonMenu"><button>Lessons</button></Link> */}

                <Navbar>
                    <Navbar.Group align={Alignment.LEFT}>
                        <Navbar.Heading>Teach kids code</Navbar.Heading>
                        <Navbar.Divider />
                        <Link to="/Home"><Button href="#/Home" className="bp3-minimal" icon="home" text="Home" /></Link>
                        <Link to="/LessonMenu"><Button className="bp3-minimal" icon="book" text="Lessons" /></Link>
                    </Navbar.Group>
                </Navbar>

            </Router>
        </div>
        )
    }
}

export default Header