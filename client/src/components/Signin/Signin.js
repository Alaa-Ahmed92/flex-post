import React, { useState } from 'react';
import {
    Form,
    Button,
    Alert
} from 'react-bootstrap';
import {
    MailIcon,
    LockClosedIcon
} from '@heroicons/react/outline';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/loginActions';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const SigninForm = (props) => {
    const { loginUser, login } = props;
    const [user, setUser] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    function handleChange(e) {
        setUser({ ...user, [e.target.name]: e.target.value })
    };

    function handleSubmit(e) {
        e.preventDefault();
        if (user) {
            loginUser(user);

            setError('');
        } else {
            setError('Please fill all fields');
        }
    };

    if (login.loggedIn) navigate('/', { replace: true });

    return (
        <Form onSubmit={handleSubmit}>
            {login && login.error && <div className='errorMsg'>{login.error}</div>}
            {error && <div className='errorMsg'>{error}</div>}
            <div className='fieldsWrapper'>
                <Form.Group className="formGroup" controlId="formBasicEmail">
                    <Form.Label><MailIcon /></Form.Label>
                    <Form.Control
                        name="email"
                        type="email"
                        placeholder="Enter email"
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
            {login && login.requesting && <img alt='loading' src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />}
            {login && login.user && <Alert variant={'success'}>{login.user.message}</Alert>}
            <div className='formAction'>
                <Button variant="primary" type="submit">
                    Login
                </Button>
            </div>
        </Form>
    )
};

SigninForm.propTypes = {
    login: PropTypes.object,
    loginUser: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    login: state.login
});

export default connect(mapStateToProps, { loginUser })(SigninForm);
