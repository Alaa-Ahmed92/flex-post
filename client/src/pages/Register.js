import React, { Component } from 'react';
import SignupForm from '../components/Signup/Signup';

class Register extends Component {
    render() {
        return (
            <div className='register page'>
                <div className='container'>
                    <SignupForm />
                </div>
            </div>
        )
    }
};

export default Register;
