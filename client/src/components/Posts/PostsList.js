import React from 'react';
import PostPreview from './PostPreview';

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

export default PostsList;