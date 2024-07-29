import React, { useState, useEffect, useCallback, useContext } from "react";
import { ChatContext } from "../context/ChatContext";

const Search = () => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { setCurrentChat } = useContext(ChatContext);

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  // Memoize fetchSearchResults to avoid recreating it on every render
  const fetchSearchResults = useCallback(async () => {
    if (query) {
      const results = await fetch(`/api/search?query=${query}`).then(res => res.json());
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [query]); // Dependency is query, so it will update when query changes

  useEffect(() => {
    fetchSearchResults();
  }, [fetchSearchResults]); // Dependency is fetchSearchResults, so it updates when fetchSearchResults changes

  const handleSelectChat = (user) => {
    if (setCurrentChat) {
      setCurrentChat(user);
    } else {
      console.error('setCurrentChat function is not available');
    }
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

