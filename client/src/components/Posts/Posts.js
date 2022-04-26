import React, { useEffect } from 'react';
import PostPreview from './PostPreview';
import { connect } from 'react-redux';
import { getPostsSelector } from '../../selectors/postsSelector';
import { getPosts } from '../../actions/postsActions';

const Posts = (props) => {
    const { posts, getPosts } = props;

    useEffect(() => {
        getPosts();
    }, [getPosts])

    return (
        <div className='posts-list'>
            <div className='row'>
                <div className='col-lg-6'>
                    {posts && posts.map(post => (
                        <PostPreview post={post} key={post._id} />
                    ))}
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    posts: getPostsSelector(state)
})

export default connect(mapStateToProps, { getPosts })(Posts);