import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/navbar';
import Home from './pages/home';

// Import pages
import AuthPage from './pages/AuthPage';
import ExplorePage from './pages/ExplorePage';
import ClubsPage from './pages/ClubsPage';
import ClubDetailPage from './pages/ClubDetailPage';
import EventDetailPage from './pages/EventDetailPage';
import StudentDashboard from './pages/student/Dashboard';
import StudentProfile from './pages/student/Profile';
import StudentEvents from './pages/student/Events';
import StudentCertificates from './pages/student/Certificates';
import AdminDashboard from './pages/admin/Dashboard';
import AdminEvents from './pages/admin/Events';
import CreateEvent from './pages/admin/CreateEvent';
import ClubManagement from './pages/admin/ClubManagement';
import Analytics from './pages/admin/Analytics';

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <Navbar />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/auth/login" element={<AuthPage type="login" />} />
            <Route path="/auth/signup" element={<AuthPage type="signup" />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/clubs" element={<ClubsPage />} />
            <Route path="/club/:id" element={<ClubDetailPage />} />
            <Route path="/event/:id" element={<EventDetailPage />} />

            {/* Student Routes */}
            <Route path="/student/dashboard" element={<StudentDashboard />} />
            <Route path="/student/profile" element={<StudentProfile />} />
            <Route path="/student/events" element={<StudentEvents />} />
            <Route path="/student/certificates" element={<StudentCertificates />} />

            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/events" element={<AdminEvents />} />
            <Route path="/admin/create" element={<CreateEvent />} />
            <Route path="/admin/clubs" element={<ClubManagement />} />
            <Route path="/admin/analytics" element={<Analytics />} />
          </Routes>
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
