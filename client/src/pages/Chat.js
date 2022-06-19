import React, { useEffect, useRef, useState } from 'react';
import './styles.css';
import {
    SearchIcon,
    PaperAirplaneIcon
} from '@heroicons/react/outline';
import Conversation from '../components/Conversation/Conversation';
import ChatMessage from '../components/ChatMessage/ChatMessage';
import { connect } from 'react-redux';
import { getConversations } from '../actions/chatActions';
import { isAuthenticated } from '../helpers/auth-helper';
import { getConversationsSelector } from '../selectors/chatSelector';
import { io } from "socket.io-client";

const Chat = (props) => {
    const auth = isAuthenticated();
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMsg, setNewMsg] = useState('');
    const [arriveMsg, setArriveMsg] = useState(null);
    const [disabledMsg, setDisabledMsg] = useState('');
    const socket = useRef();
    const [currentChatUser, setCurrentChatUser] = useState(null);
    const { getConversations, conversations } = props;

    useEffect(() => {
        socket.current = io('ws://localhost:8080');
        socket.current.on('getMessage', data => {
            setArriveMsg({
                senderId: data.senderId,
                text: data.text,
                createdAt: Date.now()
            })
        });
    }, []);

    useEffect(() => {
        arriveMsg && currentChat?.members.includes(arriveMsg.senderId) && setMessages((prev) => [...prev, arriveMsg])
    }, [arriveMsg, currentChat]);

    useEffect(() => {
        socket.current.emit('addUser', auth.user._id);
        socket.current.on('getUsers', users => {
            // console.log(users);
        });
    }, [auth.user]);

    useEffect(() => {
        getConversations(auth.user._id, auth.token);
    }, [auth.user._id, getConversations, auth.token]);

    useEffect(() => {
        setDisabledMsg('disabled');
        setNewMsg('');
        const getMessages = async () => {
            try {
                const reso = await fetch(`${process.env.REACT_APP_API_URL}/message/${currentChat?._id}`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${auth.token}`
                    }
                }).then(res => res.json())
                setMessages(reso);
            } catch (err) {
                console.log(err);
            }
        }
        getMessages();
    }, [currentChat, auth.token]);

    // 
    useEffect(() => {
        const friendId = currentChat?.members.find(c => c !== auth.user._id);
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
                setCurrentChatUser(reso);
            } catch (err) {
                console.log(err);
            }
        }
        getUser();
    }, [currentChat, auth.token, auth.user._id]);
    // 

    function handleNewMsg(e) {
        let value = e.target.value;
        setNewMsg(value);
        if (e.target.value === '') {
            setDisabledMsg('disabled');
        } else {
            setDisabledMsg('');
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const recevierId = currentChat?.members.find(user => user !== auth.user._id);

        socket.current.emit('sendMessage', {
            senderId: auth.user._id,
            recevierId,
            text: newMsg
        });

        try {
            const reso = await fetch(`${process.env.REACT_APP_API_URL}/message`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth.token}`
                },
                body: JSON.stringify({
                    conversationId: currentChat?._id,
                    senderId: auth.user._id,
                    text: newMsg
                })
            }).then(res => res.json())
            setMessages([...messages, reso.result]);
            setDisabledMsg('disabled');
            setNewMsg('');
        } catch (err) {
            console.log(err);
        }
    }
    const AlwaysScrollToBottom = () => {
        const scrollRef = useRef();
        useEffect(() => scrollRef.current.scrollIntoView({ behavior: "smooth" }));
        return <div ref={scrollRef} />;
    };

    return (
        <div className='chat page'>
            <div className='container'>
                <div className='chatWrapper'>
                    <div className='conversations'>
                        <div className='convSearch'>
                            <SearchIcon />
                            <input
                                placeholder='Search contact'
                            />
                        </div>
                        <div className='convPeople'>
                            {conversations.map(conversation => (
                                <div key={conversation._id} onClick={() => setCurrentChat(conversation)}>
                                    <Conversation
                                        currentChat={currentChat?._id}
                                        conversation={conversation}
                                        auth={auth}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='messages'>
                        {currentChat ? (
                            <>
                                <div className='messagesHead'>
                                    <div className='userPhoto'>
                                        <img src={`${process.env.REACT_APP_API_URL}/user/photo/${currentChatUser?._id}?${new Date().getTime()}`}
                                            alt={currentChatUser?.name}
                                            onError={i => i.target.src = `${process.env.REACT_APP_API_URL}/user/photo/defaultphoto`}
                                        />
                                    </div>
                                    <div className='userInfo'>
                                        <h6>{currentChatUser.name}</h6>
                                        <span className='userStatus online'>Online</span>
                                    </div>
                                </div>
                                <div className='messageBody'>
                                    <div className='messageContent'>
                                        <div className='messageView'>
                                            <div className='msgsWrapper'>
                                                {messages.map(m => (
                                                    <ChatMessage key={m._id} message={m} own={m.senderId === auth.user._id} />
                                                ))}
                                                <AlwaysScrollToBottom />
                                            </div>

                                        </div>
                                    </div>
                                    <div className='messageSend'>
                                        <textarea
                                            placeholder='Write your message...'
                                            onChange={handleNewMsg}
                                            value={newMsg}
                                        ></textarea>
                                        <button onClick={handleSubmit} disabled={disabledMsg}><PaperAirplaneIcon /></button>
                                        
                                    </div>
                                </div>
                            </>
                        ) : <div className='noCurrentChat'>Open the conversation to start a chat.</div>}
                    </div>
                </div>
            </div>
        </div>
    )
};

const mapStateToProps = (state) => ({
    conversations: getConversationsSelector(state)
});

export default connect(mapStateToProps, { getConversations })(Chat);