import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import {
    Form
} from 'react-bootstrap';
import { isAuthenticated } from '../../helpers/auth-helper';
import { updatePost } from '../../actions/postsActions';
import { connect } from 'react-redux';

const EditPost = (props) => {
    const { post, editPostModal, updatePost, handleEditCancel } = props;
    const [postPhoto, setPostPhoto] = useState('');
    const [validError, setValidError] = useState('');
    const [postValues, setPostValues] = useState('');

    useEffect(() => {
        if (post) {
            setPostValues({
                body: post.body || '',
                photo: post.photo || ''
            })
        }
    }, []);

    function handleChange(e) {
        setPostValues({ ...postValues, ...postPhoto, [e.target.name]: e.target.value });
    };

    function handleUploadPhoto(e) {
        setPostPhoto({ 'photo': e.target.files[0] });
    }

    function handleSubmit(e) {
        e.preventDefault();

        const token = isAuthenticated().token;
        let postData = new FormData();

        postValues.body && postData.append('body', postValues.body);
        postPhoto.photo && postData.append('photo', postPhoto.photo);

        if (isValid()) {
            setTimeout(() => {
                updatePost(post._id, token, postData);
                handleEditCancel();
            }, 1000);
        }
    };

    function isValid() {
        const { body } = postValues;

        if (body.length !== 0) {
            setValidError('');
            return true;
        } else {
            setValidError('Should be fill');
            return false;
        }
    }

    function handleCancel(e) {
        e.preventDefault();
        setPostValues({
            body: post.body || ''
        })
        handleEditCancel();
    }

    return (
        <Modal
            title="Edit Post"
            visible={editPostModal}
            footer={false}
            closable={false}
            width={700}
            className={'editPostModal'}
        >
            <Form onSubmit={handleSubmit}>
                <textarea className='form-control' name='body' value={postValues.body} onChange={handleChange}></textarea>
                {validError && <div>{validError}</div>}
                <input
                    type="file"
                    className="form-control"
                    onChange={handleUploadPhoto}
                    accept='image/*'
                />
                {post && post.photo && <img src={postPhoto.photo ? URL.createObjectURL(postPhoto.photo) : `${process.env.REACT_APP_API_URL}/post/photo/${post._id}`} />}
                <div className='footerActions'>
                    <button className='ant-btn ant-btn-default' onClick={handleCancel}><span>Cancel</span></button>
                    <button className='ant-btn ant-btn-primary' type='submit'><span>Update!</span></button>
                </div>
            </Form>
        </Modal>
    )
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { updatePost })(EditPost);
