import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  // Add null checks and default values
  if (!message || !currentUser || !data.user) {
    return null; // or return a loading indicator
  }

  const isOwner = message.senderId === currentUser.uid;

  return (
    <div
      ref={ref}
      className={`message ${isOwner ? "owner" : ""}`}
    >
      <div className="messageInfo">
        <img
          src={
            isOwner
              ? currentUser.photoURL || 'default-avatar.png'
              : data.user.photoURL || 'default-avatar.png'
          }
          alt=""
        />
        <span>just now</span>
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  );
};

export default Message;