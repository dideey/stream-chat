import React, { useContext, useState, useEffect } from "react";
import { ChatContext } from "../context/ChatContext";
import Message from "./Message";

const mockMessages = [
  { id: "1", text: "Hello!", senderId: "user1", date: new Date().toISOString() },
  { id: "2", text: "How are you?", senderId: "user2", date: new Date().toISOString() },
];

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    // Simulate fetching messages
    const fetchMessages = () => {
      setMessages(mockMessages);
    };

    fetchMessages();
  }, [data.chatId]);

  console.log(messages);

  return (
    <div className="messages">
      {messages.map((m) => (
        <Message message={m} key={m.id} />
      ))}
    </div>
  );
};

export default Messages;
