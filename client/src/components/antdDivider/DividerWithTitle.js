import React from 'react';
import { Divider } from 'antd';
import PropTypes from 'prop-types';
import './style.css';

const DividerWithTitle = ({ title }) => {
    return (
        <Divider orientation="left" orientationMargin="0">
            {title}
        </Divider>
    )
};

DividerWithTitle.propTypes = {
    title: PropTypes.string.isRequired
};

export default DividerWithTitle;