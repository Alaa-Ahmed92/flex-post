import React from 'react';

const Follow = (props) => {
    const { following, followUser, unFollowUser } = props;

    return (
        <div>
            {following ? (
                <button type="button" className="btn btn-secondary" onClick={unFollowUser}>Unfollow</button>
            ) : (
                <button type="button" className="btn btn-primary" onClick={followUser}>Follow</button>
            )}
        </div>
    )
};

export default Follow;
