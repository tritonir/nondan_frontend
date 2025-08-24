import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import Sidebar from '../../components/layout/Sidebar';
import EventCard from '../../components/EventCard';

const StudentEvents = () => {
  // const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('registered');
  const [events, setEvents] = useState({ registered: [], completed: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserEvents = async () => {
      try {
        const token = localStorage.getItem('nondan-token');
        const res = await fetch('http://nondan-backend.vercel.app/api/event/showstev', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          }, // optional if middleware uses token
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.message || 'Failed to fetch events');

        // Separate registered and completed events
        setEvents({
          registered: data.filter(e => e),
          completed: data.filter(e => e)
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserEvents();
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 lg:ml-64 p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">My Events</h1>

        {/* Tabs */}
        <div className="flex space-x-1 bg-white dark:bg-gray-800 rounded-lg p-1 mb-6 w-fit">
          <button
            onClick={() => setActiveTab('registered')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'registered'
              ? 'bg-[var(--primary-accent-1)] text-white'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
          >
            Registered ({events.registered.length})
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'completed'
              ? 'bg-[var(--primary-accent-1)] text-white'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
          >
            Completed ({events.completed.length})
          </button>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.registered.map(event => (
            <EventCard key={event.event_id._id} event={event.event_id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentEvents;
