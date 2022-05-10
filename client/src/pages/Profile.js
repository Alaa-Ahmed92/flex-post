import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getUser, deleteUser } from './../actions/profileActions';
import { postsByUser, deletePost } from './../actions/postsActions';
import { isAuthenticated, read } from '../helpers/auth-helper';
import { getUserSelector } from '../selectors/userSelector';
import { getPostsSelector } from '../selectors/postsSelector';
import CreatePost from './../components/Posts/CreatePost';
import PostPreview from '../components/Posts/PostPreview';
import './styles.css';
import { Link, useParams } from 'react-router-dom';
import DeleteUser from '../components/DeleteUser/DeleteUser';
import defaultImg from '../assets/images/profile-pic.png';
import { message } from 'antd';
import {
    BriefcaseIcon,
    HomeIcon,
    LocationIcon,
    ClockIcon,
    PencilIcon
} from '@primer/octicons-react';
import Followers from '../components/FollowGrid/Followers';
import Following from '../components/FollowGrid/Following';


const Profile = (props) => {
    // Test
    let [values, setValues] = useState({
        user: { following: [], followers: [] },
        following: false
    });
    // Test
    const { getUser, deleteUser, postsByUser, userPosts, deletePost } = props;
    const { userId } = useParams();
    const photoUrl = values.user && values.user._id ? `${process.env.REACT_APP_API_URL}/user/photo/${values.user._id}?${new Date().getTime()}` : defaultImg;

    useEffect(() => {
        postsByUser(userId, isAuthenticated().token);
        read(userId, isAuthenticated().token).then((data) => {
            if (data && data.error) {
                setValues({ ...values })
            } else {
                let following = checkFollow(data);
                setValues({ ...values, user: data, following });
            }
        });
        // getUser(userId, isAuthenticated().token);
    }, [userId, postsByUser]);

    function unFollowingMsg(user) {
        message.info(`Unfollowing ${user.name}`);
    };

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
                    unFollowingMsg(data);
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
            <div className='container-md'>
                <div className='row justify-content-center'>
                    <div className='col-md-10'>
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
                        {values.user.followers.length !== 0 && <Followers followers={values.user.followers} />}
                        {values.user.following.length !== 0 && <Following following={values.user.following} />}

                    </div>
                    <div className='col-md-6'>
                        {values.user && isAuthenticated().user._id == values.user._id && <CreatePost />}
                        {userPosts && userPosts.length !== 0 ? userPosts.map(post => (
                            <PostPreview post={post} key={post._id} deletePost={deletePost} />
                        )) : <div style={{ fontSize: '20px' }}>No Posts Yet.</div>}
                    </div>
                </div>
            </div>
        </div>
    )
};

const mapStateToProps = state => ({
    user: getUserSelector(state),
    userPosts: getPostsSelector(state)
});

export default connect(mapStateToProps, { getUser, deleteUser, postsByUser, deletePost })(Profile);