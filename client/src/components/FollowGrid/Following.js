import React from 'react';
import './FollowGrid.css';
import { Link } from 'react-router-dom';
import defaultImg from '../../assets/images/profile-pic.png';

const Following = (props) => {
    const { following } = props;

    return (
        <div className='userInfo'>
            <div className='userIntro'>
                <div className='userIntroActions'>
                    <h4>Following</h4>
                </div>
                <div className='followUser'>
                    <div className='row'>
                        {following.map((profile, i) => (
                            <div className='col-md-6' key={i}>
                                <Link className='profileLink' to={`/user/${profile._id}`}>
                                    <img
                                        className='img-fluid'
                                        src={`${process.env.REACT_APP_API_URL}/user/photo/${profile._id}`}
                                        onError={i => i.target.src = defaultImg}
                                    />
                                    <span>{profile.name}</span>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Following;