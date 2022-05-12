import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getUser, deleteUser, followUser, unFollowUser } from './../actions/profileActions';
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
    const { following, user, getUser, deleteUser, postsByUser, userPosts, deletePost, followUser, unFollowUser } = props;
    const { userId } = useParams();
    const photoUrl = user && user._id ? `${process.env.REACT_APP_API_URL}/user/photo/${user._id}?${new Date().getTime()}` : defaultImg;


    useEffect(() => {
        getUser(userId, isAuthenticated().token);
        postsByUser(userId, isAuthenticated().token);
    }, [userId, postsByUser]);

    function followUserAction() {
        followUser(isAuthenticated().user._id, isAuthenticated().token, user._id);
    }

    function unFollowUserAction() {
        unFollowUser(isAuthenticated().user._id, isAuthenticated().token, user._id);
    }

    function renderAuthUser() {
        if (user && isAuthenticated().user._id == user._id) {
            return (
                <div className='userAuth'>
                    <Link to={`/user/edit/${user._id}`}><PencilIcon size={18} /></Link>
                    <DeleteUser user={user} deleteUser={deleteUser} />
                </div>
            )
        } else {
            return (
                <div>
                    {following ? (
                        <button type="button" className="btn btn-secondary" onClick={() => unFollowUserAction()}>Unfollow</button>
                    ) : (
                        <button type="button" className="btn btn-primary" onClick={() => followUserAction()}>Follow</button>
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
                                <img src={photoUrl} alt={user && user.name} onError={i => i.target.src = defaultImg} />
                            </div>
                            <div className='headUserInfo'>
                                <h2>{user && user.name} {user && user.nickname && <span>({user.nickname})</span>}</h2>
                                <div className='about'><p>{user && user.about}</p></div>
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
                                {user && user.job && <div className='job'><BriefcaseIcon size={18} /> <span>Work as</span>{user.job}</div>}
                                {user && user.currentCity && <div className='currentCity'><HomeIcon size={18} /> <span>Lives in</span>{user.currentCity}</div>}
                                {user && user.hometown && <div className='hometown'><LocationIcon size={18} /> <span>From</span>{user.hometown}</div>}
                                <div className='date'><ClockIcon size={18} /> <span>Joined</span>{user && new Date(user.createdAt).toDateString()}</div>
                            </div>
                        </div>
                        {user && user.followers.length !== 0 && <Followers followers={user.followers} />}
                        {user && user.following.length !== 0 && <Following following={user.following} />}

                    </div>
                    <div className='col-md-6'>
                        {user && isAuthenticated().user._id == user._id && <CreatePost />}
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
    following: state.user.following,
    userPosts: getPostsSelector(state)
});

export default connect(mapStateToProps, { getUser, deleteUser, postsByUser, deletePost, followUser, unFollowUser })(Profile);