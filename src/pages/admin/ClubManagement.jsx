import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/layout/Sidebar';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import Modal from '../../components/ui/Modal';

const ClubManagement = () => {
  const { user, token } = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [clubs, setClubs] = useState([]);
  const [selectedClub, setSelectedClub] = useState(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    category: 'workshop',
    image_url: '',
    paymentRequired: false
  });

  const [clubSettings, setClubSettings] = useState({
    name: '',
    description: '',
    category: 'technology',
    colors: {
      primary: '#3B82F6',
      secondary: '#1D4ED8'
    },
    socialLinks: {
      website: '',
      instagram: '',
      facebook: '',
      twitter: ''
    },
    contact: {
      email: '',
      phone: ''
    }
  });

  // Load user's clubs on component mount
  useEffect(() => {
    fetchUserClubs();
  }, []);

  // Load specific club if clubId is provided in URL
  useEffect(() => {
    const clubId = searchParams.get('clubId');
    if (clubId && clubs.length > 0) {
      const club = clubs.find(c => c._id === clubId);
      if (club) {
        setSelectedClub(club);
        setClubSettings({
          name: club.name,
          description: club.description,
          category: club.category,
          colors: club.colors || { primary: '#3B82F6', secondary: '#1D4ED8' },
          socialLinks: club.socialLinks || {},
          contact: club.contact || {}
        });
      }
    }
  }, [searchParams, clubs]);

  const fetchUserClubs = async () => {
    try {
      const response = await fetch('/api/club', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Failed to fetch clubs');

      const data = await response.json();

      // Filter clubs where user is president or admin
      const userClubs = data.filter(club =>
        club.president_id._id === user._id ||
        club.members.some(member =>
          member._id === user._id &&
          user.clubs?.find(uc => uc.club_id === club._id)?.clubRole === 'admin'
        )
      );

      setClubs(userClubs);

      if (userClubs.length > 0 && !selectedClub) {
        setSelectedClub(userClubs[0]);
        setClubSettings({
          name: userClubs[0].name,
          description: userClubs[0].description,
          category: userClubs[0].category,
          colors: userClubs[0].colors || { primary: '#3B82F6', secondary: '#1D4ED8' },
          socialLinks: userClubs[0].socialLinks || {},
          contact: userClubs[0].contact || {}
        });
      }
    } catch (err) {
      setError('Failed to load clubs: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!selectedClub) return;

    setSaving(true);
    setError('');

    try {
      const response = await fetch(`/api/club/${selectedClub._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(clubSettings)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update club');
      }

      // Update local state
      setClubs(prevClubs =>
        prevClubs.map(club =>
          club._id === selectedClub._id ? { ...club, ...clubSettings } : club
        )
      );

      setSelectedClub(prev => ({ ...prev, ...clubSettings }));
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleCreateEvent = async () => {
    if (!selectedClub) return;

    try {
      const response = await fetch('/api/event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...eventData,
          club_id: selectedClub._id
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create event');
      }

      setShowEventModal(false);
      setEventData({
        title: '',
        description: '',
        date: '',
        time: '',
        location: '',
        category: 'workshop',
        image_url: '',
        paymentRequired: false
      });

      // Refresh club data to show new event
      fetchUserClubs();
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex-1 lg:ml-64 flex items-center justify-center">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (clubs.length === 0) {
    return (
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex-1 lg:ml-64">
          <div className="p-6">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">No Clubs Found</h1>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                You don't have any clubs to manage. Create a new club to get started.
              </p>
              <Button onClick={() => navigate('/admin/create-club')}>
                Create New Club
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Club Management</h1>
              <div className="flex space-x-3">
                <Button
                  variant="secondary"
                  onClick={() => setShowEventModal(true)}
                  disabled={!selectedClub}
                >
                  Create Event
                </Button>
                <Button onClick={() => navigate('/admin/create-club')}>
                  Create New Club
                </Button>
              </div>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}

            {/* Club Selector */}
            {clubs.length > 1 && (
              <Card className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Select Club</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {clubs.map(club => (
                    <div
                      key={club._id}
                      onClick={() => {
                        setSelectedClub(club);
                        setClubSettings({
                          name: club.name,
                          description: club.description,
                          category: club.category,
                          colors: club.colors || { primary: '#3B82F6', secondary: '#1D4ED8' },
                          socialLinks: club.socialLinks || {},
                          contact: club.contact || {}
                        });
                      }}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedClub?._id === club._id
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                      }`}
                    >
                      <h3 className="font-semibold text-gray-900 dark:text-white">{club.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">{club.category}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                        {club.events?.length || 0} events • {club.members?.length || 0} members
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            <div className="space-y-6">
              {/* Club Information */}
              <Card>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                  Club Information - {selectedClub?.name}
                </h2>
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
                      <option value="technology">Technology</option>
                      <option value="sports">Sports</option>
                      <option value="arts">Arts</option>
                      <option value="academic">Academic</option>
                      <option value="social">Social</option>
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
                        value={clubSettings.colors?.primary || '#3B82F6'}
                        onChange={(e) => setClubSettings({
                          ...clubSettings,
                          colors: { ...clubSettings.colors, primary: e.target.value }
                        })}
                        className="w-12 h-10 border border-gray-300 dark:border-gray-600 rounded"
                      />
                      <input
                        type="text"
                        value={clubSettings.colors?.primary || '#3B82F6'}
                        onChange={(e) => setClubSettings({
                          ...clubSettings,
                          colors: { ...clubSettings.colors, primary: e.target.value }
                        })}
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
                        value={clubSettings.colors?.secondary || '#1D4ED8'}
                        onChange={(e) => setClubSettings({
                          ...clubSettings,
                          colors: { ...clubSettings.colors, secondary: e.target.value }
                        })}
                        className="w-12 h-10 border border-gray-300 dark:border-gray-600 rounded"
                      />
                      <input
                        type="text"
                        value={clubSettings.colors?.secondary || '#1D4ED8'}
                        onChange={(e) => setClubSettings({
                          ...clubSettings,
                          colors: { ...clubSettings.colors, secondary: e.target.value }
                        })}
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Color Preview */}
                <div className="mt-4 p-4 rounded-lg" style={{ backgroundColor: (clubSettings.colors?.primary || '#3B82F6') + '10' }}>
                  <div className="flex items-center space-x-4">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold"
                      style={{ backgroundColor: clubSettings.colors?.primary || '#3B82F6' }}
                    >
                      {clubSettings.name.substring(0, 2).toUpperCase() || 'TC'}
                    </div>
                    <div>
                      <h3 className="font-semibold" style={{ color: clubSettings.colors?.primary || '#3B82F6' }}>
                        {clubSettings.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Color preview</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Club Stats */}
              {selectedClub && (
                <Card>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Club Statistics</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                        {selectedClub.members?.length || 0}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Members</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                        {selectedClub.events?.length || 0}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Events</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                        {selectedClub.followers?.length || 0}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Followers</div>
                    </div>
                  </div>
                </Card>
              )}

              {/* Save Button */}
              <div className="flex justify-end">
                <Button onClick={handleSave} disabled={saving || !selectedClub}>
                  {saving ? <LoadingSpinner size="sm" /> : 'Save Changes'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Create Event Modal */}
      <Modal
        isOpen={showEventModal}
        onClose={() => setShowEventModal(false)}
        title="Create New Event"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Event Title *
            </label>
            <input
              type="text"
              required
              value={eventData.title}
              onChange={(e) => setEventData({...eventData, title: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              placeholder="Enter event title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description *
            </label>
            <textarea
              required
              rows={3}
              value={eventData.description}
              onChange={(e) => setEventData({...eventData, description: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              placeholder="Describe your event..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Date *
              </label>
              <input
                type="date"
                required
                value={eventData.date}
                onChange={(e) => setEventData({...eventData, date: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Time *
              </label>
              <input
                type="time"
                required
                value={eventData.time}
                onChange={(e) => setEventData({...eventData, time: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Location *
            </label>
            <input
              type="text"
              required
              value={eventData.location}
              onChange={(e) => setEventData({...eventData, location: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              placeholder="Event location"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Category *
            </label>
            <select
              value={eventData.category}
              onChange={(e) => setEventData({...eventData, category: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="workshop">Workshop</option>
              <option value="seminar">Seminar</option>
              <option value="competition">Competition</option>
              <option value="social">Social</option>
              <option value="meeting">Meeting</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Event Image URL
            </label>
            <input
              type="url"
              value={eventData.image_url}
              onChange={(e) => setEventData({...eventData, image_url: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              placeholder="https://example.com/event-image.jpg"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="paymentRequired"
              checked={eventData.paymentRequired}
              onChange={(e) => setEventData({...eventData, paymentRequired: e.target.checked})}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="paymentRequired" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              Payment Required
            </label>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              variant="secondary"
              onClick={() => setShowEventModal(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleCreateEvent}>
              Create Event
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ClubManagement;
