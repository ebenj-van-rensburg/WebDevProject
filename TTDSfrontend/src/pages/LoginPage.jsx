import React from 'react';
import AuthForm from '../components/AuthForm';

const LoginPage = () => {
  return (
    <div className="login-page bg-light-wood dark:bg-dark-wood min-h-screen flex items-center justify-center">
      <AuthForm />
    </div>
  );
};

export default LoginPage;