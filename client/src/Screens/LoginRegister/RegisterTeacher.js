import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import RegisterForm from './RegisterForm';

class RegisterTeacher extends Component {
    state = {
        responseToPost: '',
        username: '',
        password: '',
        first_name: '',
        last_name: '',
        otp: '',
        created: false,
    }

    handleRegister = async e => {
        e.preventDefault();
        var username = this.state.username;
        var password = this.state.password;
        var first_name = this.state.first_name;
        var last_name = this.state.last_name;
        var otp = this.state.otp;
        // if (username === '' | password === '' | first_name === '' | last_name === '' | otp === '') {
        if (username === '' | password === '' | first_name === '' | last_name === '') {
            alert("Must fill in all fields to register");
            return;
        }
        // TODO add code to handle the 'teacher code' otp
        fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "username": username,
                "password": password,
                "first_name": first_name,
                "last_name": last_name,
                "user_type": "teacher",
                "otp": otp,
            })
        })
        .then(response => {
            return response.json();
        })
        .then(json => {
            const message = json.message;
            console.info(message);
            if (message === 'Failure') {
                alert("Username taken");
                console.info("Taken: " + username);
            } else if (message === "DB Failure") {
                alert("Issue creating account");
            } else if (message === "Success") {
                console.info("Created " + username);
                alert("User created");
                this.setState({ created: true });
            }
        });
    };

    render = () => {
        if (this.state.created){
            return ( <Redirect to="/login"/>);
        }
        else {
            return (
                <div className="Body">
                    <RegisterForm
                        registerText="Register Teacher"
                        //requireOTP
                        handleRegister={(e) => this.handleRegister(e)}
                        setUsername={(username) => this.setState({ username: username })}
                        setPassword={(password) => this.setState({ password: password })}
                        setFirstName={(first_name) => this.setState({ first_name: first_name })}
                        setLastName={(last_name) => this.setState({ last_name: last_name })}
                        setOTP={(last_name) => this.setState({ last_name: last_name })}
                    />
                </div>
            );
        }
    }
}

export default RegisterTeacher;
