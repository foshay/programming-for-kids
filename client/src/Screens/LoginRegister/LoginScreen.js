import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Button, ButtonGroup, FormGroup, InputGroup, ControlGroup } from '@blueprintjs/core';

class LoginScreen extends Component {
    state = {
        username: '',
        password: '',
        loggedIn: '',
    }

    handleLogin = async e => {
        var username = this.state.username;
        var password = this.state.password;

        e.preventDefault();
        // const response = await 
        fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "username": username,
                "password": password,
            })
        }).then(response => {
            return response.json();
        }).then(body => {
            console.log(body);
            var message = body.message;
            console.log("Console message: " + message);
            if (message === "Success") {
                var token = body.token;
                localStorage.setItem('nccjwt', token);
                this.setState({ loggedIn: true });
            } else {
                alert("Invalid username or password");
            }
        })
    };

    render = () => {
        if (this.state.loggedIn){
            return ( <Redirect to="/"/>)
        }
        else {
            return (
                <div className="home-menu">
                    <ControlGroup vertical>
                        <FormGroup
                            label="Username"
                            labelFor="text-input"
                        >
                            <InputGroup
                                placeholder="Enter Username..."
                                id="username"
                                onChange={e => this.setState({ username: e.target.value })}
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
                                onChange={e => this.setState({ password: e.target.value })}
                                value={this.state.password}
                                type="password"
                            />
                        </FormGroup>
                        <ButtonGroup vertical large>
                            <Button
                                className={"vertical-margin"}
                                type="submit"
                                id="loginButton"
                                intent="success"
                                icon="log-in"
                                text="Log In"
                                onClick={(e) => this.handleLogin(e)}
                            />
                            <Link to="/">
                                <Button
                                    className={"vertical-margin"}
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
}

export default LoginScreen;
