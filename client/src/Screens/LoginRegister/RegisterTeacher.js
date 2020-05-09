import React, { Component } from 'react';

import RegisterForm from './RegisterForm';

class RegisterTeacher extends Component {
    state = {
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        otp: ''
    }

    render = () => {
        return (
            <div className="Body">
                <RegisterForm
                    setUsername={(username) => this.setState({ username: username })}
                    setPassword={(password) => this.setState({ password: password })}
                    setFirstName={(firstName) => this.setState({ firstName: firstName })}
                    setLastName={(lastName) => this.setState({ lastName: lastName })}
                    setOTP={(otp) => this.setState({ otp: otp })}
                    userType="teacher"
                />
            </div>
        );
    }
}

export default RegisterTeacher;
