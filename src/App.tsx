import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ActivitiesPage from './pages/ActivitiesPage';
import ActivityDetailsPage from './pages/ActivityDetailsPage';
import AuthPage from './pages/AuthPage';
import MapPage from './pages/MapPage';
import { AuthProvider } from './context/AuthContext';
import MyBookingsPage from './pages/MyBookingsPage';
import AdminDashboard from './pages/AdminDashboard';
import ProviderNotifications from './pages/ProviderNotifications';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/activities" element={<ActivitiesPage />} />
            <Route path="/activities/:id" element={<ActivityDetailsPage />} />
            <Route path="/packages/:id" element={<ActivityDetailsPage />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="/my-bookings" element={<MyBookingsPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/provider-notifications" element={<ProviderNotifications />} />
          </Routes>
        </Layout>
      </AuthProvider>
    </Router>
  );
}

export default App;