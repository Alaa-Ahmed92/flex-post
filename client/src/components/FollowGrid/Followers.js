import React from 'react';
import './FollowGrid.css';
import { Link } from 'react-router-dom';

const Followers = (props) => {
    const { followers } = props;

    return (
        <div className='userInfo'>
            <div className='userIntro'>
                <div className='userIntroActions'>
                    <h4>Followers</h4>
                </div>
            </div>
            <div className='followUser'>
                <div className='row'>
                    {followers.map((profile, i) => (
                        <div className='col-md-4' key={i}>
                            <Link className='profileLink' to={`/user/${profile._id}`}>
                                <img
                                    className='img-fluid'
                                    src={`${process.env.REACT_APP_API_URL}/user/photo/${profile._id}`}
                                    onError={i => i.target.src = `/user/photo/defaultphoto`}
                                    alt={profile.name}
                                />
                                <span>{profile.name}</span>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
};

export default Followers;