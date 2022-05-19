import React, { useEffect, useState, useRef } from 'react';
import './style.css';
import { isAuthenticated } from '../../helpers/auth-helper';
import defaultImg from '../../assets/images/profile-pic.png';
import { Link } from 'react-router-dom';
import { createPost } from '../../actions/postsActions';
import { connect } from 'react-redux';
import {
    PhotographIcon
} from '@heroicons/react/outline';
import {
    Form,
} from 'react-bootstrap';

const CreatePost = (props) => {
    const formEl = useRef(null);
    const authUser = isAuthenticated();
    const [className, setClassName] = useState('');
    const [disabledButt, setDisabledButt] = useState('');
    const [postPhoto, setPostPhoto] = useState('');
    const [postValues, setPostValues] = useState({
        body: '',
        error: '',
        user: {}
    });

    useEffect(() => {
        setDisabledButt('disabled');
        setPostValues({ ...postValues, user: authUser && authUser.user });
    }, []);

    function handleChange(e) {
        setPostValues({ ...postValues, [e.target.name]: e.target.value });
        if (e.target.value === '') {
            setClassName('');
            setDisabledButt('disabled');
        } else {
            setClassName('bodyStyleClass');
            setDisabledButt('');
        }
    }

    function handleUploadPhoto(e) {
        setPostPhoto({ 'photo': e.target.files[0] })
    }

    function addPost(e) {
        e.preventDefault();
        let postData = new FormData();
        postData.append('body', postValues.body);
        postData.append('photo', postPhoto.photo);
        props.createPost(authUser.user._id, isAuthenticated().token, postData);
        setPostValues({ body: '' });
        setClassName('');
        setPostPhoto('');
        setDisabledButt('disabled');
        formEl.current.reset();
    }

    return (
        <div className='createPost userInfo'>
            <Form ref={formEl} onSubmit={addPost}>
                <div className='imgPlace'>
                    <Link to={`/user/${authUser && authUser.user._id}`}>
                        <img
                            src={`${process.env.REACT_APP_API_URL}/user/photo/${authUser && authUser.user._id}?${new Date().getTime()}`}
                            onError={i => i.target.src = defaultImg}
                        />
                    </Link>
                </div>
                <div className='postBody'>
                    <textarea
                        onChange={handleChange}
                        name="body"
                        className={className}
                        placeholder={`What's on your mind, ${authUser && authUser.user.name}?`}
                        value={postValues.body}
                    ></textarea>
                    <div className='custImg'>
                        <input
                            id="postImg"
                            type="file"
                            className="form-control"
                            onChange={handleUploadPhoto}
                            accept='image/*'
                        />
                        <label htmlFor="postImg"><PhotographIcon /><span>{postPhoto.photo ? postPhoto.photo.name : 'No photo chosen'}</span></label>
                        {postPhoto && postPhoto.photo && (
                            <div className='previewImg'>
                                <img
                                    src={URL.createObjectURL(postPhoto.photo)}
                                    alt={postPhoto.photo.name}
                                />
                            </div>
                        )}

                    </div>
                </div>
                <button className='addPost' type='submit' disabled={disabledButt}>Post</button>
            </Form>
        </div>
    )
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { createPost })(CreatePost);