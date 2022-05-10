import React, { useEffect, useState } from 'react';
import PostPreview from './PostPreview';
import CreatePost from './CreatePost';
import { connect } from 'react-redux';
import { getPostsSelector } from '../../selectors/postsSelector';
import { getPosts, deletePost } from '../../actions/postsActions';
import { getUser } from '../../actions/profileActions';

const Posts = (props) => {
    const { posts, getPosts, deletePost } = props;

    useEffect(() => {
        getPosts();
    }, [getPosts]);

    return (
        <div className='posts-list'>
            <CreatePost />
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

const mapStateToProps = (state) => ({
    posts: getPostsSelector(state)
})

export default connect(mapStateToProps, { getUser, getPosts, deletePost })(Posts);