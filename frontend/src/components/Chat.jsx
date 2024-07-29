import React, { useState, useContext, useRef, useEffect } from 'react';
import Cam from "../img/cam.png";
import Add from "../img/add.png";
import More from "../img/more.png";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";
import DropdownMenu from "./DropdownMenu";

const Chat = () => {
  const { data } = useContext(ChatContext);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [profileModalVisible, setProfileModalVisible] = useState(false);
  const [reportModalVisible, setReportModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [cameraModalVisible, setCameraModalVisible] = useState(false);
  const [reportText, setReportText] = useState('');
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
            alt="More"
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
      <Messages />
      <Input />

      {/* Profile Modal */}
      {profileModalVisible && (
        <div className="profile-modal">
          <div className="modal-content">
            <span className="close" onClick={() => setProfileModalVisible(false)}>&times;</span>
            <h2>{data.user?.displayName}</h2>
            <p>Email: {data.user?.email}</p>
            {/* Add more user information here */}
          </div>
        </div>
      )}

      {/* Report Modal */}
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

      {/* Add Modal */}
      {addModalVisible && (
        <div className="add-modal">
          <div className="modal-content">
            <span className="close" onClick={() => setAddModalVisible(false)}>&times;</span>
            <h2>Add New Contact</h2>
            {/* Add your form or content for adding a new contact here */}
          </div>
        </div>
      )}

      {/* Camera Modal */}
      {cameraModalVisible && (
        <div className="camera-modal">
          <div className="modal-content">
            <span className="close" onClick={() => setCameraModalVisible(false)}>&times;</span>
            <h2>Camera</h2>
            {/* Add your camera functionality or content here */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;