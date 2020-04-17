import React, { Component } from 'react';
import { Button, ButtonGroup, FormGroup, InputGroup, ControlGroup } from '@blueprintjs/core';
import { Link } from 'react-router-dom';

class LoginScreen extends Component {
    state = {
        responseToPost: ''
    }

    handleLogin = async e => {
        e.preventDefault();
        var username = document.getElementById("unameL").value;
        var password = document.getElementById("pwordL").value;
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
            // this.props.logInStudent();
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
                            id="unameL"
                            placeholder="Enter Username..."
                        />
                    </FormGroup>
                    <FormGroup
                        label="Password"
                        labelFor="text-input"
                    >
                        <InputGroup
                            id="pwordL"
                            placeholder="Enter Password..."
                        />
                    </FormGroup>
                    <ButtonGroup vertical>
                        <Button
                            type="submit"
                            id="loginButton"
                            className="bp3-button bp3-icon-layout-log-in"
                            intent="success"
                            icon="log-in"
                            text="Log In"
                            onClick={() => this.handleLogin()}
                        />
                        <br />
                        <Link to="/">
                            <Button
                                type="button"
                                className="bp3-button bp3-icon-layout-small-cross"
                                intent="warning"
                                icon="small-cross"
                                text="Back"
                            />
                        </Link>
                    </ButtonGroup>
                </ControlGroup>
            </div>
        );
    }
}

export default LoginScreen;
