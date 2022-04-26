import React from 'react';
import { KebabHorizontalIcon, HeartIcon, GitCompareIcon, CommentDiscussionIcon, GlobeIcon } from '@primer/octicons-react';
import './style.css';
import moment from 'moment';
import {
    InputGroup,
    DropdownButton,
    Dropdown,
    FormControl
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import defaultImg from '../../assets/images/profile-pic.png';

const PostPreview = (props) => {
    const { post } = props;

    return (
        <div className='postBox'>
            <div className='postHead'>
                <div className='postOptions'>
                    <div className='postInfo'>
                        <div className='imgPlace'>
                            <Link to={`/user/${post.postedBy._id}`}><img className='img-fluid' src={post.postedBy.photo} onError={i => i.target.src = defaultImg} /></Link>
                        </div>
                        <div className='namePlace'>
                            <Link to={`/user/${post.postedBy._id}`}>{post.postedBy.name}</Link>
                            <span className='postTime'><GlobeIcon size={14} /> <span>{moment(post.createdAt).fromNow()}</span></span>
                        </div>
                    </div>
                    <div className='postActions'>
                        <DropdownButton title={<KebabHorizontalIcon size={18} />} id="dropdown-menu-align-end">
                            <Dropdown.Item eventKey="1">Edit</Dropdown.Item>
                            <Dropdown.Item eventKey="2">Delete</Dropdown.Item>
                        </DropdownButton>
                    </div>
                </div>
                <div className='postBody'>
                    <p>{post.body}</p>
                </div>
            </div>
            <div className='postFooter'>
                <div className='actionBox'>
                    <button>
                        <h6>Like</h6>
                        <div className='countIcon'>
                            <HeartIcon size={16} />
                            <span className='countNum'>0</span>
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
        </div>
    )
}

export default PostPreview;