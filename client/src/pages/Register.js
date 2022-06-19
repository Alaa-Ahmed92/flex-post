import React, { Component } from 'react';
import SignupForm from '../components/Signup/Signup';
import greenLogo from '../assets/images/logo-green.png';
import { Link } from 'react-router-dom';

class Register extends Component {
    render() {
        return (
            <div className='register page'>
                <div className='container'>
                    <div className='formHeader'>
                        <img src={greenLogo} alt="Flux" />
                        <h3 className='formTitle'>Create a new account</h3>
                        <div>Already have an account? <Link to="/login">Sign in</Link>.</div>
                    </div>
                    <SignupForm />
                </div>
            </div>
        )
    }
};

export default Register;
