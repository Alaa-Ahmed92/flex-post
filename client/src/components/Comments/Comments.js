import React from 'react';
import CreateComment from './CreateComment';
import CommentView from './CommentView';
import './styles.css';
import { addComment } from '../../actions/postsActions';
import { connect } from 'react-redux';
import DividerWithTitle from '../antdDivider/DividerWithTitle';
import { isAuthenticated } from '../../helpers/auth-helper';
import PropTypes from 'prop-types';
import {
    ChatAlt2Icon
} from '@heroicons/react/solid';

const Comments = (props) => {
    const { post, addComment } = props;
    const { comments } = post;

    function renderCreateComment() {
        if (post.commentsOff && post.postedBy._id !== isAuthenticated().user._id) {
            return <div className='commentsOff'><span className='icon'><ChatAlt2Icon /></span> The comments are turned off for this post.</div>;
        } else if (post.commentsOff || !post.commentsOff && post.postedBy._id === isAuthenticated().user._id) {
            return (
                <>
                    {post.commentsOff && <div className='commentsOff'><span className='icon'><ChatAlt2Icon /></span> You turned off commenting for this post.</div>}
                    <CreateComment post={post} addComment={addComment} />
                </>
            )
        } else if (!post.commentsOff && post.postedBy._id !== isAuthenticated().user._id) {
            return <CreateComment post={post} addComment={addComment} />;
        }
    }

    return (
        <div className='commentsArea'>
            {renderCreateComment()}
            {comments.length > 0 && <DividerWithTitle title={`${comments && comments.length} Comments`} />}
            {comments && comments.map(comment => (
                <CommentView comment={comment} key={comment._id} />
            ))}
        </div>
    )
};

Comments.propTypes = {
    post: PropTypes.object.isRequired,
    addComment: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { addComment })(Comments);