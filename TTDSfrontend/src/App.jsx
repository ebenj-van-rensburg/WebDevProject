import React from 'react';
import { SnackbarProvider } from 'notistack';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import SiteSettingsPage from './pages/SiteSettingsPage'; // New
import ForumsPage from './pages/ForumsPage'; // New
import BabylonPage from './pages/BabylonPage'; // New

const App = () => {
  return (
    <SnackbarProvider maxSnack={3}>
      <div className="flex">
        <Sidebar />
        <div className="ml-64 flex-grow">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile/:id" element={<ProfilePage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/site-settings" element={<SiteSettingsPage />} />
            <Route path="/forums" element={<ForumsPage />} />
            <Route path="/babylon" element={<BabylonPage />} />
          </Routes>
        </div>
      </div>
    </SnackbarProvider>
  );
};

export default App;