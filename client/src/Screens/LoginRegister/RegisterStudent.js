import React, { Component } from 'react';

import RegisterForm from './RegisterForm';

class RegisterStudent extends Component {
    state = {
        username: '',
        password: '',
        firstName: '',
        lastName: '',
    }

    render = () => {
        return (
            <div className="Body">
                <RegisterForm
                    setUsername={(username) => this.setState({ username: username })}
                    setPassword={(password) => this.setState({ password: password })}
                    setFirstName={(firstName) => this.setState({ firstName: firstName })}
                    setLastName={(lastName) => this.setState({ lastName: lastName })}
                    userType="student"
                />
            </div>
        );
    }
}

export default RegisterStudent;
