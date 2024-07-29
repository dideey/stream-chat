import React, { useState, useEffect, useContext } from "react";
import { ChatContext } from "../context/ChatContext"

const Search = () => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // Example function to handle search logic
  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  // Example function to simulate search results
  const fetchSearchResults = async () => {
    // Replace with your search API call or logic
    const results = await fetch(`/api/search?query=${query}`).then(res => res.json());
    setSearchResults(results);
  };

  useEffect(() => {
    if (query) {
      fetchSearchResults();
    } else {
      setSearchResults([]);
    }
  }, [query]);

  const handleSelectChat = (user) => {
    // Handle chat selection logic
    console.log("User selected:", user);
  };

  return (
    <div className="search">
      <div className="searchform">
        <input
          type="text"
          placeholder="Search"
          value={query}
          onChange={handleSearch}
        />
      </div>

      <div className="userchat">
        {searchResults.length > 0 ? (
          searchResults.map((user) => (
            <div
              className="item"
              key={user.id}
              onClick={() => handleSelectChat(user)}
            >
              <img src={user.avatarUrl} alt={user.name} />
              <div className="userchatinfo">
                <span>{user.name}</span>
              </div>
            </div>
          ))
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
};

export default Search;