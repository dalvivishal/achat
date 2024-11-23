import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../ChatWindow.css';

const ChatWindow = ({ chatName, messages = [], setMessages, senderId, recipientId }) => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const sendMessage = async () => {
    if (input.trim()) {
      const currentTime = new Date().toLocaleTimeString();
      const newMessage = {
        text: input,
        sender: 'me',
        time: currentTime,
        id: Date.now(),
      };

      setMessages((prevMessages) => Array.isArray(prevMessages) ? [...prevMessages, newMessage] : [newMessage]);
      setInput('');

      setLoading(true);

      try {
        await axios.post("http://localhost:5000/protected/send", {
          sender_id: senderId,
          message: input.trim(),
          recipient_id: recipientId,
        });
      } catch (error) {
        console.error("Error sending message:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  // Automatically scroll to the bottom when a new message is added
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="chatWindowContainer">
      <header className="chatWindowHeader">
        <h2>{chatName}</h2>
      </header>
      <div className="messagesContainer">
        {messages && messages.length > 0 && messages.map((msg) => (
          <div key={msg.id} className={`message ${msg.sender === 'me' ? 'sent' : 'received'}`}>
            <p className="messageText">{msg.text}</p>
            <span className="messageTime">{msg.time}</span>
          </div>
        ))}
        <div ref={messagesEndRef} /> {/* Keeps track of the end of messages */}
      </div>
      <footer className="chatWindowFooter">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="messageInput"
        />
        <button
          onClick={sendMessage}
          className="sendButton"
          disabled={loading}>
          {loading ? 'Sending...' : 'Send'}
        </button>
      </footer>
    </div>
  );
};

export default ChatWindow;
