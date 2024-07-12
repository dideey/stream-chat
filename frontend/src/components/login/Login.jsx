import "./Login.css"
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEnvelope, faFile } from '@fortawesome/free-solid-svg-icons';
import Add from "../img/addAdvatar.png"

const Register = () => {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [file, setFile] = useState(null);

  const handleRegister = (event) => {
    event.preventDefault();
    console.log('Registering', { displayName, email, password, file });
  };

  return (
    <div className="formcontainer">
      <div className="formWrapper">
        <span className="logo">Streamchat</span>
        <span className="title">Registration</span>
        <form onSubmit={handleRegister}>
          <div>
            <label>
              <FontAwesomeIcon icon={faUser} /> Display Name:
            </label>
            <input
              type="text"
              placeholder="display name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>
              <FontAwesomeIcon icon={faEnvelope} /> Email:
            </label>
            <input
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>
              <FontAwesomeIcon icon={faLock} /> Password:
            </label>
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label>
              <FontAwesomeIcon icon={faFile} /> Profile Picture:
            </label>
            <input style={{display:"none"}} 
              type="file" id="file">
              onChange={(e) => setFile(e.target.files[0])}
              required
            </input>
          </div>
          <label htmlFor='file'>
            <img src={Add} alt="" />
            <span>Add an Advatar</span>
          </label>
          <button type="submit" className="submit-btn">Sign Up</button>
        </form>
        <p>Already have an account? <button type="button" className="login-btn">Login</button></p>
      </div>
    </div>
  );
};

export default Register;
