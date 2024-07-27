import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCogs, faEnvelope, faUsers } from '@fortawesome/free-solid-svg-icons';
import './navigation.css';

const Navigation = () => {
  return (
    <nav className="navigation">
      <ul>
        <li>
          <NavLink exact to="/" activeClassName="active">
            <FontAwesomeIcon icon={faHome} className="fa-icon" />
            <span>Home</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/settings" activeClassName="active">
            <FontAwesomeIcon icon={faCogs} className="fa-icon" />
            <span>Settings</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/requests" activeClassName="active">
            <FontAwesomeIcon icon={faEnvelope} className="fa-icon" />
            <span>Requests</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/groupchat" activeClassName="active">
            <FontAwesomeIcon icon={faUsers} className="fa-icon" />
            <span>Groupchat</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
