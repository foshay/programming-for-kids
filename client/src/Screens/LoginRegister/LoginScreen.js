import React, { Component } from 'react';
import { Button, ButtonGroup, FormGroup, InputGroup, ControlGroup } from '@blueprintjs/core';
import { Link } from 'react-router-dom';

class LoginScreen extends Component {
    state = {
        responseToPost: '',
        username: '',
        password: ''
    }

    handleLogin = async e => {
        // var username = document.getElementById("username").value;
        // var password = document.getElementById("password").value;
        var username = this.state.username;
        var password = this.state.password;

        e.preventDefault();
        const response = await fetch('/api/login', {
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
        if(body == "Success"){
            alert("Login successful");
            // TODO get JWT token
            // TODO differentiate between teacher and student? Or in App?
        }else{
            alert("Invalid username or password");
        }
        this.setState({ responseToPost: body });
        //body is the response from the server after receiving the login information
        //we can use this for authenticating users (cookie or something)
        console.info(this.state.responseToPost);
    };

    render = () => {
        return (
            <div className="Body">
                <ControlGroup vertical>
                    <FormGroup
                        label="Username"
                        labelFor="text-input"
                    >
                        <InputGroup
                            placeholder="Enter Username..."
                            id="username"
                            onChange={e => this.setState({username: e.target.value})}
                            value={this.state.username}
                        />
                    </FormGroup>
                    <FormGroup
                        label="Password"
                        labelFor="text-input"
                    >
                        <InputGroup
                            id="password"
                            placeholder="Enter Password..."
                            onChange={e => this.setState({password: e.target.value})}
                            value={this.state.password}
                            type="password"
                        />
                    </FormGroup>
                    <ButtonGroup vertical large>
                        <Button
                            type="submit"
                            id="loginButton"
                            intent="success"
                            icon="log-in"
                            text="Log In"
                            onClick={(e) => this.handleLogin(e)}
                        />
                        <br />
                        <Link to="/">
                            <Button
                                text="Back"
                                intent="warning"
                                icon="small-cross"
                            />
                        </Link>
                    </ButtonGroup>
                </ControlGroup>
            </div>
        );
    }
}

export default LoginScreen;
