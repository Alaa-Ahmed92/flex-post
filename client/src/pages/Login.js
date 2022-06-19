import React, { Component } from 'react';
import SigninForm from '../components/Signin/Signin';
import greenLogo from '../assets/images/logo-green.png';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../helpers/auth-helper';
import { useParams, useNavigate } from 'react-router-dom';

const Login = (props) => {
    const navigate = useNavigate();

    if (isAuthenticated()) {
        navigate(`/user/${isAuthenticated().user._id}`, { replace: true });
    }

    return (
        <div className='login page'>
            <div className='container'>
                <div className='formHeader'>
                    <img src={greenLogo} alt="Flux" />
                    <h3 className='formTitle'>Login into FlexPost</h3>
                    <div>No account yet? <Link to="/register">Sign up</Link>.</div>
                </div>
                <SigninForm />
            </div>
        </div>
    )
};

export default Login;
