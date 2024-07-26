import React, { useState, useEffect, useContext } from 'react';
import api from '../axiosConfig';
import { AuthContext } from '../context/AuthContext';

const SettingsPage = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');

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
      const response = await api.put(`/users/${user._id}`, formData);
      setFormData(response.data);
      setMessage('Profile updated successfully');
    } catch (error) {
      setError(error.message);
      setMessage('');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="settings-page p-6 ml-64 bg-light-wood dark:bg-dark-wood text-dark-wood dark:text-light-wood min-h-screen">
      <h1 className="text-2xl font-bold mb-6">User Settings</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-gray-700 dark:text-gray-300 mb-2">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username || ''}
            onChange={handleInputChange}
            className="w-full p-2 border rounded bg-light-wood dark:bg-dark-wood border-dark-wood dark:border-light-wood"
            required
          />
        </div>
        <div>
          <label htmlFor="dateOfBirth" className="block text-gray-700 dark:text-gray-300 mb-2">Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth || ''}
            onChange={handleInputChange}
            className="w-full p-2 border rounded bg-light-wood dark:bg-dark-wood border-dark-wood dark:border-light-wood"
            required
          />
        </div>
        <div>
          <label htmlFor="gender" className="block text-gray-700 dark:text-gray-300 mb-2">Gender</label>
          <select
            name="gender"
            value={formData.gender || ''}
            onChange={handleInputChange}
            className="w-full p-2 border rounded bg-light-wood dark:bg-dark-wood border-dark-wood dark:border-light-wood"
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="bio" className="block text-gray-700 dark:text-gray-300 mb-2">Bio</label>
          <textarea
            name="bio"
            value={formData.bio || ''}
            onChange={handleInputChange}
            className="w-full p-2 border rounded bg-light-wood dark:bg-dark-wood border-dark-wood dark:border-light-wood"
          />
        </div>
        <div>
          <label htmlFor="location" className="block text-gray-700 dark:text-gray-300 mb-2">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location || ''}
            onChange={handleInputChange}
            className="w-full p-2 border rounded bg-light-wood dark:bg-dark-wood border-dark-wood dark:border-light-wood"
          />
        </div>
        <div>
          <label htmlFor="website" className="block text-gray-700 dark:text-gray-300 mb-2">Website</label>
          <input
            type="text"
            name="website"
            value={formData.website || ''}
            onChange={handleInputChange}
            className="w-full p-2 border rounded bg-light-wood dark:bg-dark-wood border-dark-wood dark:border-light-wood"
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg">Save</button>
        {message && <p className="mt-4 text-green-600">{message}</p>}
      </form>
    </div>
  );
};

export default SettingsPage;