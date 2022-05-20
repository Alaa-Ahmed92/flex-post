import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import './styles.css';

const CommentView = (props) => {
    const { comment } = props;
    const [timestampString, setTimestampString] = useState("");

    useEffect(() => {
        const timer = setInterval(
            () => setTimestampString(formatter(comment.createdAt)),
            60000
        );
        setTimestampString(formatter(comment.createdAt));
        return () => clearInterval(timer);
    });

    const formatter = (timestamp) => {
        return moment(timestamp).fromNow();
    };

    return (
        <div className='commentsWrapper'>
            <div className='commentView'>
                <div className='userImg'>
                    <Link to={`/user/${comment.postedBy._id}`}>
                        <img
                            src={`${process.env.REACT_APP_API_URL}/user/photo/${comment.postedBy._id}`}
                            onError={i => i.target.src = `/user/photo/defaultphoto`}
                            alt={comment.postedBy.name}
                        />
                    </Link>
                </div>
                <div className='commentBox'>
                    <div className='commentDesc'>
                        <Link to={`/user/${comment.postedBy._id}`}>
                            <h6>{comment.postedBy.name}</h6>
                        </Link>
                        <p>{comment.text}</p>
                    </div>
                    <span>{timestampString}</span>
                </div>
            </div>
        </div>
    )
}

export default CommentView;