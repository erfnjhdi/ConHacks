import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [input, setInput] = useState('');

  const handleSearch = (event) => {
    setInput(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Enter a station name, street name or address"
      value={input}
      onChange={handleSearch}
      style={{
        width: '80%',
        padding: '10px',
        fontSize: '16px',
        marginBottom: '20px',
        borderRadius: '5px',
        border: '1px solid #ccc'
      }}
    />
  );
};

export default SearchBar;