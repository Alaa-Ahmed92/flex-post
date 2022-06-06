import React, { useEffect, useState } from 'react';
import FindPeople from '../components/FindPeople/FindPeople';
import { getPosts, deletePost } from '../actions/postsActions';
import Sider from '../components/Sider/Sider';
import { Row, Col } from 'antd';
import PostsList from '../components/Posts/PostsList';
import { getPhotosPostsSelector } from '../selectors/postsSelector';
import { connect } from 'react-redux';

const Photos = (props) => {
    const { getPosts, deletePost, photosPosts } = props;

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <div className='photos-page page'>
            <div className='container'>
                <Row gutter={16}>
                    <Col className="gutter-row" span={5}>
                        <Sider />
                    </Col>
                    <Col className="gutter-row" span={12}>
                        {!photosPosts && <div>No Photos Posts.</div>}
                        <PostsList posts={photosPosts} deletePost={deletePost} />
                    </Col>
                    <Col className="gutter-row" span={7}>
                        <FindPeople />
                    </Col>
                </Row>
            </div>
        </div>
    )
};

const mapStateToProps = (state) => ({
    photosPosts: getPhotosPostsSelector(state)
})

export default connect(mapStateToProps, { getPosts, deletePost })(Photos);
