import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getUser, deleteUser } from './../actions/profileActions';
import { isAuthenticated, read } from '../helpers/auth-helper';
import { getUserSelector } from '../selectors/userSelector';
import './styles.css';
import { Link, useParams } from 'react-router-dom';
import DeleteUser from '../components/DeleteUser/DeleteUser';
import defaultImg from '../assets/images/profile-pic.png';
import {
    BriefcaseIcon,
    HomeIcon,
    LocationIcon,
    ClockIcon,
    PencilIcon
} from '@primer/octicons-react';


const Profile = (props) => {
    // Test
    let [values, setValues] = useState({
        user: { following: [], followers: [] },
        following: false
    })
    // Test
    const { getUser, deleteUser } = props;
    const { userId } = useParams();
    const photoUrl = values.user && values.user._id ? `${process.env.REACT_APP_API_URL}/user/photo/${values.user._id}?${new Date().getTime()}` : defaultImg;

    useEffect(() => {
        read(userId, isAuthenticated().token).then((data) => {
            if (data && data.error) {
                setValues({ ...values })
            } else {
                let following = checkFollow(data);
                setValues({ ...values, user: data, following })
            }
        });
        // getUser(userId, isAuthenticated().token);
    }, [userId]);

    // Test Follow React
    function followUser(id, token, followId) {
        return fetch(`${process.env.REACT_APP_API_URL}/user/follow`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ id, followId })
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    setValues({ ...values, user: data, following: !values.following });
                }
            })
    }
    // Exit Test Follow React

    // Test Unfollow React
    function unfollowUser(id, token, unfollowId) {
        return fetch(`${process.env.REACT_APP_API_URL}/user/unfollow`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ id, unfollowId })
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    setValues({ ...values, user: data, following: !values.following });
                }
            })
    }
    // Exit Test Unfollow React
    function checkFollow(user) {
        const jwt = isAuthenticated();
        const match = user.followers.some((follower) => {
            return follower._id == jwt.user._id;
        });
        return match;
    };



    function renderAuthUser() {
        if (values.user && isAuthenticated().user._id == values.user._id) {
            return (
                <div className='userAuth'>
                    <Link to={`/user/edit/${values.user._id}`}><PencilIcon size={18} /></Link>
                    <DeleteUser user={values.user} deleteUser={deleteUser} />
                </div>
            )
        } else {
            return (
                <div>
                    {values.following ? (
                        <button type="button" className="btn btn-secondary" onClick={() => unfollowUser(isAuthenticated().user._id, isAuthenticated().token, values.user._id)}>Unfollow</button>
                    ) : (
                        <button type="button" className="btn btn-primary" onClick={() => followUser(isAuthenticated().user._id, isAuthenticated().token, values.user._id)}>Follow</button>
                    )}
                </div>
            )
        }
    };
    return (
        <div className='profile page'>
            <div>{values.user.followers.map(person => <div>{person.name}</div>)}</div>
            <div className='container-md'>
                <div className='row'>
                    <div className='col-md-12'>
                        <div className='profileHeader'>
                            <div className='headImg'>
                                <img src={photoUrl} alt={values.user && values.user.name} onError={i => i.target.src = defaultImg} />
                            </div>
                            <div className='headUserInfo'>
                                <h2>{values.user && values.user.name} {values.user && values.user.nickname && <span>({values.user.nickname})</span>}</h2>
                                <div className='about'><p>{values.user && values.user.about}</p></div>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-4'>
                        <div className='userInfo'>
                            <div className='userIntro'>
                                <div className='userIntroActions'>
                                    <h4>Intro</h4>
                                    {renderAuthUser()}
                                </div>
                            </div>
                            <div className='userListInfo'>
                                {values.user && values.user.job && <div className='job'><BriefcaseIcon size={18} /> <span>Work as</span>{values.user.job}</div>}
                                {values.user && values.user.currentCity && <div className='currentCity'><HomeIcon size={18} /> <span>Lives in</span>{values.user.currentCity}</div>}
                                {values.user && values.user.hometown && <div className='hometown'><LocationIcon size={18} /> <span>From</span>{values.user.hometown}</div>}
                                <div className='date'><ClockIcon size={18} /> <span>Joined</span>{values.user && new Date(values.user.createdAt).toDateString()}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

const mapStateToProps = state => ({
    user: getUserSelector(state)
})

export default connect(mapStateToProps, { getUser, deleteUser })(Profile);
