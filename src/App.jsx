import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/navbar';
import Footer from './components/layout/Footer';
import { ChatbotToggle } from './components/Chatbot';
import Home from './pages/home';

// Import pages
import AuthPage from './pages/AuthPage';
import ExplorePage from './pages/ExplorePage';
import ClubsPage from './pages/ClubsPage';
import ClubDetailPage from './pages/ClubDetailPage';
import EventDetailPage from './pages/EventDetailPage';
import Settings from './pages/Settings';
import Theme from './pages/Theme';
import NotFound from './pages/NotFound';
import VerifyCertificate from './pages/VerifyCertificate';

// Student pages
import StudentDashboard from './pages/student/Dashboard';
import StudentProfile from './pages/student/Profile';
import StudentEvents from './pages/student/Events';
import StudentCertificates from './pages/student/Certificates';

// Admin pages
import AdminDashboard from './pages/admin/Dashboard';
import AdminEvents from './pages/admin/Events';
import CreateEvent from './pages/admin/CreateEvent';
import EditEvent from './pages/admin/EditEvent';
import AttendeeManagement from './pages/admin/AttendeeManagement';
import ClubManagement from './pages/admin/ClubManagement';
import Analytics from './pages/admin/Analytics';
import Scanner from './pages/admin/Scanner';

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <Navbar />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<AuthPage type="login" />} />
            <Route path="/auth/login" element={<AuthPage type="login" />} />
            <Route path="/auth/signup" element={<AuthPage type="signup" />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/clubs" element={<ClubsPage />} />
            <Route path="/club/:id" element={<ClubDetailPage />} />
            <Route path="/event/:id" element={<EventDetailPage />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/theme" element={<Theme />} />
            <Route path="/verify/:certificateId" element={<VerifyCertificate />} />

            {/* Student Routes */}
            <Route path="/student/dashboard" element={<StudentDashboard />} />
            <Route path="/student/profile" element={<StudentProfile />} />
            <Route path="/student/events" element={<StudentEvents />} />
            <Route path="/student/certificates" element={<StudentCertificates />} />

            {/* Admin Routes */}
            <Route path="/admin/panel" element={<AdminDashboard />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/events" element={<AdminEvents />} />
            <Route path="/admin/create" element={<CreateEvent />} />
            <Route path="/admin/edit/:id" element={<EditEvent />} />
            <Route path="/admin/attendees/:eventId" element={<AttendeeManagement />} />
            <Route path="/admin/clubs" element={<ClubManagement />} />
            <Route path="/admin/analytics" element={<Analytics />} />
            <Route path="/admin/scanner" element={<Scanner />} />

            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>

          {/* Global Chatbot */}
          <ChatbotToggle />
          <Footer />
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
