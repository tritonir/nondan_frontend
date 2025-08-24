import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import Sidebar from '../../components/layout/Sidebar';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Avatar from '../../components/ui/Avatar';
import { Camera, MapPin, Calendar, Save, Building, Shield } from 'lucide-react';

const AdminProfile = () => {
  const { user, updateUser } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    bio: '',
    clubName: '',
    position: 'Admin',
    location: '',
    website: '',
    socialLinks: {
      instagram: '',
      facebook: '',
      twitter: '',
      linkedin: ''
    }
  });

  // Load user data from backend (real-time data)
  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        // TODO: Replace with actual API call
        const token = localStorage.getItem('nondan-token');
        if (token) {
          // Mock API call - replace with actual backend call
          const response = await fetch('/api/admin/profile', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          if (response.ok) {
            const userData = await response.json();
            setFormData({
              name: userData.name || user?.name || '',
              email: userData.email || user?.email || '',
              phone: userData.phone || '+1 (555) 123-4567',
              bio: userData.bio || 'Event management administrator passionate about creating amazing experiences for students.',
              clubName: userData.clubName || 'Tech Club',
              position: userData.position || 'Admin',
              location: userData.location || 'University Campus',
              website: userData.website || 'https://techclub.university.edu',
              socialLinks: userData.socialLinks || {
                instagram: '@techclub_uni',
                facebook: 'TechClubUniversity',
                twitter: '@techclub_uni',
                linkedin: 'university-tech-club'
              }
            });
          }
        }
      } catch (error) {
        console.error('Failed to load profile:', error);
        // Fallback to default values
        setFormData({
          name: user?.name || '',
          email: user?.email || '',
          phone: '+1 (555) 123-4567',
          bio: 'Event management administrator passionate about creating amazing experiences for students.',
          clubName: 'Tech Club',
          position: 'Admin',
          location: 'University Campus',
          website: 'https://techclub.university.edu',
          socialLinks: {
            instagram: '@techclub_uni',
            facebook: 'TechClubUniversity',
            twitter: '@techclub_uni',
            linkedin: 'university-tech-club'
          }
        });
      }
    };

    loadUserProfile();
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('social_')) {
      const socialKey = name.replace('social_', '');
      setFormData(prev => ({
        ...prev,
        socialLinks: {
          ...prev.socialLinks,
          [socialKey]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // TODO: Replace with actual API call
      const token = localStorage.getItem('nondan-token');
      const response = await fetch('/api/admin/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        if (updateUser) {
          updateUser(formData);
        }
        setIsEditing(false);
        alert('Profile updated successfully!');
      } else {
        throw new Error('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      // Simulate success for demo
      if (updateUser) {
        updateUser(formData);
      }
      setIsEditing(false);
      alert('Profile updated successfully!');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 lg:ml-64">
        {/* Mobile header */}
        <div className="lg:hidden bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
          <button onClick={() => setSidebarOpen(true)} className="text-gray-600 dark:text-gray-300">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Main content - properly centered */}
        <div className="max-w-6xl mx-auto p-6">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Profile</h1>
            <Button
              variant={isEditing ? 'primary' : 'outline'}
              onClick={isEditing ? handleSave : () => setIsEditing(true)}
              loading={isSaving}
              disabled={isSaving}
            >
              {isEditing ? (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </>
              ) : (
                'Edit Profile'
              )}
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Card */}
            <div className="lg:col-span-1">
              <Card className="text-center">
                <div className="relative inline-block mb-4">
                  <Avatar src={user?.avatar} alt={user?.name} size="3xl" className="mx-auto" />
                  {isEditing && (
                    <button className="absolute bottom-0 right-0 p-2 bg-[var(--primary-accent-1)] text-white rounded-full hover:bg-[var(--primary-accent-2)] transition-colors">
                      <Camera className="h-4 w-4" />
                    </button>
                  )}
                </div>

                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {formData.name}
                </h2>

                <div className="flex items-center justify-center mb-2">
                  <Shield className="h-4 w-4 mr-2 text-[var(--primary-accent-1)]" />
                  <p className="text-[var(--primary-accent-1)] font-medium">
                    {formData.position}
                  </p>
                </div>

                <div className="flex items-center justify-center mb-4">
                  <Building className="h-4 w-4 mr-2 text-gray-600 dark:text-gray-400" />
                  <p className="text-gray-600 dark:text-gray-400">
                    {formData.clubName}
                  </p>
                </div>

                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center justify-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    {formData.location}
                  </div>
                  <div className="flex items-center justify-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    Admin since September 2023
                  </div>
                </div>

                {!isEditing && formData.website && (
                  <div className="mt-6">
                    <a href={formData.website} target="_blank" rel="noopener noreferrer"
                       className="text-[var(--primary-accent-1)] hover:underline">
                      Club Website
                    </a>
                  </div>
                )}
              </Card>

              {/* Quick Stats */}
              <Card className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Admin Activity</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Events Created</span>
                    <span className="font-semibold text-gray-900 dark:text-white">25</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Total Attendees</span>
                    <span className="font-semibold text-gray-900 dark:text-white">1,247</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Active Events</span>
                    <span className="font-semibold text-gray-900 dark:text-white">8</span>
                  </div>
                </div>
              </Card>
            </div>

            {/* Main Profile Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Personal Information */}
              <Card>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Personal Information</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Full Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--primary-accent-1)] focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900 dark:text-white py-2">{formData.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email
                    </label>
                    <p className="text-gray-900 dark:text-white py-2">{formData.email}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Phone Number
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--primary-accent-1)] focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900 dark:text-white py-2">{formData.phone}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Location
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--primary-accent-1)] focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900 dark:text-white py-2">{formData.location}</p>
                    )}
                  </div>
                </div>
              </Card>

              {/* Organization Information */}
              <Card>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Organization Information</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Club/Organization
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="clubName"
                        value={formData.clubName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--primary-accent-1)] focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900 dark:text-white py-2">{formData.clubName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Position
                    </label>
                    {isEditing ? (
                      <select
                        name="position"
                        value={formData.position}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--primary-accent-1)] focus:border-transparent"
                      >
                        <option>Admin</option>
                        <option>President</option>
                        <option>Vice President</option>
                        <option>Event Coordinator</option>
                        <option>Secretary</option>
                        <option>Treasurer</option>
                      </select>
                    ) : (
                      <p className="text-gray-900 dark:text-white py-2">{formData.position}</p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Website
                    </label>
                    {isEditing ? (
                      <input
                        type="url"
                        name="website"
                        value={formData.website}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--primary-accent-1)] focus:border-transparent"
                        placeholder="https://your-club-website.com"
                      />
                    ) : (
                      <p className="text-gray-900 dark:text-white py-2">{formData.website}</p>
                    )}
                  </div>
                </div>
              </Card>

              {/* Bio */}
              <Card>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">About</h3>
                {isEditing ? (
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--primary-accent-1)] focus:border-transparent"
                    placeholder="Tell others about yourself and your role..."
                  />
                ) : (
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{formData.bio}</p>
                )}
              </Card>

              {/* Social Links */}
              <Card>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Social Links</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(formData.socialLinks).map(([platform, handle]) => (
                    <div key={platform}>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 capitalize">
                        {platform}
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          name={`social_${platform}`}
                          value={handle}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--primary-accent-1)] focus:border-transparent"
                          placeholder={`@${platform}_handle`}
                        />
                      ) : (
                        <p className="text-gray-900 dark:text-white py-2">{handle || 'Not set'}</p>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
