import React, { useContext } from 'react';
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext) || {};

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className='navbar'>
      <span className="logo">Stream Chat</span>
      <div className="user">
        <img src={currentUser.photoURL} alt="" />
        <span>{currentUser.displayName}</span>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
