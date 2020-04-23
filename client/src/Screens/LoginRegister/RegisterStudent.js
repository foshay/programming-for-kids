import React, { Component } from 'react';
import RegisterForm from './RegisterForm';
import { user } from 'blockly';

class RegisterStudent extends Component {
    state = {
        responseToPost: '',
        username: '',
        password: '',
        first_name: '',
        last_name: '',
    }

    handleRegister = async e => {
        e.preventDefault();
        var username = this.state.username;
        var password = this.state.password;
        var first_name = this.state.first_name;
        var last_name = this.state.last_name;
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "username": username,
                "password": password,
                "first_name": first_name,
                "last_name": last_name,
            })
        });

        const body = await response.text();

        // TODO change generic Failure message
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
                    setFirstName={(first_name)=> this.setState({first_name: first_name})}
                    setLastName={(last_name)=> this.setState({last_name: last_name})}
                />
            </div>
        );
    }
}

export default RegisterStudent;
