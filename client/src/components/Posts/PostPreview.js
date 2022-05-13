import React, { useEffect, useState } from 'react';
import { HeartFillIcon, KebabHorizontalIcon, HeartIcon, GitCompareIcon, CommentDiscussionIcon, GlobeIcon } from '@primer/octicons-react';
import './style.css';
import moment from 'moment';
import {
    DropdownButton,
    Dropdown
} from 'react-bootstrap';
import { Modal } from 'antd';
import { Link } from 'react-router-dom';
import defaultImg from '../../assets/images/profile-pic.png';
import { isAuthenticated } from '../../helpers/auth-helper';
import { connect } from 'react-redux';
import EditPost from './EditPost';
import { likePost, unlikePost } from '../../actions/postsActions';
import SeeMore from '../SeeMore/SeeMore';

const PostPreview = (props) => {

    const { post, deletePost, likePost, unlikePost } = props;
    const [timestampString, setTimestampString] = useState("");
    const [deleteModal, setDeleteModal] = useState(false);
    const [editPostModal, setEditPostModal] = useState(false);
    const [values, setValues] = useState({
        like: ''
    })

    useEffect(() => {
        const userId = isAuthenticated().user._id;
        let match = post.likes && post.likes.indexOf(userId) !== -1;
        setValues({ like: match });

        const timer = setInterval(
            () => setTimestampString(formatter(post.createdAt)),
            60000
        );
        setTimestampString(formatter(post.createdAt));
        return () => clearInterval(timer);
    }, []);

    const formatter = (timestamp) => {
        return moment(timestamp).fromNow();
    };

    const showEditModal = () => {
        setEditPostModal(true);
    };

    const handleEditCancel = () => {
        setEditPostModal(false);
    };

    const showModal = () => {
        setDeleteModal(true);
    };

    const handleOk = () => {
        deletePost(post._id, isAuthenticated().token);
        setTimeout(() => {
            setDeleteModal(false);
        }, 1000);
    };

    const handleCancel = () => {
        setDeleteModal(false);
    };

    function clickLike() {
        const userId = isAuthenticated().user._id;
        const token = isAuthenticated().token;
        if (values.like) {
            setValues({ like: !values.like });
            unlikePost(userId, token, post._id);
        } else {
            setValues({ like: !values.like });
            likePost(userId, token, post._id);
        }
    }





    function seeMore(body) {
        if (body.length > 550) {
            return body.substring(0, 550)
        } else {
            return body;
        }
    }

    function seeMoreClick(body) {
        return body;
    }

    return (
        <div className='postBox'>
            <div className='postHead'>
                <div className='postOptions'>
                    <div className='postInfo'>
                        <div className='imgPlace'>
                            <Link to={`/user/${post.postedBy._id}`}><img className='img-fluid' src={`${process.env.REACT_APP_API_URL}/user/photo/${post.postedBy._id}?${new Date().getTime()}`} onError={i => i.target.src = defaultImg} /></Link>
                        </div>
                        <div className='namePlace'>
                            <Link to={`/user/${post.postedBy._id}`}>{post.postedBy.name}</Link>
                            <span className='postTime'><GlobeIcon size={14} /> <span>{timestampString}</span></span>
                        </div>
                    </div>
                    {isAuthenticated().user._id === post.postedBy._id && (
                        <div className='postActions'>
                            <DropdownButton title={<KebabHorizontalIcon size={18} />} id="dropdown-menu-align-end">
                                <Dropdown.Item eventKey="1" onClick={showEditModal}>Edit</Dropdown.Item>
                                <Dropdown.Item eventKey="2" onClick={showModal}>Delete</Dropdown.Item>
                            </DropdownButton>
                        </div>
                    )}
                </div>
                <div className='postBody'>
                    <SeeMore>{post.body}</SeeMore>
                    {post.photo && <img src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}?${new Date().getTime()}`} />}
                </div>
            </div>
            <div className='postFooter'>
                <div className='actionBox'>
                    <button className={`${values.like ? 'like' : 'unlike'}`} onClick={() => clickLike()}>
                        <h6>Like</h6>
                        <div className='countIcon'>
                            {values.like ? <HeartFillIcon fill='#FC5D78' size={16} /> : <HeartIcon size={16} />}
                            <span className='countNum'>{post.likes && post.likes.length}</span>
                        </div>
                    </button>
                </div>
                <div className='actionBox'>
                    <button>
                        <h6>Comment</h6>
                        <div className='countIcon'>
                            <CommentDiscussionIcon size={16} />
                            <span className='countNum'>0</span>
                        </div>
                    </button>
                </div>
                <div className='actionBox'>
                    <button>
                        <h6>Share</h6>
                        <div className='countIcon'>
                            <GitCompareIcon size={16} />
                            <span className='countNum'>0</span>
                        </div>
                    </button>
                </div>
            </div>
            <div className='postComments'></div>
            <div className='commentArea'></div>
            <Modal
                title="Delete Post"
                visible={deleteModal}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <p>Are you sure?</p>
            </Modal>
            <EditPost editPostModal={editPostModal} handleEditCancel={handleEditCancel} post={post} />
        </div>
    )
}
const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { likePost, unlikePost })(PostPreview);