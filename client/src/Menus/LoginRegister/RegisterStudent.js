import React, { Component } from 'react';
import RegisterForm from './RegisterForm';
import { user } from 'blockly';

class RegisterStudent extends Component {
    state = {
        responseToPost: '',
        username: '',
        password: ''
    }

    handleRegister = async e => {
        e.preventDefault();
        var username = this.state.username;
        var password = this.state.password;
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "username": username,
                "password": password,
            })
        });

        const body = await response.text();

        //this.setState({ responseToPost: body });
        //body is the response from the server after receiving the registration information
        //we can use this for authenticating users (cookie or something)

        if (body == 'Failure') {
            alert("Username taken");
            console.info("Taken: " + body);
        } else if (body == "DB Failure") {
            alert("Issue creating account");
        } else {
            console.info("Created " + body);
            alert("User created");
        }
    };

    render = () => {
        return (
            <div className="Body">
                <RegisterForm
                    registerText="Register Student"
                    handleRegister={(e)=> this.handleRegister(e)}
                    setUsername={(username)=> this.setState({username: username})}
                    setPassword={(password)=> this.setState({password: password})}
                />
            </div>
        );
    }
}

export default RegisterStudent;
