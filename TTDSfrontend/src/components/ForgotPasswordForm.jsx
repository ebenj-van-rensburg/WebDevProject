import React, { useState } from 'react';
import api from '../axiosConfig';

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/forgot-password', { email });
      setMessage(response.data.message);
    } catch (error) {
      console.error(error);
      setMessage('Error sending reset email');
    }
  };

  return (
    <div className="forgot-password-form bg-white dark:bg-gray-800 p-6 shadow-md rounded-lg max-w-md mx-auto mt-12">
      <h2 className="text-2xl font-bold mb-6">Forgot Password</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded bg-light-wood dark:bg-dark-wood border-dark-wood dark:border-light-wood"
            required
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg w-full">Send Reset Email</button>
      </form>
      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
};

export default ForgotPasswordForm;