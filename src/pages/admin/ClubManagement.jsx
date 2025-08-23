import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Sidebar from '../../components/layout/Sidebar';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const ClubManagement = () => {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [clubSettings, setClubSettings] = useState({
    name: 'Technology Club',
    description: 'Exploring the latest in technology, programming, and innovation.',
    primaryColor: '#3B82F6',
    secondaryColor: '#1D4ED8',
    category: 'Technology',
    founded: '2018',
    website: 'https://techclub.university.edu'
  });

  const handleSave = () => {
    // Mock save - would integrate with actual API
    console.log('Saving club settings:', clubSettings);
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 lg:ml-64">
        <div className="lg:hidden bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
          <button onClick={() => setSidebarOpen(true)} className="text-gray-600 dark:text-gray-300">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        <div className="p-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Club Management</h1>

            <div className="space-y-6">
              {/* Club Information */}
              <Card>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Club Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Club Name
                    </label>
                    <input
                      type="text"
                      value={clubSettings.name}
                      onChange={(e) => setClubSettings({...clubSettings, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Category
                    </label>
                    <select
                      value={clubSettings.category}
                      onChange={(e) => setClubSettings({...clubSettings, category: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    >
                      <option value="Technology">Technology</option>
                      <option value="Sports">Sports</option>
                      <option value="Arts">Arts</option>
                      <option value="Academic">Academic</option>
                      <option value="Social">Social</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Description
                    </label>
                    <textarea
                      rows={3}
                      value={clubSettings.description}
                      onChange={(e) => setClubSettings({...clubSettings, description: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
              </Card>

              {/* Theme Customization */}
              <Card>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Theme Colors</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Primary Color
                    </label>
                    <div className="flex items-center space-x-3">
                      <input
                        type="color"
                        value={clubSettings.primaryColor}
                        onChange={(e) => setClubSettings({...clubSettings, primaryColor: e.target.value})}
                        className="w-12 h-10 border border-gray-300 dark:border-gray-600 rounded"
                      />
                      <input
                        type="text"
                        value={clubSettings.primaryColor}
                        onChange={(e) => setClubSettings({...clubSettings, primaryColor: e.target.value})}
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Secondary Color
                    </label>
                    <div className="flex items-center space-x-3">
                      <input
                        type="color"
                        value={clubSettings.secondaryColor}
                        onChange={(e) => setClubSettings({...clubSettings, secondaryColor: e.target.value})}
                        className="w-12 h-10 border border-gray-300 dark:border-gray-600 rounded"
                      />
                      <input
                        type="text"
                        value={clubSettings.secondaryColor}
                        onChange={(e) => setClubSettings({...clubSettings, secondaryColor: e.target.value})}
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Color Preview */}
                <div className="mt-4 p-4 rounded-lg" style={{ backgroundColor: clubSettings.primaryColor + '10' }}>
                  <div className="flex items-center space-x-4">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold"
                      style={{ backgroundColor: clubSettings.primaryColor }}
                    >
                      TC
                    </div>
                    <div>
                      <h3 className="font-semibold" style={{ color: clubSettings.primaryColor }}>
                        {clubSettings.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Color preview</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Save Button */}
              <div className="flex justify-end">
                <Button onClick={handleSave}>
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubManagement;
