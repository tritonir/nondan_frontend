import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/AuthContext';
import Navbar from './components/navbar';
import Footer from './components/layout/Footer';
import { ChatbotToggle } from './components/Chatbot';
import LoadingSpinner from './components/ui/LoadingSpinner';
import ErrorBoundary from './components/ErrorBoundary';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/home'));
const AuthPage = lazy(() => import('./pages/AuthPage'));
const ExplorePage = lazy(() => import('./pages/ExplorePage'));
const ClubsPage = lazy(() => import('./pages/ClubsPage'));
const ClubDetailPage = lazy(() => import('./pages/ClubDetailPage'));
const EventDetailPage = lazy(() => import('./pages/EventDetailPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const Settings = lazy(() => import('./pages/Settings'));
const Theme = lazy(() => import('./pages/Theme'));
const NotFound = lazy(() => import('./pages/NotFound'));
const VerifyCertificate = lazy(() => import('./pages/VerifyCertificate'));

// Student pages
const StudentDashboard = lazy(() => import('./pages/student/Dashboard'));
const StudentProfile = lazy(() => import('./pages/student/Profile'));
const StudentEvents = lazy(() => import('./pages/student/Events'));
const StudentCertificates = lazy(() => import('./pages/student/Certificates'));

// Admin pages
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'));
const AdminEvents = lazy(() => import('./pages/admin/Events'));
const CreateEvent = lazy(() => import('./pages/admin/CreateEvent'));
const EditEvent = lazy(() => import('./pages/admin/EditEvent'));
const AttendeeManagement = lazy(() => import('./pages/admin/AttendeeManagement'));
const ClubManagement = lazy(() => import('./pages/admin/ClubManagement'));
const Analytics = lazy(() => import('./pages/admin/Analytics'));
const Scanner = lazy(() => import('./pages/admin/Scanner'));

// Protected Route Component
const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

// Public Route Component (redirect if already authenticated)
const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (isAuthenticated) {
    return <Navigate to="/explore" replace />;
  }

  return children;
};

const App = () => {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
            <Navbar />

            <main className="flex-1">
              <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="/explore" element={<ExplorePage />} />
                  <Route path="/clubs" element={<ClubsPage />} />
                  <Route path="/blog" element={<BlogPage />} />
                  <Route path="/club/:id" element={<ClubDetailPage />} />
                  <Route path="/event/:id" element={<EventDetailPage />} />
                  <Route path="/theme" element={<Theme />} />
                  <Route path="/verify/:certificateId" element={<VerifyCertificate />} />

                  {/* Auth Routes (redirect if authenticated) */}
                  <Route
                    path="/auth"
                    element={
                      <PublicRoute>
                        <AuthPage type="login" />
                      </PublicRoute>
                    }
                  />
                  <Route
                    path="/auth/login"
                    element={
                      <PublicRoute>
                        <AuthPage type="login" />
                      </PublicRoute>
                    }
                  />
                  <Route
                    path="/auth/signup"
                    element={
                      <PublicRoute>
                        <AuthPage type="signup" />
                      </PublicRoute>
                    }
                  />

                  {/* Protected Routes */}
                  <Route
                    path="/settings"
                    element={
                      <ProtectedRoute>
                        <Settings />
                      </ProtectedRoute>
                    }
                  />

                  {/* Student Routes */}
                  <Route
                    path="/student/dashboard"
                    element={
                      <ProtectedRoute requiredRole="student">
                        <StudentDashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/student/profile"
                    element={
                      <ProtectedRoute requiredRole="student">
                        <StudentProfile />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/student/events"
                    element={
                      <ProtectedRoute requiredRole="student">
                        <StudentEvents />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/student/certificates"
                    element={
                      <ProtectedRoute requiredRole="student">
                        <StudentCertificates />
                      </ProtectedRoute>
                    }
                  />

                  {/* Admin Routes */}
                  <Route
                    path="/admin/dashboard"
                    element={
                      <ProtectedRoute requiredRole="admin">
                        <AdminDashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/events"
                    element={
                      <ProtectedRoute requiredRole="admin">
                        <AdminEvents />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/create"
                    element={
                      <ProtectedRoute requiredRole="admin">
                        <CreateEvent />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/edit/:id"
                    element={
                      <ProtectedRoute requiredRole="admin">
                        <EditEvent />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/attendees/:eventId"
                    element={
                      <ProtectedRoute requiredRole="admin">
                        <AttendeeManagement />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/clubs"
                    element={
                      <ProtectedRoute requiredRole="admin">
                        <ClubManagement />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/analytics"
                    element={
                      <ProtectedRoute requiredRole="admin">
                        <Analytics />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/scanner"
                    element={
                      <ProtectedRoute requiredRole="admin">
                        <Scanner />
                      </ProtectedRoute>
                    }
                  />

                  {/* Redirect old admin panel route */}
                  <Route path="/admin/panel" element={<Navigate to="/admin/dashboard" replace />} />

                  {/* Unauthorized page */}
                  <Route path="/unauthorized" element={<NotFound message="You don't have permission to access this page." />} />

                  {/* 404 Route */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </main>

            {/* Global Components */}
            <ChatbotToggle />
            <Footer />

            {/* Toast Notifications */}
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
            />
          </div>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;
