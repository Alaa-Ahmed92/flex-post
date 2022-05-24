import React from 'react';
import PostPreview from './PostPreview';
import PropTypes from 'prop-types';

const PostsList = (props) => {
    const { posts, deletePost } = props;

    return (
        <div>
            {posts && posts.map(post => (
                <PostPreview
                    post={post}
                    key={post._id}
                    deletePost={deletePost}
                />
            ))}
        </div>
    );
};

PostsList.propTypes = {
    deletePost: PropTypes.func.isRequired,
    posts: PropTypes.array.isRequired,
};

export default PostsList;