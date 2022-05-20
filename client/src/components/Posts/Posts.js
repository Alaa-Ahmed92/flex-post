import React, { Component, useEffect, useState } from 'react';
import PostPreview from './PostPreview';
import CreatePost from './CreatePost';
import { connect } from 'react-redux';
import { getPostsSelector } from '../../selectors/postsSelector';
import { getPosts, deletePost } from '../../actions/postsActions';
import { getUser } from '../../actions/profileActions';
import PostsList from './PostsList';

const Posts = (props) => {
    const { posts, getPosts, deletePost } = props;

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <div className='posts-list'>
            <CreatePost />
            <PostsList
                posts={posts}
                getPosts={getPosts}
                deletePost={deletePost}
            />
        </div>
    );
};

const mapStateToProps = (state) => ({
    posts: getPostsSelector(state)
})

export default connect(mapStateToProps, { getUser, getPosts, deletePost })(Posts);