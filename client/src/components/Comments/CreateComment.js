import React, { useEffect, useState } from 'react';
import './styles.css';
import defaultImg from '../../assets/images/profile-pic.png';
import { Link } from 'react-router-dom';
import {
    Form,
} from 'react-bootstrap';
import { isAuthenticated } from '../../helpers/auth-helper';
import {
    PaperAirplaneIcon
} from '@heroicons/react/outline';

const CreateComment = (props) => {
    const { addComment, post } = props;
    const [comment, setComment] = useState('')
    const [className, setClassName] = useState('');
    const [disabledButt, setDisabledButt] = useState('disabled');
    const jwt = isAuthenticated();


    function handleChange(e) {
        if (e.target.value === '') {
            setClassName('');
            setComment('');
            setDisabledButt('disabled');
        } else {
            setClassName('bodyStyleClass');
            setDisabledButt('');
            setComment(e.target.value);
        }
    }

    function addCommentAction(e) {
        e.preventDefault();
        addComment(jwt.user._id, jwt.token, post._id, { text: comment });
        setComment('');
        setClassName('');
        setDisabledButt('disabled');
    }

    return (
        <div className='createComment'>
            <Form onSubmit={addCommentAction}>
                <div className='imgPlace'>
                    <Link to={`/user/${jwt.user._id}`}>
                        <img
                            src={`${process.env.REACT_APP_API_URL}/user/photo/${jwt.user._id}`}
                            onError={i => i.target.src = defaultImg}
                        />
                    </Link>
                </div>
                <div className='commentBody'>
                    <textarea
                        onChange={handleChange}
                        name="body"
                        className={className}
                        placeholder='Write a comment...'
                        value={comment}
                    ></textarea>
                    <button
                        className='addComment'
                        type='submit'
                        disabled={disabledButt}
                    >
                        <PaperAirplaneIcon />
                    </button>
                </div>
            </Form>
        </div>
    )
}

export default CreateComment;