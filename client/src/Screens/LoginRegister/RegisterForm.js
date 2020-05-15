import React, { Component } from 'react';
import { Button, FormGroup, ControlGroup, InputGroup, ButtonGroup } from '@blueprintjs/core';
import { Link, Redirect } from 'react-router-dom';
import { authenticator } from 'otplib';
import OtpInput from 'react-otp-input'

//IMPORANT: make sure secret is in base32 already and matches gen-otp-qr.js
const secret = 'KVKFKRCPNZQUYMLXOVYDSQKJKZDTSRLD';

class RegisterForm extends Component {
    state = {
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        passwordConfirm: '',
        otp: '',
        created: false,
        passwordHelperText: '',
        usernameHelperText: '',
    }

    handleRegister = async e => {
        e.preventDefault();
        var username = this.state.username;
        var password = this.state.password;
        var firstName = this.state.firstName;
        var lastName = this.state.lastName;
        var otp = this.state.otp;
        var userType = this.props.userType;
        // If password doesn't meet requirements
        if (this.state.passwordHelperText !== ""){
            alert("Password not strong enough.\n \
            Must be between 4 and 20 characters.\n \
            Must contain at least one digit.\n \
            Must contain at least one symbol.\n \
            Cannot contain any spaces.");
            return;
        }
        // If username doesn't meet requirements
        if (this.state.usernameHelperText !== ""){
            alert("Invalid username.\n \
            Must be between 4 and 20 characters.\n \
            Must start with a letter.\n \
            Cannot contain any symbols.\n \
            Cannot contain any spaces.");
            return;
        }
        if (userType === "teacher"){
            if (username === '' | password === '' | firstName === '' | lastName === '' | otp === '') {
                alert("Must fill in all fields to register");
                return;
            }

            // Check whether given correct otp
            var isValid = authenticator.check(otp, secret);
            console.log("checking if : "+ otp + " is valid: " + isValid);
            console.log("Expected: " + authenticator.generate(secret));

            if(!isValid){
                    alert("Invalid OTP token");
                    return;
            }
        }
        else {
            // Student registering
            if (username === '' | password === '' | firstName === '' | lastName === '') {
                alert("Must fill in all fields to register");
                return;
            }
        }
        fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "username": username,
                "password": password,
                "first_name": firstName,
                "last_name": lastName,
                "user_type": userType,
                "otp": otp,
            })
        })
        .then(response => {
            return response.json();
        })
        .then(json => {
            const message = json.message;
            console.info(message);
            if (message === "Username exists") {
                alert("Username taken, choose a different username");
                console.info("Taken: " + username);
            } else if (message === "DB Failure") {
                alert("Issue creating account");
            } else if (message === "Success") {
                console.info("Created " + username);
                this.setState({ created: true });
            }
        });
    };

    // This renders a field to input OTP if this is a register teacher form
    renderOTPInput = () => {
        if (this.props.userType === "teacher") {
            return (
                <FormGroup label="Teacher OTP:" labelFor="otp">
                    <OtpInput
                        id="otp"
                        value={this.state.otp}
                        onChange={value => {
                            console.log("OTP: " + value);
                            this.setState({ otp: value });
                        } }
                        numInputs={6}
                        separator={<span>-</span>}
                        inputStyle={"OTP-container"}
                    />
                </FormGroup>
            );
        }
        else { return (<div />); }
    }

    render = () => {
        if (this.state.created){
            return ( <Redirect to="/login"/>);
        }
        var hasSymbol = new RegExp(/[!@#$%^&*()]/);
        var hasNum = new RegExp(/\d/);
        var hasSpace = new RegExp(/\s/);
        var startWithLetter = new RegExp(/^[a-zA-Z].*$/);
        return (
            <div>
                <ControlGroup vertical>
                    <FormGroup
                        label="Username:"
                        labelFor="username"
                        helperText={this.state.usernameHelperText}
                    >
                        <InputGroup
                            id="username"
                            onChange={e => {
                                var value = e.target.value;
                                this.setState({ username: value });
                                if (!startWithLetter.test(value)){
                                    this.setState({usernameHelperText: "Must start with a letter."});
                                }
                                else if (hasSpace.test(value)){
                                    this.setState({usernameHelperText: "Cannot contain spaces."});
                                }
                                else if (hasSymbol.test(value)){
                                    this.setState({usernameHelperText: "Cannot contain symbols."});
                                }
                                else if (value.length < 4){
                                    this.setState({usernameHelperText: "Too short."});
                                }
                                else if (value.length > 20){
                                    this.setState({usernameHelperText: "Too long."});
                                }
                                else {
                                    this.setState({usernameHelperText: ""});
                                }
                            }}
                            value={this.state.username}
                            placeholder="Enter Username..."
                        />
                    </FormGroup>
                    <FormGroup label="First Name:" labelFor="firstName">
                        <InputGroup
                            id="firstName"
                            onChange={e => {
                                var value = e.target.value;
                                this.setState({ firstName: value });
                            }}
                            value={this.state.firstName}
                            placeholder="Enter First Name..."
                        />
                    </FormGroup>
                    <FormGroup label="Last Name:" labelFor="lastName">
                        <InputGroup
                            id="lastName"
                            onChange={e => {
                                var value = e.target.value;
                                this.setState({ lastName: value });
                            }}
                            value={this.state.lastName}
                            placeholder="Enter Last Name..."
                        />
                    </FormGroup>
                    <FormGroup 
                        label="Password:"
                        labelFor="password"
                        helperText={this.state.passwordHelperText}
                    >
                        <InputGroup
                            id="password"
                            onChange={(e) => {
                                var value = e.target.value;
                                this.setState({ password: value });
                                if (hasSpace.test(value)) {
                                    this.setState({passwordHelperText: "Cannot contain spaces."});
                                }
                                else if (value.length < 4) {
                                    this.setState({passwordHelperText: "Too short."});
                                }
                                else if (value.length > 20) {
                                    this.setState({passwordHelperText: "Too long."});
                                }
                                else if (!hasNum.test(value)) {
                                    this.setState({passwordHelperText: "Must contain at least one digit."});
                                }
                                else if (!hasSymbol.test(value)) {
                                    this.setState({passwordHelperText: "Must contain at least one symbol."});
                                }
                                else { this.setState({passwordHelperText: ""}); }
                            }}
                            value={this.state.password}
                            placeholder="Enter Password..."
                            type="password"
                        />
                    </FormGroup>
                    <FormGroup
                        label="Confirm Password:"
                        labelFor="passwordConfirm"
                        helperText={(this.state.password === this.state.passwordConfirm) ? "" : "Password Must Match"}
                    >
                        <InputGroup
                            placeholder="Confirm Password..."
                            id="passwordConfirm"
                            onChange={
                                e => {
                                    var value = e.target.value;
                                    this.setState({ passwordConfirm: value });
                                }
                            }
                            value={this.state.passwordConfirm}
                            type="password"
                        />
                    </FormGroup>
                    <this.renderOTPInput />
                    <ButtonGroup vertical large>
                        <Button
                            className={'vertical-margin'}
                            icon="confirm"
                            text={(this.props.userType === "teacher") ?
                                "Register Teacher" : "Register Student"
                            }
                            onClick={
                                (e) => {
                                    (this.state.password === this.state.passwordConfirm) ?
                                        this.handleRegister(e) :
                                        alert("Password must match confirmed password.");
                                }
                            }
                            id="registerButton"
                            intent="success"
                        />
                        <Link to="/register">
                            <Button
                                className={'vertical-margin'}
                                intent="warning"
                                icon="small-cross"
                                text="Back" />
                        </Link>
                        <div style={{'height': '4vh'}} />
                        <FormGroup label="Already Have an Account?" />
                        <Link to="/login">
                            <Button
                                intent="primary"
                                icon="log-in"
                                text="Log In Instead" />
                        </Link>
                    </ButtonGroup>
                </ControlGroup>
            </div>
        );
    }
}

export default RegisterForm;
