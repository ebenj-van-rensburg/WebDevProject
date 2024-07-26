import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const SearchResultsPage = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return;

      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`/api/users/search?q=${query}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setResults(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Error searching users:', error);
        setResults([]); // Set results to an empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Search Results</h1>
      {loading && <div>Loading...</div>}
      {results.length > 0 ? (
        <ul>
          {results.map((result) => (
            <li key={result._id} className="p-2 border-b border-gray-200">
              <a href={`/profile/${result._id}`}>{result.username}</a>
            </li>
          ))}
        </ul>
      ) : (
        !loading && <div>No results found for "{query}"</div>
      )}
    </div>
  );
};

export default SearchResultsPage;