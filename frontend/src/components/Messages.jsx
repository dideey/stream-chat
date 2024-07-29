import React, { useContext, useState, useEffect } from "react";
import { ChatContext } from "../context/ChatContext";
import Message from "./Message";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);
  const { chatId } = data;

  useEffect(() => {
    if (chatId) {
      const fetchMessages = async () => {
        // Fetch messages for the current chat
        const fetchedMessages = await fetch(`/api/messages?chatId=${chatId}`).then(res => res.json());
        setMessages(fetchedMessages);
      };

      fetchMessages();
    } else {
      setMessages([]);
    }
  }, [chatId]);

  return (
    <div className="messages">
      {messages.map((m) => (
        <Message message={m} key={m.id} />
      ))}
    </div>
  );
};

export default Messages;
