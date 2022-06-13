import React from 'react';
import { Button } from 'react-bootstrap';
import './ChatMessage.css';

const SendMessage = ({ sendMessage }) => {
    return (
        // <button className='sendMsg' onClick={sendMessage}>Send Message</button>
        <Button className='sendMsg' onClick={sendMessage} variant="secondary">Send Message</Button>
    )
}

export default SendMessage;