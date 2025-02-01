import React, { useState } from 'react';
import Map from '../Map';  // Import Map component
import SearchBar from './SearchBar';  // Import SearchBar component

function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Find a Bike Station</h1>
      <SearchBar onSearch={handleSearch} />
      <Map searchQuery={searchQuery} />
    </div>
  );
}

export default Home;