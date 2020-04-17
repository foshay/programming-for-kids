import React, { Component } from 'react';
import { Button } from '@blueprintjs/core';
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
            <main className="BodyMenu">
                <form onSubmit={this.handleLogin}>
                    <h4>Username:</h4>
                    <input
                        type="text"
                        placeholder=" Enter Username..."
                        id="unameL"
                        required>
                    </input>
                    <h4>Password:</h4>
                    <input
                        type="password"
                        placeholder=" Enter Password..."
                        id="pwordL"
                        required>
                    </input>
                    <ul style={{paddingLeft: 0}}>
                        <Button
                            type="submit"
                            id="loginButton"
                            className="bp3-button bp3-icon-layout-log-in"
                            intent="success"
                            icon="log-in" 
                            text="Log In"
                            onClick={this.handleLogin} 
                        />
                    </ul>
                </form>
                <ul style={{paddingLeft: 0}}>
                    <Link to="/">
                        <Button
                            type="button"
                            className="bp3-button bp3-icon-layout-small-cross"
                            intent="warning"
                            icon="small-cross"
                            text="Back"
                        />
                    </Link>
                </ul>
            </main>

        );
    }
}

export default LoginScreen;
