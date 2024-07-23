import React, { useState, useEffect } from 'react';
import api from '../axiosConfig';

const SettingsPage = () => {
  const [user, setUser] = useState(null); // Initialize user as null
  const [formData, setFormData] = useState({}); // Initialize formData as an empty object
  const [loading, setLoading] = useState(true); // Initialize loading state
  const [error, setError] = useState(null); // Initialize error state

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get(`/users/${user._id}` );
        setUser(response.data);
        setFormData(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false); // Set loading to false after fetch completes
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put(`/users/${user._id}`, formData);
      setUser(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="settings-page">
      <h1>Settings</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={formData.username || ''}
          onChange={handleInputChange}
          required
        />
        <textarea
          name="bio"
          value={formData.bio || ''}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="location"
          value={formData.location || ''}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="website"
          value={formData.website || ''}
          onChange={handleInputChange}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default SettingsPage;