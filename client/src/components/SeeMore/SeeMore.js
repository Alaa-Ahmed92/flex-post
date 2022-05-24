import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './SeeMore.css';

const SeeMore = ({ children }) => {
    const text = children;
    const limitedChar = 550;
    const [isSeeMore, setIsSeeMore] = useState(false);

    function toggleSeeMore() {
        setIsSeeMore(true);
    }

    if (text.length < limitedChar) {
        return (
            <p className='text'>
                {text}
            </p>
        );
    }

    return (
        <p className='text'>
            {isSeeMore ? text : text.slice(0, limitedChar)}
            <span onClick={toggleSeeMore} className="seeMoreLabel">
                {isSeeMore ? '' : '...See more'}
            </span>
        </p>
    )
};

SeeMore.propTypes = {
    children: PropTypes.string.isRequired
};

export default SeeMore;