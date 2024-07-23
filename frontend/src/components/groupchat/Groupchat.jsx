import React, { useState, useEffect } from 'react';
import { firestore, auth, storage } from '../firebase';
import { format } from 'date-fns';
import './GroupChat.css';

const GroupChat = ({ user }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [typing, setTyping] = useState(false);
  const [file, setFile] = useState(null);

  useEffect(() => {
    const unsubscribe = firestore
      .collection('groupChats')
      .orderBy('createdAt')
      .onSnapshot((snapshot) => {
        const messagesData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        setMessages(messagesData);
      });

    return () => unsubscribe();
  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (user && newMessage.trim()) {
      let messageData = {
        text: newMessage,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid: user.uid,
        displayName: user.displayName,
        timestamp: new Date().toISOString()
      };

      if (file) {
        const fileRef = storage.ref(`chatFiles/${file.name}`);
        await fileRef.put(file);
        const fileUrl = await fileRef.getDownloadURL();
        messageData.fileUrl = fileUrl;
        messageData.fileName = file.name;
        setFile(null);
      }

      await firestore.collection('groupChats').add(messageData);
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

