import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { decryptUserId } from '../AuthContext/cryptoUtils';
import axios from 'axios';

const Chat = () => {
    const { encryptedUserIds } = useParams();
    const [loggedInUserId, chattingUserId] = decryptUserId(encryptedUserIds) || [];
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (loggedInUserId && chattingUserId) {
            const fetchMessages = async () => {
                try {
                    const response = await axios.get(
                        `http://localhost:5000/messages/${loggedInUserId}/${chattingUserId}`
                    );
                    setMessages(response.data);
                } catch (error) {
                    setError("Error fetching messages");
                    console.error(error);
                }
            };

            fetchMessages();
        } else {
            setError("Invalid or corrupted user IDs");
        }
    }, [loggedInUserId, chattingUserId]);

    return (
        <div className="chat-container">
            <h1>Chat with User {chattingUserId}</h1>
            {error ? (
                <p>{error}</p>
            ) : (
                <ul className="chat-messages">
                    {messages.map((message) => (
                        <li key={message.id} className="message-item">
                            <span>{message.sender_id === loggedInUserId ? "You: " : "User: "}</span>
                            {message.content}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Chat;
