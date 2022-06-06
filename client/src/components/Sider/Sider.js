import React from 'react';
import './Sider.css';
import {
    HomeIcon,
    PlayIcon,
    PhotographIcon,
    BookmarkIcon
} from '@heroicons/react/outline';
import { Link } from 'react-router-dom';

const Sider = (props) => {
    return (
        <div className='sider'>
            <ul>
                <li>
                    <Link to={'/'}>
                        <HomeIcon />
                        <span>Home</span>
                    </Link>
                </li>
                <li>
                    <a href='#'>
                        <PlayIcon />
                        <span>Videos</span>
                    </a>
                </li>
                <li>
                    <Link to={'/photos'}>
                        <PhotographIcon />
                        <span>Photos</span>
                    </Link>
                </li>
                <li>
                    <a href='#'>
                        <BookmarkIcon />
                        <span>Bookmarks</span>
                    </a>
                </li>
            </ul>
        </div>
    )
};

export default Sider;