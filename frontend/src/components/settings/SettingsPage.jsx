import React, { useState } from 'react';
import './SettingsPage.css';
import { FaUserCircle, FaUpload } from 'react-icons/fa';

const SettingsPage = ({ onSettingsChange }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [background, setBackground] = useState('#ffffff');
  const [font, setFont] = useState('Arial');
  const [fontSize, setFontSize] = useState('16px');

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        onSettingsChange({ profileImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBackgroundChange = (event) => {
    setBackground(event.target.value);
    onSettingsChange({ background: event.target.value });
  };

  const handleFontChange = (event) => {
    setFont(event.target.value);
    onSettingsChange({ font: event.target.value });
  };

  const handleFontSizeChange = (event) => {
    setFontSize(event.target.value);
    onSettingsChange({ fontSize: event.target.value });
  };

  return (
    <div className="container">
      <div className="section">
        <label className="label">Profile Picture</label>
        <div className="profile-picture" style={{ backgroundImage: `url(${profileImage})` }}>
          {!profileImage && <FaUserCircle size={100} color="#ccc" />}
        </div>
        <label className="upload-button" htmlFor="file-upload">
          <FaUpload /> Upload Profile Picture
        </label>
        <input className="hidden-input" id="file-upload" type="file" accept="image/*" onChange={handleImageUpload} />
      </div>
      <div className="section">
        <label className="label">Chat Background</label>
        <input className="input" type="color" value={background} onChange={handleBackgroundChange} />
      </div>
      <div className="section">
        <label className="label">Font</label>
        <select className="select" value={font} onChange={handleFontChange}>
          <option value="Arial">Arial</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Courier New">Courier New</option>
          <option value="Georgia">Georgia</option>
        </select>
      </div>
      <div className="section">
        <label className="label">Font Size</label>
        <select className="select" value={fontSize} onChange={handleFontSizeChange}>
          <option value="12px">12px</option>
          <option value="14px">14px</option>
          <option value="16px">16px</option>
          <option value="18px">18px</option>
          <option value="20px">20px</option>
        </select>
      </div>
    </div>
  );
};

export default SettingsPage;

