import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getUser, deleteUser, followUser, unFollowUser } from './../actions/profileActions';
import { postsByUser, deletePost } from './../actions/postsActions';
import { isAuthenticated } from '../helpers/auth-helper';
import { getUserSelector } from '../selectors/userSelector';
import { getPostsSelector } from '../selectors/postsSelector';
import CreatePost from './../components/Posts/CreatePost';
import PostPreview from '../components/Posts/PostPreview';
import './styles.css';
import { Link, useParams } from 'react-router-dom';
import DeleteUser from '../components/Modals/DeleteUser';
import { message } from 'antd';
import Followers from '../components/FollowGrid/Followers';
import Following from '../components/FollowGrid/Following';
import PropTypes from 'prop-types';
import {
    DropdownButton
} from 'react-bootstrap';
import {
    PencilAltIcon,
    DotsHorizontalIcon,
    BriefcaseIcon,
    LocationMarkerIcon,
    HomeIcon,
    ClockIcon
} from '@heroicons/react/outline';


const Profile = (props) => {
    const { following, user, getUser, deleteUser, postsByUser, userPosts, deletePost, followUser, unFollowUser } = props;
    const { userId } = useParams();
    // const photoUrl = user && user._id ? `${process.env.REACT_APP_API_URL}/user/photo/${user._id}?${new Date().getTime()}` : `/user/photo/defaultphoto`;

    useEffect(() => {
        getUser(userId, isAuthenticated().token);
        postsByUser(userId, isAuthenticated().token);
    }, [userId, postsByUser]);

    function followUserAction() {
        followUser(isAuthenticated().user._id, isAuthenticated().token, user._id);
        message.success(`Following ${user.name}`);
    }

    function unFollowUserAction() {
        unFollowUser(isAuthenticated().user._id, isAuthenticated().token, user._id);
        message.error(`Unfollowing ${user.name}`);
    }

    function renderAuthUser() {
        if (user && isAuthenticated().user._id === user._id) {
            return (
                <div className='userAuth'>
                    <DropdownButton title={<DotsHorizontalIcon />} id="dropdown-menu-align-end">
                        <Link className='dropdown-item' to={`/user/edit/${user._id}`}><PencilAltIcon /> <span>Edit Profile</span></Link>
                        <DeleteUser className='dropdown-item' user={user} deleteUser={deleteUser} />
                    </DropdownButton>
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
                                <img src={user && user._id && `${process.env.REACT_APP_API_URL}/user/photo/${user._id}?${new Date().getTime()}`}
                                    alt={user && user.name}
                                    onError={i => i.target.src = `/user/photo/defaultphoto`}
                                />
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
                                {user && user.job && <div className='job'><BriefcaseIcon /> <span>Work as</span>{user.job}</div>}
                                {user && user.currentCity && <div className='currentCity'><LocationMarkerIcon /> <span>Lives in</span>{user.currentCity}</div>}
                                {user && user.hometown && <div className='hometown'><HomeIcon /> <span>From</span>{user.hometown}</div>}
                                <div className='date'><ClockIcon /> <span>Joined</span>{user && new Date(user.createdAt).toDateString()}</div>
                            </div>
                        </div>
                        {user && user.followers.length !== 0 && <Followers followers={user.followers} />}
                        {user && user.following.length !== 0 && <Following following={user.following} />}

                    </div>
                    <div className='col-md-6'>
                        {user && isAuthenticated().user._id === user._id && <CreatePost />}
                        {userPosts && userPosts.length !== 0 ? userPosts.map(post => (
                            <PostPreview post={post} key={post._id} deletePost={deletePost} />
                        )) : <div style={{ fontSize: '20px' }}>No Posts Yet.</div>}
                    </div>
                </div>
            </div>
        </div>
    )
};

Profile.propTypes = {
    user: PropTypes.object,
    deletePost: PropTypes.func.isRequired,
    deleteUser: PropTypes.func.isRequired,
    followUser: PropTypes.func.isRequired,
    getUser: PropTypes.func.isRequired,
    postsByUser: PropTypes.func.isRequired,
    unFollowUser: PropTypes.func.isRequired,
    following: PropTypes.bool,
    userPosts: PropTypes.array,
};

const mapStateToProps = state => ({
    user: getUserSelector(state),
    following: state.user.following,
    userPosts: getPostsSelector(state)
});

export default connect(mapStateToProps, { getUser, deleteUser, postsByUser, deletePost, followUser, unFollowUser })(Profile);