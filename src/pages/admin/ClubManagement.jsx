import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/layout/Sidebar';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import Modal from '../../components/ui/Modal';

const ClubManagement = () => {
  // const { user } = useAuth();
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [clubs, setClubs] = useState([]);
  const [selectedClub, setSelectedClub] = useState(null);
  const [showEventModal, setShowEventModal] = useState(false);

  const [clubSettings, setClubSettings] = useState({
    name: '',
    description: '',
    category: 'technology',
    colors: { primary: '#3B82F6', secondary: '#1D4ED8' },
    socialLinks: { website: '', instagram: '', facebook: '', twitter: '' },
    contact: { email: '', phone: '' }
  });

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

  // Fetch clubs
  const fetchUserClubs = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('http://localhost:5000/api/club/');
      if (!response.ok) throw new Error('Failed to fetch clubs');

      const data = await response.json();
      setClubs(data);

      if (data.length > 0 && !selectedClub) {
        setSelectedClub(data[0]);
        setClubSettings({
          name: data[0].name,
          description: data[0].description,
          category: data[0].category,
          colors: data[0].colors || { primary: '#3B82F6', secondary: '#1D4ED8' },
          socialLinks: data[0].socialLinks || {},
          contact: data[0].contact || {}
        });
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserClubs();
  }, []);

  const handleSave = async () => {
    if (!selectedClub) return;
    setSaving(true);
    setError('');
    try {
      const response = await fetch(`http://localhost:5000/api/club/${selectedClub._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(clubSettings)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to update club');

      // Update local state
      setClubs(prevClubs =>
        prevClubs.map(club => (club._id === selectedClub._id ? { ...club, ...clubSettings } : club))
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
      const response = await fetch('http://localhost:5000/api/event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ ...eventData, club_id: selectedClub._id })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to create event');

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

      fetchUserClubs();
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 lg:ml-64 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    </div>
  );

  if (clubs.length === 0) return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 lg:ml-64 p-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">No Clubs Found</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            You don't have any clubs to manage. Create a new club to get started.
          </p>
          <Button onClick={() => navigate('/admin/create-club')}>Create New Club</Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 lg:ml-64 p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Club Management</h1>
          <div className="flex space-x-3">
            <Button variant="secondary" onClick={() => setShowEventModal(true)}>Create Event</Button>
            <Button onClick={() => navigate('/admin/create-club')}>Create New Club</Button>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        {/* Club List */}
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
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${selectedClub?._id === club._id
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

        {/* Club Info and Save */}
        <Card>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Club Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Club Name</label>
              <input
                type="text"
                value={clubSettings.name}
                onChange={(e) => setClubSettings({ ...clubSettings, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
              <select
                value={clubSettings.category}
                onChange={(e) => setClubSettings({ ...clubSettings, category: e.target.value })}
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
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
              <textarea
                rows={3}
                value={clubSettings.description}
                onChange={(e) => setClubSettings({ ...clubSettings, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <Button onClick={handleSave} disabled={saving || !selectedClub}>
              {saving ? <LoadingSpinner size="sm" /> : 'Save Changes'}
            </Button>
          </div>
        </Card>

        {/* Create Event Modal */}
        <Modal isOpen={showEventModal} onClose={() => setShowEventModal(false)} title="Create New Event">
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Event Title"
              value={eventData.title}
              onChange={(e) => setEventData({ ...eventData, title: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
            />
            <textarea
              placeholder="Description"
              value={eventData.description}
              onChange={(e) => setEventData({ ...eventData, description: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
            />
            <input
              type="date"
              value={eventData.date}
              onChange={(e) => setEventData({ ...eventData, date: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
            />
            <input
              type="time"
              value={eventData.time}
              onChange={(e) => setEventData({ ...eventData, time: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Location"
              value={eventData.location}
              onChange={(e) => setEventData({ ...eventData, location: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
            />
            <input
              type="url"
              placeholder="Image URL"
              value={eventData.image_url}
              onChange={(e) => setEventData({ ...eventData, image_url: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
            />
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={eventData.paymentRequired}
                onChange={(e) => setEventData({ ...eventData, paymentRequired: e.target.checked })}
                className="mr-2"
              />
              <span>Payment Required</span>
            </div>
            <div className="flex justify-end space-x-3 pt-2">
              <Button variant="secondary" onClick={() => setShowEventModal(false)}>Cancel</Button>
              <Button onClick={handleCreateEvent}>Create Event</Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default ClubManagement;
