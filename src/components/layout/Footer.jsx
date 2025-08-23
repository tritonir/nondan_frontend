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
    <footer style={{ background: 'var(--color-gray-900)' }} className="border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <div style={{ background: 'var(--primary-accent-2)' }} className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold">
                N
              </div>
              <span className="ml-2 text-xl font-bold" style={{ color: '#fff' }}>Nondan</span>
            </div>
            <p className="mb-6 max-w-sm" style={{ color: '#fff' }}>
              Connecting students with amazing events and vibrant communities.
              Discover, engage, and grow with Nondan.
            </p>

            {/* Contact Info */}
            <div className="space-y-2 text-sm" style={{ color: '#fff' }}>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                <a href="mailto:hello@nondan.com" style={{ color: '#fff' }} className="hover:underline">
                  hello@nondan.com
                </a>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                <a href="tel:+1-555-0123" style={{ color: '#fff' }} className="hover:underline">
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
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: '#fff' }}>
              Platform
            </h3>
            <ul className="space-y-2">
              {footerLinks.platform.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    style={{ color: '#fff' }} className="hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: '#fff' }}>
              Account
            </h3>
            <ul className="space-y-2">
              {footerLinks.account.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    style={{ color: '#fff' }} className="hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: '#fff' }}>
              Support
            </h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    style={{ color: '#fff' }} className="hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: '#fff' }}>
              Company
            </h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    style={{ color: '#fff' }} className="hover:underline"
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
            <div className="text-sm mb-4 md:mb-0" style={{ color: '#fff' }}>
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
                    style={{ color: '#fff' }}
                    className="hover:underline"
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
            <h3 className="text-lg font-semibold mb-2" style={{ color: '#fff' }}>
              Stay Updated
            </h3>
            <p className="mb-4 text-sm" style={{ color: '#fff' }}>
              Get notified about new events and platform updates
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                style={{ background: 'var(--primary-bg)', color: '#fff', borderColor: 'var(--primary-accent-2)' }}
                className="flex-1 px-4 py-2 rounded-l-lg focus:ring-2 focus:ring-[var(--primary-accent-2)] focus:border-transparent"
              />
              <button style={{ background: 'var(--primary-accent-2)', color: '#fff' }} className="px-6 py-2 rounded-r-lg hover:opacity-90 transition-colors">
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
