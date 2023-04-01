import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMessages, getConversation} from '../../actions/chatActions';
import { sendMessage } from '../../api/post';
import Conversation from './Conversation/Conversation';
import Message from './Message/Message';
import './Messenger.css'

import {io} from 'socket.io-client'

const Messenger = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  // const [socket,setSocket] = useState(null);
  const socket = useRef();
  const scrollRef = useRef();
  const conversations = useSelector((state) => state.conversations);
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));
  const userId = user?.user?._id;

  // console.log(userId);
  // console.log(conversations);

  useEffect(()=>{
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage",(data)=>{
      console.log("heeeee");
      console.log(data);
      setArrivalMessage({
        sender : data.senderId,
        text : data.text,
        createdAt : Date.now(),
      })
    })
  },[])

  useEffect(()=>{
    arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) &&
    setMessages((prev)=>[...prev,arrivalMessage]);
  },[arrivalMessage,currentChat]);

  useEffect(()=>{
    socket.current.emit("addUser",userId);
    socket.current?.on("getUsers",(users)=>{
      setOnlineUsers(users);
      // console.log(users);
    });
  },[userId]);

  useEffect(() => {
    dispatch(getConversation(userId))
  }, [userId, dispatch]);

  useEffect(() => {
    const getMessages = async () => {
      const messages = await dispatch(fetchMessages(currentChat?._id));
      setMessages(messages);
    }
    getMessages();
  }, [currentChat]);

  useEffect(()=>{
    socket.current?.on("welcome",(message)=>{
      console.log(message);
    })
  },[socket]);

  console.log(socket);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const message = {
      conversationId:currentChat?._id,
      sender:userId,
      text:newMessage
    };

    const receiverId = currentChat?.members.find((member)=>member!==userId);

    socket.current.emit("sendMessage",{
      senderId : userId,
      receiverId : receiverId,
      text : newMessage
    })

    try {
      const {data} = await sendMessage(message);
      setMessages([...messages,data]);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
    // const response = await sendMessage(message);
    // 
  }

  useEffect(()=>{
      scrollRef.current?.scrollIntoView({behavior:'smooth'});
  },[messages]);
  // console.log("messages are :" , messages);

  return (
    <div className="messenger">
      <div className="chatMenu">
        <div className="chatMenuWrapper">
          <input placeholder='Search for friends' className='chatMenuInput' />
          {conversations?.map((convo) => (
            <div onClick={() => setCurrentChat(convo)}>
              <Conversation key={userId} conversation={convo} currentUserId={userId} onlineUsers={onlineUsers}/>
            </div>
          ))}
          {/* <Conversation/> */}
        </div>
      </div>

      <div className="chatBox">
        <div className="chatBoxWrapper">
          <div className="chatBoxTop">
            {currentChat ? (
              <>
                {messages?.map((message) => (
                  <div ref={scrollRef}>
                    <Message key={message._id} own={message?.sender === userId} message={message} />
                  </div>
                ))}
              </>
            ) : <h2 style={{ textAlign: 'center', cursor: 'default' }}>Open Chat to start conversation</h2>
            }
          </div>
          {currentChat &&
          <div className="chatBoxBottom">
            <textarea 
              className="chatMessageInput" 
              placeholder='write something' 
              onChange={(e) => setNewMessage(e.target.value)}
              value={newMessage}
            ></textarea>
              <button className="chatSubmitButton" onClick={handleSendMessage} disabled={!newMessage}>send</button>
              </div>
            }
        </div>

      </div>
    </div>
  );
};

export default Messenger;