import React, { Component } from 'react';
import { Button, FormGroup, ControlGroup, InputGroup, ButtonGroup } from '@blueprintjs/core';
import { Link } from 'react-router-dom';

class RegisterTeacher extends Component {
    state = {
        responseToPost: ''
    }

    handleRegister = async e => {
        e.preventDefault();
        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;
        // TODO add code to handle the 'teacher code' otp
        var otp = document.getElementById("otp").value;
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
                <ControlGroup vertical>
                    <FormGroup label="Username:" labelFor="username">
                        <InputGroup
                            id="username"
                            placeholder="Enter Username..."
                        />
                    </FormGroup>
                    <FormGroup label="Password:" labelFor="password">
                        <InputGroup
                            id="password"
                            placeholder="Enter Password..."
                            type="password"
                        />
                    </FormGroup>
                    <FormGroup label="Confirm Password:" labelFor="passwordConfirm">
                        <InputGroup
                            id="password"
                            placeholder="Confirm Password..."
                            type="password"
                        />
                    </FormGroup>
                    <FormGroup label="Teacher OTP:" labelFor="otp">
                        <InputGroup
                            id="otp"
                            placeholder="Enter Teacher OTP..."
                            type="password"
                        />
                    </FormGroup>
                    <ButtonGroup vertical large>
                        <Link to="/">
                            <Button
                                text="Register Teacher"
                                icon="confirm"
                                onClick={() => this.handleRegister()}
                                type="submit"
                                id="registerButton"
                                intent="success"
                            />
                        </Link>
                        <br />
                        <Link to="/register">
                            <Button
                                text="Back"
                                intent="warning"
                                icon="small-cross"
                            />
                        </Link>
                        <br />
                        <br />
                        <FormGroup label="Already Have an Account?" />
                        <Link to="/login">
                            <Button
                                text="Log In Instead"
                                intent="primary"
                                icon="log-in"
                            />
                        </Link>
                    </ButtonGroup>
                </ControlGroup>
            </div>
        );
    }
}

export default RegisterTeacher;