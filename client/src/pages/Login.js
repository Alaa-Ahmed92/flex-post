import React, { Component } from 'react';
import SigninForm from '../components/Signin/Signin';

class Login extends Component {
    render() {
        return (
            <div className='login page'>
                <div className='container'>
                    <SigninForm />
                </div>
            </div>
        )
    }
};

export default Login;
