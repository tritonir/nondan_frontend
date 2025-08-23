import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import Button from './ui/Button';
import Avatar from './ui/Avatar';
import Modal from './ui/Modal';

const Navbar = () => {
  const { isDark, toggleTheme } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setShowProfileDropdown(false);
    navigate('/');
  };

  const navLinks = [
    { to: '/explore', label: 'Explore' },
    { to: '/clubs', label: 'Clubs' },
    ...(isAuthenticated ? [
      { to: user?.role === 'admin' ? '/admin/dashboard' : '/student/dashboard', label: 'Dashboard' }
    ] : [])
  ];

  return (
    <>
      <nav className="bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <div className="w-8 h-8 bg-[var(--primary-accent-1)] rounded-lg flex items-center justify-center text-white font-bold">
                  E
                </div>
                <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">Eventify</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`${
                    location.pathname === link.to ? 'nav-link-active' : 'nav-link'
                  } px-3 py-2 rounded-md text-sm font-medium`}
                >
                  {link.label}
                </Link>
              ))}

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                {isDark ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>

              {/* Authentication */}
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                    className="flex items-center space-x-2"
                  >
                    <Avatar src={user.avatar} alt={user.name} size="sm" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{user.name}</span>
                  </button>

                  {showProfileDropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                      <div className="py-1">
                        <Link
                          to="/student/profile"
                          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                          onClick={() => setShowProfileDropdown(false)}
                        >
                          Profile
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          Sign out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Button onClick={() => setShowAuthModal(true)}>
                  Login
                </Button>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {showMobileMenu && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200 dark:border-gray-700">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`${
                    location.pathname === link.to ? 'nav-link-active' : 'nav-link'
                  } block px-3 py-2 rounded-md text-base font-medium`}
                  onClick={() => setShowMobileMenu(false)}
                >
                  {link.label}
                </Link>
              ))}
              {!isAuthenticated && (
                <Button
                  className="w-full mt-4"
                  onClick={() => {
                    setShowAuthModal(true);
                    setShowMobileMenu(false);
                  }}
                >
                  Login
                </Button>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Auth Modal */}
      <Modal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        title="Welcome to Eventify"
      >
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Sign in to access your dashboard and manage events
          </p>
          <div className="space-y-3">
            <Button
              className="w-full"
              onClick={() => {
                setShowAuthModal(false);
                navigate('/auth/login');
              }}
            >
              Sign In
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                setShowAuthModal(false);
                navigate('/auth/signup');
              }}
            >
              Create Account
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Navbar;
