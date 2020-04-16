import React, { Component } from 'react';
import { Button } from '@blueprintjs/core';
import { Link } from 'react-router-dom';

class RegisterScreen extends Component {
    state = {
        responseToPost: ''
    }

    handleRegister = async e => {
        e.preventDefault();
        var username = document.getElementById("unameR").value;
        var password = document.getElementById("pwordR").value;
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
        }else if(body == "DB Failure"){
            alert("Issue creating account");
        } else {
            console.info("Created " + body);
            alert("User created");
        }


    };

    render = () => {
        return (
            <main className="BodyMenu">
                <form onSubmit={this.handleRegister}>
                    <h4>Username:</h4>
                    <input
                        type="text"
                        placeholder="Enter Username"
                        id="unameR"
                        required>
                    </input>
                    <h4>Password:</h4>
                    <input
                        type="password"
                        placeholder="Enter Password"
                        id="pwordR"
                        required> 
                    </input>
                    <ul style={{paddingLeft: 0}}>
                        <Button
                            type="submit"
                            id="registerButton"
                            class="bp3-button bp3-icon-layout-confirm"
                            intent="success"
                            icon="confirm"
                            text="Register"
                            onClick={this.handleRegister}
                        />
                    </ul>
                </form>
                <ul style={{ paddingLeft: 0 }}>
                    <Link to="/">
                        <Button
                            type="button"
                            class="bp3-button bp3-icon-layout-small-cross"
                            intent="warning"
                            icon="small-cross"
                            text="Back" />
                    </Link>
                </ul>
            </main>

        );
    }
}

export default RegisterScreen;
