import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../axiosConfig';

const ResetPasswordPage = () => {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }
    try {
      const response = await api.post('/auth/reset-password', { token, password });
      setMessage(response.data.message);
      navigate('/login');
    } catch (error) {
      console.error(error);
      setMessage('Error resetting password');
    }
  };

  return (
    <div className="reset-password-form bg-white dark:bg-gray-800 p-6 shadow-md rounded-lg max-w-md mx-auto mt-12">
      <h2 className="text-2xl font-bold mb-6">Reset Password</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="password" className="block text-gray-700 dark:text-gray-300 mb-2">New Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded bg-light-wood dark:bg-dark-wood border-dark-wood dark:border-light-wood"
            required
          />
        </div>
        <div>
          <label htmlFor="confirmPassword" className="block text-gray-700 dark:text-gray-300 mb-2">Confirm New Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 border rounded bg-light-wood dark:bg-dark-wood border-dark-wood dark:border-light-wood"
            required
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg w-full">Reset Password</button>
      </form>
      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
};

export default ResetPasswordPage;