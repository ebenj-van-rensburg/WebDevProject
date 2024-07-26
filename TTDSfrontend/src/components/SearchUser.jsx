import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchUser = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${query}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search users..."
        className="p-2 border rounded"
      />
      <button type="submit" className="ml-2 bg-blue-600 text-white px-2 py-1 rounded">Search</button>
    </form>
  );
};

export default SearchUser;