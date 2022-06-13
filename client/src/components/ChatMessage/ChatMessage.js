import React, { useEffect, useState } from 'react';
import './ChatMessage.css';
import moment from 'moment';

const ChatMessage = ({ message, own }) => {
    const [timestampString, setTimestampString] = useState('');


    useEffect(() => {
        const timer = setInterval(
            () => setTimestampString(formatter(message.createdAt)),
            60000
        );
        setTimestampString(formatter(message.createdAt));
        return () => clearInterval(timer);
    }, []);

    const formatter = (timestamp) => {
        return moment(timestamp).fromNow();
    };

    return (
        <div className={`msgWrap ${own ? 'ownUser' : ''}`}>
            <p className={`messageText`}>{message.text}</p>
            <span>{timestampString}</span>
        </div>
    )
}

export default ChatMessage;