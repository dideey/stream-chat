import React, { useState } from "react";
import "./addUser.css";

const AddUser = () => {
  const [username, setUsername] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [users, setUsers] = useState([
    { id: 1, name: "Jimmy Olise", img: "./avatar.png" },
    // You can add more mock users here
  ]);

  const handleSearch = (e) => {
    e.preventDefault();
    // Simulate a search result from the list of users
    const user = users.find(user => user.name.toLowerCase().includes(username.toLowerCase()));
    setSearchResult(user);
  };

  const handleAddUser = (user) => {
    console.log(`Adding user: ${user.name}`);
    // Here you could add logic to add the user to your chat, etc.
    // For now, we'll just log to the console.
  };

  return (
    <div className="addUser">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      
      {searchResult && (
        <div className="user">
          <div className="detail">
            <img src={searchResult.img} alt="Avatar" />
            <span>{searchResult.name}</span>
          </div>
          <button onClick={() => handleAddUser(searchResult)}>Add User</button>
        </div>
      )}
    </div>
  );
};

export default AddUser;
