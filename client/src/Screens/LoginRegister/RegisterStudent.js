import React, { Component } from 'react';

import RegisterForm from './RegisterForm';

class RegisterStudent extends Component {
    render = () => {
        return (
            <div className="Body">
                <RegisterForm userType="student" />
            </div>
        );
    }
}

export default RegisterStudent;
