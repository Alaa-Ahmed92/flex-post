import React, { useState, useEffect } from 'react';
import {
    Form,
    Button,
    Row,
    Col
} from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../../helpers/auth-helper';
import { getUser, updateUser } from '../../actions/profileActions';
import { getUserSelector } from '../../selectors/userSelector';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './EditForm.css';

const EditForm = (props) => {
    const [newUserInfo, setNewUserInfo] = useState('');
    const { getUser, updateUser, user, error } = props;
    const { userId } = useParams();
    const navigate = useNavigate();
    const [validError, setValidError] = useState('');
    const [userPhoto, setUserPhoto] = useState('');

    useEffect(() => {
        getUser(userId, isAuthenticated().token);
        if (user) {
            setNewUserInfo({
                name: user.name || '',
                email: user.email || '',
                about: user.about || '',
                nickname: user.nickname || '',
                job: user.job || '',
                hometown: user.hometown || '',
                currentCity: user.currentCity || '',
                photo: user.photo || '',
            })
        }
    }, [userId]);

    function handleChange(e) {
        setNewUserInfo({ ...newUserInfo, ...userPhoto, [e.target.name]: e.target.value })
    };

    function handleUploadPhoto(e) {
        setUserPhoto({ 'photo': e.target.files[0] })
    }

    function handleSubmit(e) {
        e.preventDefault();

        let userData = new FormData();
        newUserInfo.name && userData.append('name', newUserInfo.name);
        newUserInfo.nickname && userData.append('nickname', newUserInfo.nickname);
        newUserInfo.email && userData.append('email', newUserInfo.email);
        newUserInfo.passoword && userData.append('passoword', newUserInfo.passoword);
        newUserInfo.about && userData.append('about', newUserInfo.about);
        newUserInfo.job && userData.append('job', newUserInfo.job);
        newUserInfo.hometown && userData.append('hometown', newUserInfo.hometown);
        newUserInfo.currentCity && userData.append('currentCity', newUserInfo.currentCity);
        userPhoto.photo && userData.append('photo', userPhoto.photo);

        if (isValid()) {
            updateUser(userId, isAuthenticated().token, userData);
            navigate(`/user/${userId}`, { replace: true })
        }
    };

    function isValid() {
        const { password } = newUserInfo;

        const uppercasePassword = /(?=.*?[A-Z])/.test(password);
        const lowercasePassword = /(?=.*?[a-z])/.test(password);
        const digitsPassword = /(?=.*?[0-9])/.test(password);
        const specialCharPassword = /(?=.*?[#?!@$%^&*-])/.test(password);
        const minLengthPassword = /.{8,}/.test(password);

        if (!minLengthPassword) {
            setValidError('The password is shorter than the minimum allowed length (8)');
        } else if (!uppercasePassword) {
            setValidError('Password must have at least one uppercase');
        } else if (!lowercasePassword) {
            setValidError('Password must have at least one lowercase');
        } else if (!digitsPassword) {
            setValidError('Password must have at least one digit');
        } else if (!specialCharPassword) {
            setValidError('Password must have at least one special character');
        } else {
            setValidError('');
            return true;
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <div>{error && 'Please fill the required fields!'}</div>
            <Row className="g-2">
                <Col md>
                    <div className="form-floating mb-3">
                        <input
                            type="file"
                            className="form-control"
                            onChange={handleUploadPhoto}
                            accept='image/*'
                        />
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            name="name"
                            type="text"
                            className="form-control"
                            placeholder="eg. John Doe"
                            onChange={handleChange}
                            value={newUserInfo.name}
                        />
                        <label><span>* </span>Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            name="email"
                            type="email"
                            className="form-control"
                            placeholder="name@example.com"
                            onChange={handleChange}
                            value={newUserInfo.email}
                        />
                        <label><span>* </span>Email address</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            name="password"
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            onChange={handleChange}
                        />
                        <label><span>* </span>Password</label>
                        <div>{validError}</div>
                    </div>
                    <div className="form-floating mb-3">
                        <textarea
                            name="about"
                            type="text"
                            className="form-control"
                            placeholder="Your bio"
                            onChange={handleChange}
                            value={newUserInfo.about}
                        ></textarea>
                        <label>About</label>
                    </div>
                </Col>
                <Col md>
                    <div className="form-floating mb-3">
                        <input
                            name="nickname"
                            type="text"
                            className="form-control"
                            placeholder="eg. Phenomenal"
                            onChange={handleChange}
                            value={newUserInfo.nickname}
                        />
                        <label>Nickname</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            name="job"
                            type="text"
                            className="form-control"
                            placeholder="eg. Software Developer"
                            onChange={handleChange}
                            value={newUserInfo.job}
                        />
                        <label>Job</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            name="hometown"
                            type="text"
                            className="form-control"
                            placeholder="eg. London"
                            onChange={handleChange}
                            value={newUserInfo.hometown}
                        />
                        <label>Hometown</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            name="currentCity"
                            type="text"
                            className="form-control"
                            placeholder="eg. London"
                            onChange={handleChange}
                            value={newUserInfo.currentCity}
                        />
                        <label>Current City</label>
                    </div>
                </Col>
            </Row>

            <Button variant="primary" type="submit">
                Update
            </Button>
        </Form>
    )
};

EditForm.propTypes = {
    error: PropTypes.string,
    getUser: PropTypes.func.isRequired,
    updateUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    error: state.user.error,
    user: getUserSelector(state)
})

export default connect(mapStateToProps, { getUser, updateUser })(EditForm);