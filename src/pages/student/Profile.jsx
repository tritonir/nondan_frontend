import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Sidebar from '../../components/layout/Sidebar';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Avatar from '../../components/ui/Avatar';

const StudentProfile = () => {
  const { user, updateProfile } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: '',
    interests: ['Technology', 'Sports'],
    year: 'Sophomore',
    major: 'Computer Science'
  });

  const handleSave = () => {
    updateProfile(formData);
    setIsEditing(false);
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
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Profile Settings</h1>

            <Card>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Personal Information</h2>
                <Button
                  variant={isEditing ? 'primary' : 'outline'}
                  onClick={isEditing ? handleSave : () => setIsEditing(true)}
                >
                  {isEditing ? 'Save Changes' : 'Edit Profile'}
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <Avatar src={user?.avatar} alt={user?.name} size="2xl" className="mx-auto mb-4" />
                  <Button variant="outline" size="sm">Change Photo</Button>
                </div>

                <div className="md:col-span-2 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Full Name
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        />
                      ) : (
                        <p className="text-gray-900 dark:text-white">{formData.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email
                      </label>
                      <p className="text-gray-900 dark:text-white">{formData.email}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Year
                      </label>
                      {isEditing ? (
                        <select
                          value={formData.year}
                          onChange={(e) => setFormData({...formData, year: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        >
                          <option>Freshman</option>
                          <option>Sophomore</option>
                          <option>Junior</option>
                          <option>Senior</option>
                        </select>
                      ) : (
                        <p className="text-gray-900 dark:text-white">{formData.year}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Major
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={formData.major}
                          onChange={(e) => setFormData({...formData, major: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        />
                      ) : (
                        <p className="text-gray-900 dark:text-white">{formData.major}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
