import React from 'react';
import CreateComment from './CreateComment';
import CommentView from './CommentView';
import './styles.css';
import { addComment } from '../../actions/postsActions';
import { connect } from 'react-redux';
import DividerWithTitle from '../antdDivider/DividerWithTitle';

const Comments = (props) => {
    const { post, addComment } = props;
    const { comments } = post;

    return (
        <div className='commentsArea'>
            <CreateComment post={post} addComment={addComment} />
            {comments.length > 0 && <DividerWithTitle title={`${comments && comments.length} Comments`} />}
            {comments && comments.map(comment => (
                <CommentView comment={comment} key={comment._id} />
            ))}
        </div>
    )
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { addComment })(Comments);