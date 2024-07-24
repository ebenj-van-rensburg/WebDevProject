import React, { createContext, useState, useEffect } from 'react';
import api from '../axiosConfig';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    if (token && userId) {
      api.get(`/users/${userId}`)
        .then(response => setUser(response.data))
        .catch(() => {
          localStorage.removeItem('token');
          localStorage.removeItem('userId');
        });
    }
  }, []);

  const login = async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('userId', response.data.user.id);
    setUser(response.data.user);
  };

  const signup = async (formData) => {
    const response = await api.post('/auth/register', formData);
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('userId', response.data.user.id);
    setUser(response.data.user);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;