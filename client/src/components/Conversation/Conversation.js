import React, { useEffect, useState } from 'react';
import './Conversation.css';

const Conversation = (props) => {
    const [user, setUser] = useState(null);
    const { conversation, auth, currentChat } = props;

    useEffect(() => {
        const friendId = conversation.members.find(c => c !== auth.user._id);
        const getUser = async () => {
            try {
                const reso = await fetch(`${process.env.REACT_APP_API_URL}/user/${friendId}`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${auth.token}`
                    }
                }).then(res => res.json())
                setUser(reso);
            } catch (err) {
                console.log(err);
            }
        }
        getUser();
    }, [auth.user, conversation, auth.token]);

    // console.log(conversation)

    // if (props.messages.length === 0) return null


    return (
        <div className={`convUser ${currentChat === conversation._id ? 'currentChatActive' : ''}`}>
            <div className='userPhoto'>
                <img src={`${process.env.REACT_APP_API_URL}/user/photo/${user?._id}?${new Date().getTime()}`}
                    alt={user?.name}
                    onError={i => i.target.src = `${process.env.REACT_APP_API_URL}/user/photo/defaultphoto`}
                />
            </div>
            <div className='userInfo'>
                <h6>{user?.name}</h6>
                <span className='userStatus online'>Online</span>
            </div>
        </div>


    )
}

export default Conversation;