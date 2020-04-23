import React, { Component } from 'react';
import { Button, FormGroup, ControlGroup, InputGroup, ButtonGroup } from '@blueprintjs/core';
import { Link } from 'react-router-dom';
import OtpInput from 'react-otp-input'

class RegisterForm extends Component {
    state = {
        username: '',
        password: '',
        first_name: '',
        last_name: '',
        passwordConfirm: '',
        otp: ''
    }

    renderOTPInput = () => {
        if (this.props.requireOTP) {
            return (
                <FormGroup label="Teacher OTP:" labelFor="otp">
                    <OtpInput
                        id="otp"
                        onChange={(value) => {
                            // var value = e.target.value;
                            this.setState({ otp: value });
                            this.props.setOTP(value)
                        } }
                        value={this.state.otp}
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
                    <FormGroup label="First Name:" labelFor="first_name">
                        <InputGroup
                            id="first_name"
                            onChange={e => {
                                var value = e.target.value;
                                this.setState({ first_name: value });
                                this.props.setFirstName(value);
                            }}
                            value={this.state.first_name}
                            placeholder="Enter First Name..."
                        />
                    </FormGroup>
                    <FormGroup label="Last Name:" labelFor="last_name">
                        <InputGroup
                            id="last_name"
                            onChange={e => {
                                var value = e.target.value;
                                this.setState({ last_name: value });
                                this.props.setLastName(value);
                            }}
                            value={this.state.last_name}
                            placeholder="Enter Last Name..."
                        />
                    </FormGroup>
                    <FormGroup label="Password:" labelFor="password">
                        <InputGroup
                            id="password"
                            onChange={(e) => {
                                var value = e.target.value;
                                this.setState({ password: value });
                                if (this.state.passwordConfirm == value) {
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
                            text={this.props.registerText}
                            onClick={
                                (e) => {
                                    (this.state.password === this.state.passwordConfirm) ?
                                        this.props.handleRegister(e) :
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