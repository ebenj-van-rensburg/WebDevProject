import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import SiteSettingsPage from './pages/SiteSettingsPage';
import ForumsPage from './pages/ForumsPage';
import BabylonPage from './pages/BabylonPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import SearchResultsPage from './pages/SearchResultsPage';

const App = () => {
  return (
    <SnackbarProvider maxSnack={3}>
      <div>
        <Navbar />
        <div className="flex">
          <Sidebar />
          <div className="flex-grow ml-64 pt-20">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/profile/:id" element={<ProfilePage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/site-settings" element={<SiteSettingsPage />} />
              <Route path="/forums" element={<ForumsPage />} />
              <Route path="/babylon" element={<BabylonPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
              <Route path="/search" element={<SearchResultsPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </SnackbarProvider>
  );
};

export default App;