import React, { useState, useEffect, useContext } from 'react';
import api from '../axiosConfig';
import { AuthContext } from '../context/AuthContext';

const SettingsPage = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get(`/users/${localStorage.getItem('userId')}`);
        setFormData(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put(`/users/${localStorage.getItem('userId')}`, formData);
      setFormData(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="settings-page p-6 ml-64">
      <h1 className="text-2xl font-bold mb-6">User Settings</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="username"
          value={formData.username || ''}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
          required
        />
        <textarea
          name="bio"
          value={formData.bio || ''}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
        <input
          type="text"
          name="location"
          value={formData.location || ''}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
        <input
          type="text"
          name="website"
          value={formData.website || ''}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg">Save</button>
      </form>
    </div>
  );
};

export default SettingsPage;