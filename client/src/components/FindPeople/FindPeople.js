import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { findPeople } from '../../actions/profileActions';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../../helpers/auth-helper';
import { message } from 'antd';
import PropTypes from 'prop-types';
import './FindPeople.css';
import { createImg } from '../../Utils';

const FindPeople = (props) => {
    const [peopleValues, setPeopleValues] = useState([]);
    const { people, findPeople } = props;
    const jwt = isAuthenticated();

    useEffect(() => {
        findPeople(jwt && jwt.user && jwt.user._id, jwt && jwt.token)
    }, []);

    function followingMsg(user) {
        message.success(`Following ${user.name}`);
    };

    function clickFollow(user, i) {
        followUser(isAuthenticated().user._id, isAuthenticated().token, user._id)
            .then(data => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    let toFollow = people;
                    toFollow.splice(i, 1);
                    setPeopleValues({ toFollow });
                }
            }).then(followingMsg(user))
    }

    function followUser(id, token, followId) {
        return fetch(`${process.env.REACT_APP_API_URL}/users/user/follow`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ id, followId })
        })
            .then(res => res.json())
    }

    return (
        <div className='findPeople userInfo'>
            <div className='boxTitle'><h4>Who to follow</h4></div>
            <div className='findPeopleWrapper'>
                {people && people.map((user, i) => (
                    <div className='userCard' key={user._id}>
                        <Link to={`/user/${user._id}`} className='userCardInfo'>
                            <img
                                className='img-fluid'
                                src={`/user/photo/${user._id}`}
                                onError={i => i.target.src = createImg(40, user.name)}
                            />
                            <h5>{user.name}</h5>
                        </Link>
                        <div className='userCardActions'>
                            <button onClick={() => clickFollow(user, i)}>Follow</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
};

FindPeople.propTypes = {
    findPeople: PropTypes.func.isRequired,
    people: PropTypes.array
};

const mapStateToProps = (state) => ({
    people: state.user.people
});

export default connect(mapStateToProps, { findPeople })(FindPeople);