import React, { Component } from 'react';
import {Route, Redirect, withRouter} from "react-router-dom";
const jwt = require('jsonwebtoken');

class ProtectedRoute extends Component {
    checkTokenRoute = () => {
        var secret = this.props.secret;
        console.log("checking token");
        var token = localStorage.getItem('nccjwt');
        var loggedIn = '';
        if (!token) {
            console.log("ctr: No Token");
            loggedIn = "none";
        }
        else {
            jwt.verify(token, secret, (err, decoded) => {
                if (err) { loggedIn = "none"; }
                // Teacher is logged in
                else if (Boolean(decoded.teacher)) { loggedIn = "teacher"; }
                // Student is logged in
                else { loggedIn = "student"; }
                console.log("ctr: " + loggedIn);
            });
        }
        return loggedIn;
    }

    render() {
        var Comp = this.props.component;
        var requiredUser = this.props.requiredUser;
        var path = this.props.path;
        var user = this.checkTokenRoute();
        var exact = this.props.exact;

        var correctUser = (user === requiredUser);
        console.log ("PR cor " + correctUser);
        if (user === '') { return( <div />); }
        else {
            return (
                <Route
                    path={path}
                    exact={exact}
                    {...this.props.params}
                    render={(props) => {
                        return correctUser ? (<Comp {...props} />) : (
                            <Redirect to={{
                                pathname: "/",
                                state: {
                                    prevLocation: path,
                                    error: "You need to login first!",
                                }}}
                            />
                        );
                    }}
                />
            );
        }
    }
}

export default withRouter(ProtectedRoute);