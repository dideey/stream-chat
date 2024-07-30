import React, { useState, useContext, useRef, useEffect } from 'react';
import Cam from "../img/cam.png";
import Add from "../img/add.png";
import More from "../img/more.png";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";
import DropdownMenu from "./DropdownMenu";
import { v4 as uuid } from "uuid";

const Chat = () => {
  const { data } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [profileModalVisible, setProfileModalVisible] = useState(false);
  const [reportModalVisible, setReportModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [cameraModalVisible, setCameraModalVisible] = useState(false);
  const [reportText, setReportText] = useState('');
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [img, setImg] = useState(null);
  const dropdownRef = useRef(null);

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setDropdownVisible(prevState => !prevState);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleViewProfile = () => {
    setProfileModalVisible(true);
    setDropdownVisible(false);
  };

  const handleMuteChat = () => {
    console.log('Mute Chat clicked');
    setDropdownVisible(false);
  };

  const handleBlockUser = () => {
    console.log('Block User clicked');
    setDropdownVisible(false);
  };

  const handleClearChat = () => {
    console.log('Clear Chat clicked');
    setMessages([]); // Clear chat messages
    setDropdownVisible(false);
  };

  const handleReport = () => {
    setReportModalVisible(true);
    setDropdownVisible(false);
  };

  const handleAddClick = () => {
    console.log('Add icon clicked');
    setAddModalVisible(true);
  };

  const handleCameraClick = () => {
    console.log('Camera icon clicked');
    setCameraModalVisible(true);
  };

  const handleSend = () => {
    if (message.trim() || img) {
      const newMessage = {
        id: uuid(),
        text: message,
        senderId: currentUser.uid,
        date: new Date().toLocaleString(), // Use local string for display
        img: img ? URL.createObjectURL(img) : null,
      };

      setMessages([...messages, newMessage]);
      setMessage('');
      setImg(null);
    }
  };

  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
        <div className="chatIcons">
          <img 
            src={Cam} 
            alt="Camera" 
            onClick={handleCameraClick}
            style={{ cursor: 'pointer' }}
          />
          <img 
            src={Add} 
            alt="Add" 
            onClick={handleAddClick}
            style={{ cursor: 'pointer' }}
          />
          <img
            src={More}
            alt="More options"
            onClick={toggleDropdown}
            style={{ cursor: 'pointer' }}
          />
          {dropdownVisible && (
            <div ref={dropdownRef}>
              <DropdownMenu
                onViewProfile={handleViewProfile}
                onMuteChat={handleMuteChat}
                onBlockUser={handleBlockUser}
                onClearChat={handleClearChat}
                onReport={handleReport}
              />
            </div>
          )}
        </div>
      </div>
      <div className="chat-messages">
        {messages.map((msg) => (
          <div key={msg.id} className="chat-message">
            <span className="chat-sender">{msg.senderId === currentUser.uid ? "You" : data.user?.displayName}:</span>
            <span className="chat-text">{msg.text}</span>
            {msg.img && <img src={msg.img} alt="Attached" className="chat-image" />}
            <span className="chat-time">{msg.date}</span>
          </div>
        ))}
      </div>
      <Input message={message} setMessage={setMessage} img={img} setImg={setImg} onSend={handleSend} />

      {profileModalVisible && (
        <div className="profile-modal">
          <div className="modal-content">
            <span className="close" onClick={() => setProfileModalVisible(false)}>&times;</span>
            <h2>{data.user?.displayName}</h2>
            <p>Email: {data.user?.email}</p>
          </div>
        </div>
      )}

      {reportModalVisible && (
        <div className="report-modal">
          <div className="modal-content">
            <span className="close" onClick={() => setReportModalVisible(false)}>&times;</span>
            <h2>Report User</h2>
            <textarea
              value={reportText}
              onChange={(e) => setReportText(e.target.value)}
              placeholder="Describe the issue"
            />
            <button onClick={() => {
              console.log('Report submitted:', reportText);
              setReportModalVisible(false);
              setReportText('');
            }}>Submit Report</button>
          </div>
        </div>
      )}

      {addModalVisible && (
        <div className="add-modal">
          <div className="modal-content">
            <span className="close" onClick={() => setAddModalVisible(false)}>&times;</span>
            <h2>Add New Contact</h2>
          </div>
        </div>
      )}

      {cameraModalVisible && (
        <div className="camera-modal">
          <div className="modal-content">
            <span className="close" onClick={() => setCameraModalVisible(false)}>&times;</span>
            <h2>Camera</h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;

