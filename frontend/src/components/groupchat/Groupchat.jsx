import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import './GroupChat.css';

const GroupChat = ({ user }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [typing, setTyping] = useState(false);
  const [file, setFile] = useState(null);

  // Mock fetching messages from the backend
  useEffect(() => {
    const mockMessages = [
      {
        id: 1,
        text: 'Hello everyone!',
        timestamp: new Date().toISOString(),
        uid: '1',
        displayName: 'Alice',
        fileUrl: null,
        fileName: null,
      },
      {
        id: 2,
        text: 'Hi Alice!',
        timestamp: new Date().toISOString(),
        uid: '2',
        displayName: 'Bob',
        fileUrl: null,
        fileName: null,
      },
    ];
    setMessages(mockMessages);
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (user && newMessage.trim()) {
      let messageData = {
        id: messages.length + 1,
        text: newMessage,
        timestamp: new Date().toISOString(),
        uid: user.uid,
        displayName: user.displayName,
        fileUrl: null,
        fileName: null,
      };

      if (file) {
        // Mock file upload and URL
        const fileUrl = URL.createObjectURL(file);
        messageData.fileUrl = fileUrl;
        messageData.fileName = file.name;
        setFile(null);
      }

      setMessages((prevMessages) => [...prevMessages, messageData]);
      setNewMessage('');
    }
  };

  const handleTyping = () => {
    setTyping(true);
    setTimeout(() => setTyping(false), 3000);
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((message) => (
          <div key={message.id} className="message">
            <strong>{message.displayName}</strong>
            <span>{format(new Date(message.timestamp), 'PPpp')}</span>
            <p>{message.text}</p>
            {message.fileUrl && (
              <p>
                <a href={message.fileUrl} target="_blank" rel="noopener noreferrer">
                  {message.fileName}
                </a>
              </p>
            )}
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage} className="message-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleTyping}
          placeholder="Type a message..."
        />
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button type="submit">Send</button>
      </form>
      {typing && <p>Someone is typing...</p>}
    </div>
  );
};

export default GroupChat;

