import React, { Component } from 'react';
import { Button, FormGroup, ControlGroup, InputGroup, ButtonGroup } from '@blueprintjs/core';
import { Link } from 'react-router-dom';

class RegisterForm extends Component {
    state = {
        username: '',
        password: '',
        passwordConfirm: '',
        passwordMatch: '',
        otp: ''
    }

    renderOTPInput = () => {
        if (this.props.requireOTP) {
            return (
                <FormGroup label="Teacher OTP:" labelFor="otp">
                    <InputGroup
                        id="otp"
                        onChange={e => this.setState({ otp: e.target.value })}
                        value={this.state.otp}
                        placeholder="Enter Teacher OTP..."
                        type="password"
                    />
                </FormGroup>
            );
        }
        else { return (<div/>); }
    }
    
    inputChanged = (username, password, otp) => {
        this.props.setUsername(username);
        this.props.setPassword(password);
        if (this.props.requireOTP) {this.props.setOTP(otp);}
    }

    render = () => {
        return (
            <div>
                <ControlGroup vertical>
                    <FormGroup label="Username:" labelFor="username">
                        <InputGroup
                            id="username"
                            onChange={e => {
                                this.setState({ username: e.target.value });
                                this.inputChanged(e.target.value, this.state.password, this.state.otp);
                            }}
                            value={this.state.username}
                            placeholder="Enter Username..."
                        />
                    </FormGroup>
                    <FormGroup label="Password:" labelFor="password">
                        <InputGroup
                            id="password"
                            onChange={e => {
                                this.setState({ password: e.target.value });
                                this.inputChanged(this.state.username, e.target.value, this.state.otp);
                            }}
                            value={this.state.password}
                            placeholder="Enter Password..."
                            type="password"
                        />
                    </FormGroup>
                    <FormGroup
                        label="Confirm Password:"
                        labelFor="passwordConfirm"
                        helperText={this.state.passwordMatch ? "" : "Password Must Match"}
                    >
                        <InputGroup
                            placeholder="Confirm Password..."
                            id="passwordConfirm"
                            onChange={
                                e => {
                                    var value = e.target.value;
                                    this.setState({ passwordConfirm: value });
                                    ((value === this.state.password) && value) ?
                                    this.setState({passwordMatch: true}) :
                                    this.setState({passwordMatch: false})
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
                                    this.state.passwordMatch ?
                                        this.props.handleRegister(e) :
                                        alert("Password must match confirmed password.");
                                }
                            }
                            // type="submit"
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
