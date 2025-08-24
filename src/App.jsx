import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
const EventsPage = lazy(() => import('./pages/EventsPage'));
const ClubsPage = lazy(() => import('./pages/ClubsPage'));
const ClubDetailPage = lazy(() => import('./pages/ClubDetailPage'));
const EventDetailPage = lazy(() => import('./pages/EventDetailPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const BlogDetailPage = lazy(() => import('./pages/BlogDetailPage'));
const Settings = lazy(() => import('./pages/Settings'));
const NotFound = lazy(() => import('./pages/NotFound'));
const VerifyCertificate = lazy(() => import('./pages/VerifyCertificate'));

// Student pages
const StudentDashboard = lazy(() => import('./pages/student/Dashboard'));
const StudentProfile = lazy(() => import('./pages/student/Profile'));
const StudentEvents = lazy(() => import('./pages/student/Events'));
const StudentCertificates = lazy(() => import('./pages/student/Certificates'));
const StudentMyBlogs = lazy(() => import('./pages/student/MyBlogs'));

// Admin pages
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'));
const AdminProfile = lazy(() => import('./pages/admin/Profile'));
const AdminEvents = lazy(() => import('./pages/admin/Events'));
const CreateEvent = lazy(() => import('./pages/admin/CreateEvent'));
const EditEvent = lazy(() => import('./pages/admin/EditEvent'));
const AttendeeManagement = lazy(() => import('./pages/admin/AttendeeManagement'));
const ClubManagement = lazy(() => import('./pages/admin/ClubManagement'));
const Analytics = lazy(() => import('./pages/admin/Analytics'));
const Scanner = lazy(() => import('./pages/admin/Scanner'));
const CertificateCustomization = lazy(() => import('./pages/admin/CertificateCustomization'));
const AdminMyBlogs = lazy(() => import('./pages/admin/MyBlogs'));

// Shared pages
const WriteBlog = lazy(() => import('./pages/WriteBlog'));

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
    return <Navigate to="/events" replace />;
  }

  return children;
};

const App = () => {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
          <Navbar />

          <main className="flex-1">
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/events" element={<EventsPage />} />
                <Route path="/clubs" element={<ClubsPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:id" element={<BlogDetailPage />} />
                <Route path="/club/:id" element={<ClubDetailPage />} />
                <Route path="/event/:id" element={<EventDetailPage />} />
                <Route path="/verify/:certificateId" element={<VerifyCertificate />} />

                {/* Auth Routes (redirect if authenticated) */}
                <Route path="/auth/login" element={
                  <PublicRoute>
                    <AuthPage />
                  </PublicRoute>
                } />
                <Route path="/auth/register" element={
                  <PublicRoute>
                    <AuthPage />
                  </PublicRoute>
                } />

                {/* Blog Writing Routes (Protected) */}
                <Route path="/write-blog" element={
                  <ProtectedRoute>
                    <WriteBlog />
                  </ProtectedRoute>
                } />
                <Route path="/write-blog/:id" element={
                  <ProtectedRoute>
                    <WriteBlog />
                  </ProtectedRoute>
                } />

                {/* Student Routes */}
                <Route path="/student/dashboard" element={
                  <ProtectedRoute requiredRole="student">
                    <StudentDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/student/profile" element={
                  <ProtectedRoute requiredRole="student">
                    <StudentProfile />
                  </ProtectedRoute>
                } />
                <Route path="/student/events" element={
                  <ProtectedRoute requiredRole="student">
                    <StudentEvents />
                  </ProtectedRoute>
                } />
                <Route path="/student/certificates" element={
                  <ProtectedRoute requiredRole="student">
                    <StudentCertificates />
                  </ProtectedRoute>
                } />
                <Route path="/student/my-blogs" element={
                  <ProtectedRoute requiredRole="student">
                    <StudentMyBlogs />
                  </ProtectedRoute>
                } />

                {/* Admin Routes */}
                <Route path="/admin/dashboard" element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/admin/profile" element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminProfile />
                  </ProtectedRoute>
                } />
                <Route path="/admin/events" element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminEvents />
                  </ProtectedRoute>
                } />
                <Route path="/admin/events/create" element={
                  <ProtectedRoute requiredRole="admin">
                    <CreateEvent />
                  </ProtectedRoute>
                } />
                <Route path="/admin/events/:id/edit" element={
                  <ProtectedRoute requiredRole="admin">
                    <EditEvent />
                  </ProtectedRoute>
                } />
                <Route path="/admin/events/:id/attendees" element={
                  <ProtectedRoute requiredRole="admin">
                    <AttendeeManagement />
                  </ProtectedRoute>
                } />
                <Route path="/admin/clubs" element={
                  <ProtectedRoute requiredRole="admin">
                    <ClubManagement />
                  </ProtectedRoute>
                } />
                <Route path="/admin/analytics" element={
                  <ProtectedRoute requiredRole="admin">
                    <Analytics />
                  </ProtectedRoute>
                } />
                <Route path="/admin/scanner" element={
                  <ProtectedRoute requiredRole="admin">
                    <Scanner />
                  </ProtectedRoute>
                } />
                <Route path="/admin/certificates" element={
                  <ProtectedRoute requiredRole="admin">
                    <CertificateCustomization />
                  </ProtectedRoute>
                } />
                <Route path="/admin/my-blogs" element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminMyBlogs />
                  </ProtectedRoute>
                } />

                {/* Settings Route (Protected) */}
                <Route path="/settings" element={
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>
                } />

                {/* 404 Route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>

          <Footer />
          <ChatbotToggle />

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
            theme="light"
          />
        </div>
      </AuthProvider>
    </ErrorBoundary>
  );
};

export default App;
