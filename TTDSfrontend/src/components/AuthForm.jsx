import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
    dateOfBirth: '',
    gender: '',
  });
  const { login, signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      await login(formData.email, formData.password);
      navigate(`/profile/${localStorage.getItem('userId')}`);
    } else {
      if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match');
        return;
      }
      await signup({
        email: formData.email,
        password: formData.password,
        username: formData.username,
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender,
      });
      navigate(`/profile/${localStorage.getItem('userId')}`);
    }
  };

  return (
    <div className="auth-form bg-white dark:bg-gray-800 p-6 shadow-md rounded-lg max-w-md mx-auto mt-12">
      <h2 className="text-2xl font-bold mb-6">{isLogin ? 'Login' : 'Sign Up'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <>
            <div>
              <label htmlFor="username" className="block text-gray-700 dark:text-gray-300 mb-2">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
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
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                className="w-full p-2 border rounded bg-light-wood dark:bg-dark-wood border-dark-wood dark:border-light-wood"
                required
              />
            </div>
            <div>
              <label htmlFor="gender" className="block text-gray-700 dark:text-gray-300 mb-2">Gender</label>
              <select
                name="gender"
                value={formData.gender}
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
          </>
        )}
        <div>
          <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full p-2 border rounded bg-light-wood dark:bg-dark-wood border-dark-wood dark:border-light-wood"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-gray-700 dark:text-gray-300 mb-2">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full p-2 border rounded bg-light-wood dark:bg-dark-wood border-dark-wood dark:border-light-wood"
            required
          />
        </div>
        {!isLogin && (
          <div>
            <label htmlFor="confirmPassword" className="block text-gray-700 dark:text-gray-300 mb-2">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="w-full p-2 border rounded bg-light-wood dark:bg-dark-wood border-dark-wood dark:border-light-wood"
              required
            />
          </div>
        )}
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg w-full">{isLogin ? 'Login' : 'Sign Up'}</button>
      </form>
      <button onClick={() => setIsLogin(!isLogin)} className="mt-4 text-blue-600 hover:underline">
        {isLogin ? 'Create an account' : 'Already have an account?'}
      </button>
      {isLogin && <button onClick={() => navigate('/forgot-password')} className="mt-4 text-blue-600 hover:underline">Forgot Password?</button>}
    </div>
  );
};

export default AuthForm;