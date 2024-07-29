import React, { useContext } from 'react';
import { AuthContext } from "../context/AuthContext"

const Navbar = () => {
  const { currentUser } = useContext(AuthContext) || {};

  if (!currentUser) {
    return <div>Loading...</div>; // or handle loading state
  }

  return (
    <div className='navbar'>
      <span className="logo">Stream Chat</span>
      <div className="user">
        <img src={currentUser.photoURL} alt="" />
        <span>{currentUser.displayName}</span>
        <button onClick={() => { /* handle logout */ }}>Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
