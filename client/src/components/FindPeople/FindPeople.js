import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { findPeople } from '../../actions/profileActions';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../../helpers/auth-helper';
import defaultImg from '../../assets/images/profile-pic.png';
import { message } from 'antd';
import {
    PersonAddIcon
} from '@primer/octicons-react';
import './FindPeople.css';

const FindPeople = (props) => {
    const [peopleValues, setPeopleValues] = useState([]);
    const { people, findPeople } = props;

    useEffect(() => {
        findPeople(isAuthenticated().user._id, isAuthenticated().token)
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
            <div className='boxTitle'><h4>People You May Know</h4></div>
            <div className='findPeopleWrapper'>
                {people && people.map((user, i) => (
                    <div className='userCard' key={user._id}>
                        <Link to={`/user/${user._id}`} className='userCardInfo'>
                            <img
                                className='img-fluid'
                                src={`${process.env.REACT_APP_API_URL}/user/photo/${user._id}`}
                                onError={i => i.target.src = defaultImg}
                            />
                            <h5>{user.name}</h5>
                        </Link>
                        <div className='userCardActions'>
                            <button onClick={() => clickFollow(user, i)}><PersonAddIcon size={16} /></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
};

const mapStateToProps = (state) => ({
    people: state.user.people
});

export default connect(mapStateToProps, { findPeople })(FindPeople);