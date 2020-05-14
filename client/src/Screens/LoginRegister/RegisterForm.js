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
        created: false
    }

    handleRegister = async e => {
        e.preventDefault();
        var username = this.state.username;
        var password = this.state.password;
        var firstName = this.state.firstName;
        var lastName = this.state.lastName;
        var otp = this.state.otp;
        var userType = this.props.userType;
        if (userType === "teacher"){
            if (username === '' | password === '' | firstName === '' | lastName === '' | otp === '') {
                alert("Must fill in all fields to register");
                return;
            }

            var isValid = authenticator.check(otp, secret);
            console.log("checking if : "+ otp + " is valid: " + isValid);
            console.log("Expected: " + authenticator.generate(secret));
            //isValid = totp.verify({otp, secret});
            //console.log("verify: " + isValid);

            if(!isValid){
                    alert("Invalid OTP token");
                    return;
            }
        }
        else {
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
                // alert("User created");
                this.setState({ created: true });
            }
        });
    };

    renderOTPInput = () => {
        // TODO enable otp
         if (this.props.userType === "teacher") {
             return (
                 <FormGroup label="Teacher OTP:" labelFor="otp">
                     <OtpInput
                         id="otp"
                         value={this.state.otp}
                         onChange={value => {
                             console.log("OTP: " + value);
                             this.setState({ otp: value });
                             this.props.setOTP(value);
                            }
                        }
                         numInputs={6}
                         separator={<span>-</span>}
                         inputStyle={"OTP-container"}
                     />
                 </FormGroup>
             );
         }
         else { return (<div/>); }
    }

    render = () => {
        if (this.state.created){
            return ( <Redirect to="/login"/>);
        }
        return (
            <div>
                <ControlGroup vertical>
                    <FormGroup label="Username:" labelFor="username">
                        <InputGroup
                            id="username"
                            onChange={e => {
                                var value = e.target.value;
                                this.setState({ username: value });
                                this.props.setUsername(value);
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
                                this.props.setFirstName(value);
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
                                this.props.setLastName(value);
                            }}
                            value={this.state.lastName}
                            placeholder="Enter Last Name..."
                        />
                    </FormGroup>
                    <FormGroup label="Password:" labelFor="password">
                        <InputGroup
                            id="password"
                            onChange={(e) => {
                                var value = e.target.value;
                                this.setState({ password: value });
                                if (this.state.passwordConfirm === value) {
                                    this.props.setPassword(value);
                                }
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
                                    (value === this.state.password) ?
                                        this.props.setPassword(value) :
                                        this.props.setPassword('')
                                }
                            }
                            value={this.state.passwordConfirm}
                            type="password"
                        />
                    </FormGroup>
                    <this.renderOTPInput />
                    <ButtonGroup vertical large>
                        <Button
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
                        <br />
                        <Link to="/register">
                            <Button
                                intent="warning"
                                icon="small-cross"
                                text="Back" />
                        </Link>
                        <br />
                        <br />
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
