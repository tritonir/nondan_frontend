import React, { useState } from 'react';
import { Lock, Bell, Shield, Mail, Globe, Save } from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('security');
  const [formData, setFormData] = useState({
    // Password settings
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',

    // Notification settings
    emailNotifications: true,
    pushNotifications: true,
    eventReminders: true,
    weeklyDigest: false,

    // Privacy settings
    profileVisibility: 'public',
    showEmail: false,
    showPhone: false,

    // Language and region
    language: 'en',
    timezone: 'UTC-5',
    dateFormat: 'MM/DD/YYYY'
  });

  const [isSaving, setIsSaving] = useState(false);

  const tabs = [
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'preferences', label: 'Preferences', icon: Globe }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    // Show success message
    alert('Settings saved successfully!');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'security':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Change Password</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--primary-accent-1)] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--primary-accent-1)] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--primary-accent-1)] focus:border-transparent"
                />
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Notification Preferences</h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <label className="text-sm font-medium text-gray-900 dark:text-white">
                      Email Notifications
                    </label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Receive notifications via email
                    </p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  name="emailNotifications"
                  checked={formData.emailNotifications}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-[var(--primary-accent-1)] bg-gray-100 border-gray-300 rounded focus:ring-[var(--primary-accent-1)] dark:focus:ring-[var(--primary-accent-1)] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Bell className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <label className="text-sm font-medium text-gray-900 dark:text-white">
                      Push Notifications
                    </label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Receive push notifications on your device
                    </p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  name="pushNotifications"
                  checked={formData.pushNotifications}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-[var(--primary-accent-1)] bg-gray-100 border-gray-300 rounded focus:ring-[var(--primary-accent-1)] dark:focus:ring-[var(--primary-accent-1)] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-900 dark:text-white">
                    Event Reminders
                  </label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Get reminded about upcoming events
                  </p>
                </div>
                <input
                  type="checkbox"
                  name="eventReminders"
                  checked={formData.eventReminders}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-[var(--primary-accent-1)] bg-gray-100 border-gray-300 rounded focus:ring-[var(--primary-accent-1)] dark:focus:ring-[var(--primary-accent-1)] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-900 dark:text-white">
                    Weekly Digest
                  </label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Receive weekly summary of events
                  </p>
                </div>
                <input
                  type="checkbox"
                  name="weeklyDigest"
                  checked={formData.weeklyDigest}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-[var(--primary-accent-1)] bg-gray-100 border-gray-300 rounded focus:ring-[var(--primary-accent-1)] dark:focus:ring-[var(--primary-accent-1)] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
            </div>
          </div>
        );

      case 'privacy':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Privacy Settings</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Profile Visibility
                </label>
                <select
                  name="profileVisibility"
                  value={formData.profileVisibility}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--primary-accent-1)] focus:border-transparent"
                >
                  <option value="public">Public</option>
                  <option value="friends">Friends Only</option>
                  <option value="private">Private</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-900 dark:text-white">
                    Show Email Address
                  </label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Allow others to see your email
                  </p>
                </div>
                <input
                  type="checkbox"
                  name="showEmail"
                  checked={formData.showEmail}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-[var(--primary-accent-1)] bg-gray-100 border-gray-300 rounded focus:ring-[var(--primary-accent-1)] dark:focus:ring-[var(--primary-accent-1)] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-900 dark:text-white">
                    Show Phone Number
                  </label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Allow others to see your phone number
                  </p>
                </div>
                <input
                  type="checkbox"
                  name="showPhone"
                  checked={formData.showPhone}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-[var(--primary-accent-1)] bg-gray-100 border-gray-300 rounded focus:ring-[var(--primary-accent-1)] dark:focus:ring-[var(--primary-accent-1)] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
            </div>
          </div>
        );

      case 'preferences':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">App Preferences</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Language
                </label>
                <select
                  name="language"
                  value={formData.language}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--primary-accent-1)] focus:border-transparent"
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Timezone
                </label>
                <select
                  name="timezone"
                  value={formData.timezone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--primary-accent-1)] focus:border-transparent"
                >
                  <option value="UTC-12">UTC-12:00</option>
                  <option value="UTC-11">UTC-11:00</option>
                  <option value="UTC-10">UTC-10:00</option>
                  <option value="UTC-9">UTC-09:00</option>
                  <option value="UTC-8">UTC-08:00</option>
                  <option value="UTC-7">UTC-07:00</option>
                  <option value="UTC-6">UTC-06:00</option>
                  <option value="UTC-5">UTC-05:00</option>
                  <option value="UTC-4">UTC-04:00</option>
                  <option value="UTC-3">UTC-03:00</option>
                  <option value="UTC-2">UTC-02:00</option>
                  <option value="UTC-1">UTC-01:00</option>
                  <option value="UTC+0">UTC+00:00</option>
                  <option value="UTC+1">UTC+01:00</option>
                  <option value="UTC+2">UTC+02:00</option>
                  <option value="UTC+3">UTC+03:00</option>
                  <option value="UTC+4">UTC+04:00</option>
                  <option value="UTC+5">UTC+05:00</option>
                  <option value="UTC+6">UTC+06:00</option>
                  <option value="UTC+7">UTC+07:00</option>
                  <option value="UTC+8">UTC+08:00</option>
                  <option value="UTC+9">UTC+09:00</option>
                  <option value="UTC+10">UTC+10:00</option>
                  <option value="UTC+11">UTC+11:00</option>
                  <option value="UTC+12">UTC+12:00</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Date Format
                </label>
                <select
                  name="dateFormat"
                  value={formData.dateFormat}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--primary-accent-1)] focus:border-transparent"
                >
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                </select>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Manage your account preferences and privacy settings.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-[var(--primary-accent-1)] text-[var(--primary-accent-1)]'
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  <Icon className="h-5 w-5 mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="p-6">
            {renderTabContent()}

            <div className="mt-6 flex justify-end">
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="inline-flex items-center px-4 py-2 bg-[var(--primary-accent-1)] text-white rounded-lg hover:bg-[var(--primary-accent-2)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-accent-1)] focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Save className="h-4 w-4 mr-2" />
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
