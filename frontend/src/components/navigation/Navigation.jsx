import React from 'react';
import { NavLink } from 'react-router-dom';
import './navigation.css';

const Navigation = () => {
  return (
    <nav className="navigation">
      <ul>
        <li>
          <NavLink exact to="/" activeClassName="active">ChatList</NavLink>
        </li>
        <li>
          <NavLink to="/settings" activeClassName="active">Settings</NavLink>
        </li>
        <li>
          <NavLink to="/requests" activeClassName="active">Requests</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
