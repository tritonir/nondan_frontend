import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    platform: [
      { label: 'Explore Events', path: '/explore' },
      { label: 'Browse Hubs', path: '/clubs' },
      { label: 'How it Works', path: '/#how-it-works' },
      { label: 'Features', path: '/#features' }
    ],
    account: [
      { label: 'Student Dashboard', path: '/student/dashboard' },
      { label: 'Admin Panel', path: '/admin/dashboard' },
      { label: 'Settings', path: '/settings' },
      { label: 'Theme', path: '/theme' }
    ],
    support: [
      { label: 'Help Center', path: '/help' },
      { label: 'Contact Support', path: '/contact' },
      { label: 'Privacy Policy', path: '/privacy' },
      { label: 'Terms of Service', path: '/terms' }
    ],
    company: [
      { label: 'About Us', path: '/about' },
      { label: 'Careers', path: '/careers' },
      { label: 'Blog', path: '/blog' },
      { label: 'Press Kit', path: '/press' }
    ]
  };

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com/nondan', label: 'Facebook' },
    { icon: Twitter, href: 'https://twitter.com/nondan', label: 'Twitter' },
    { icon: Instagram, href: 'https://instagram.com/nondan', label: 'Instagram' },
    { icon: Linkedin, href: 'https://linkedin.com/company/nondan', label: 'LinkedIn' }
  ];

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
                N
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">Nondan</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-sm">
              Connecting students with amazing events and vibrant communities.
              Discover, engage, and grow with Nondan.
            </p>

            {/* Contact Info */}
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                <a href="mailto:hello@nondan.com" className="hover:text-indigo-600 dark:hover:text-indigo-400">
                  hello@nondan.com
                </a>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                <a href="tel:+1-555-0123" className="hover:text-indigo-600 dark:hover:text-indigo-400">
                  +1 (555) 012-3456
                </a>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Platform
            </h3>
            <ul className="space-y-2">
              {footerLinks.platform.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Account
            </h3>
            <ul className="space-y-2">
              {footerLinks.account.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Support
            </h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Copyright */}
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-4 md:mb-0">
              © {currentYear} Nondan. All rights reserved.
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    aria-label={social.label}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="max-w-md mx-auto text-center">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Stay Updated
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
              Get notified about new events and platform updates
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-l-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <button className="px-6 py-2 bg-indigo-600 text-white rounded-r-lg hover:bg-indigo-700 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
