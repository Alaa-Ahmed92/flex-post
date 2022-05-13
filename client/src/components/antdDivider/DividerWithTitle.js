import React from 'react';
import { Divider } from 'antd';
import './style.css';

const DividerWithTitle = ({ title }) => {
    return (
        <Divider orientation="left" orientationMargin="0">
            {title}
        </Divider>
    )
};

export default DividerWithTitle;