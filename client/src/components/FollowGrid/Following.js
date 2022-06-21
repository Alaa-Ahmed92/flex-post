import React from 'react';
import './FollowGrid.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { createImg } from '../../Utils';

const Following = (props) => {
    const { following } = props;

    return (
        <div className='userInfo'>
            <div className='userIntro'>
                <div className='userIntroActions'>
                    <h4>Following</h4>
                </div>
            </div>
            <div className='followUser'>
                <div className='row'>
                    {following.map((profile, i) => (
                        <div className='col-md-4' key={i}>
                            <Link className='profileLink' to={`/user/${profile._id}`}>
                                <img
                                    className='img-fluid'
                                    src={`${process.env.REACT_APP_API_URL}/user/photo/${profile._id}`}
                                    onError={i => i.target.src = createImg(110, profile.name)}
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

Following.propTypes = {
    following: PropTypes.array.isRequired
};

export default Following;