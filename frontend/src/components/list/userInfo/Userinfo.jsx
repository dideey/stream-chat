import React, { useState } from "react";
import "./addUser.css";

const AddUser = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://your-backend-api.com/search-user?query=${searchQuery}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  return (
    <div className="addUser">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="username"
          name="username"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {searchResults.map((user) => (
        <div className="user" key={user.id}>
          <div className="detail">
            <img src={user.img} alt="Avatar" />
            <span>{user.name}</span>
          </div>
          <button>Add User</button>
        </div>
      ))}
    </div>
  );
};

export default AddUser;

