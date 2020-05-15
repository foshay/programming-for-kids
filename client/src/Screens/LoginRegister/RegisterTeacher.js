import React, { Component } from 'react';

import RegisterForm from './RegisterForm';

class RegisterTeacher extends Component {
    render = () => {
        return (
            <div className="Body">
                <RegisterForm userType="teacher" />
            </div>
        );
    }
}

export default RegisterTeacher;
