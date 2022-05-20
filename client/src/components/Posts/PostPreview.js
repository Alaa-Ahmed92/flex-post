import React, { useEffect, useState } from 'react';
import './style.css';
import moment from 'moment';
import {
    DropdownButton,
    Dropdown
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../../helpers/auth-helper';
import { connect } from 'react-redux';
import { likePost, unlikePost } from '../../actions/postsActions';
import SeeMore from '../SeeMore/SeeMore';
import Comments from '../Comments/Comments';
import {
    LightBulbIcon,
    PencilAltIcon,
    BanIcon,
    TrashIcon,
    DotsHorizontalIcon,
    GlobeIcon,
    HeartIcon,
    AnnotationIcon,
    ShareIcon
} from '@heroicons/react/outline';
import DeletePost from '../Modals/DeletePost';
import EditPost from '../Modals/EditPost';

const PostPreview = (props) => {

    const { post, deletePost, likePost, unlikePost } = props;
    const [timestampString, setTimestampString] = useState("");
    const [commentArea, setcommentArea] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [editPostModal, setEditPostModal] = useState(false);
    const photoUrl = post && post.postedBy._id ? `${process.env.REACT_APP_API_URL}/user/photo/${post.postedBy._id}?${new Date().getTime()}` : `/user/photo/defaultphoto`;
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

    function toggleCommentArea() {
        setcommentArea(!commentArea);
    }

    return (
        <div className='postBox'>
            <div className='postHead'>
                <div className='postOptions'>
                    <div className='postInfo'>
                        <div className='imgPlace'>
                            <Link
                                to={`/user/${post.postedBy._id}`}>
                                <img
                                    className='img-fluid'
                                    src={photoUrl}
                                    onError={i => i.target.src = `/user/photo/defaultphoto`}
                                    alt={post.postedBy.name}
                                />
                            </Link>
                        </div>
                        <div className='namePlace'>
                            <Link to={`/user/${post.postedBy._id}`}>{post.postedBy.name}</Link>
                            <span className='postTime'><GlobeIcon /> <span>{timestampString}</span></span>
                        </div>
                    </div>
                    {isAuthenticated().user._id === post.postedBy._id && (
                        <div className='postActions'>
                            <DropdownButton title={<DotsHorizontalIcon />} className="dropdown-menu-lg-end" id="dropdown-menu-align-end">
                                <Dropdown.Item eventKey="1"><LightBulbIcon /> <span>Pin Post</span></Dropdown.Item>
                                <Dropdown.Item eventKey="2" onClick={showEditModal}><PencilAltIcon /> <span>Edit Post</span></Dropdown.Item>
                                <Dropdown.Item eventKey="3"><BanIcon /> <span>Turn Off Comments</span></Dropdown.Item>
                                <Dropdown.Item eventKey="4" onClick={showModal}><TrashIcon /> <span>Delete Post</span></Dropdown.Item>
                            </DropdownButton>
                        </div>
                    )}
                </div>
                <div className='postBody'>
                    <SeeMore>{post.body}</SeeMore>
                    {post.photo && <img alt="postPhoto" src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}?${new Date().getTime()}`} />}
                </div>
            </div>
            <div className='postFooter'>
                <div className='actionBox'>
                    <button className={`${values.like ? 'like' : 'unlike'}`} onClick={() => clickLike()}>
                        <h6>Like</h6>
                        <div className='countIcon'>
                            {values.like ? <HeartIcon fill='#FC5D78' /> : <HeartIcon />}
                            <span className='countNum'>{post.likes && post.likes.length}</span>
                        </div>
                    </button>
                </div>
                <div className='actionBox'>
                    <button onClick={() => toggleCommentArea()}>
                        <h6>Comment</h6>
                        <div className='countIcon'>
                            <AnnotationIcon />
                            <span className='countNum'>{post.comments.length}</span>
                        </div>
                    </button>
                </div>
                <div className='actionBox'>
                    <button>
                        <h6>Share</h6>
                        <div className='countIcon'>
                            <ShareIcon size={18} />
                            <span className='countNum'>0</span>
                        </div>
                    </button>
                </div>
            </div>
            {commentArea && <Comments post={post} />}
            <DeletePost
                visible={deleteModal}
                onOk={handleOk}
                onCancel={handleCancel}
            />
            <EditPost
                editPostModal={editPostModal}
                handleEditCancel={handleEditCancel}
                post={post}
            />
        </div>
    )
}
const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { likePost, unlikePost })(PostPreview);