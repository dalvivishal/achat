import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../components/SideBar'
import ChatWindow from '../components/ChatWindow'
import { decryptUserId } from '../AuthContext/cryptoUtils';
import '../ChatPage.css';

const ChatPage = () => {
  const { encryptedUserIds } = useParams();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [loggedInUserId, chattingUserId] = decryptUserId(encryptedUserIds) || [];
  console.log("loggedInUserId", loggedInUserId);
  console.log("chattingUserId", chattingUserId);

  useEffect(() => {
    const fetchMessages = () => {
      if (!loggedInUserId || !chattingUserId) {
        setError("Invalid user IDs");
        setLoading(false);
        return;
      }

      setLoading(true);
      setLoading(false);

      axios
        .get(`http://localhost:5000/chat/messages/${loggedInUserId}/${chattingUserId}`)
        .then((response) => {
          setMessages(response.data || []);
        })
        .catch((err) => {
          setError("Failed to fetch messages");
          console.error(err);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    fetchMessages();
  }, [loggedInUserId, chattingUserId]);

  if (loading) return (<div>Loading messages...</div>);
  if (error) return (<div>{error}</div>);

  return (
    <div className="chatPageContainer">
      <Sidebar /> {/* Sidebar is not affected by state change in ChatPage */}
      <ChatWindow
        chatName={`Chat with User ${chattingUserId}`}
        messages={messages}
        setMessages={setMessages}
        senderId={loggedInUserId}
        recipientId={chattingUserId}
      />
    </div>
  );
};

export default ChatPage;
