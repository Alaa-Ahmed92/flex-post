import React, { useState } from 'react';
import {
    Form,
    Button,
    Alert
} from 'react-bootstrap';
import {
    UserIcon,
    MailIcon,
    LockClosedIcon
} from '@heroicons/react/outline';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/registerActions';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import './style.css';

const SignupForm = (props) => {
    const [user, setUser] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { registerUser, register } = props;

    function handleChange(e) {
        setUser({ ...user, [e.target.name]: e.target.value })
    };

    function handleSubmit(e) {
        e.preventDefault();
        if (user) {
            registerUser(user);

            setError('');
        } else {
            setError('Please fill all fields');
        }
    };

    if (register.registered) navigate('/login', { replace: true });

    return (
        <Form onSubmit={handleSubmit}>
            {register && register.error && <div className='errorMsg'>{register.error}</div>}
            {error && <div className='errorMsg'>{error}</div>}
            <div className='fieldsWrapper'>
                <Form.Group className="formGroup" controlId="formBasicName">
                    <Form.Label><UserIcon /></Form.Label>
                    <Form.Control
                        name="name"
                        type="text"
                        placeholder="Name"
                        onChange={handleChange} />
                </Form.Group>
                <Form.Group className="formGroup" controlId="formBasicEmail">
                    <Form.Label><MailIcon /></Form.Label>
                    <Form.Control
                        name="email"
                        type="email"
                        placeholder="Email Address"
                        onChange={handleChange} />
                </Form.Group>
                <Form.Group className="formGroup" controlId="formBasicPassword">
                    <Form.Label><LockClosedIcon /></Form.Label>
                    <Form.Control
                        name="password"
                        type="password"
                        placeholder="Password"
                        onChange={handleChange} />
                </Form.Group>
            </div>
            {register && register.registering && <img alt='loading' src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />}
            {register && register.user && <Alert variant={'success'}>{register.user.message}</Alert>}
            <div className='formAction'>
                <Button variant="primary" type="submit">
                    Register
                </Button>
            </div>
        </Form>
    )
};

SignupForm.propTypes = {
    register: PropTypes.object,
    registerUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    register: state.register
});

export default connect(mapStateToProps, { registerUser })(SignupForm);
