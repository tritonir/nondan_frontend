import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Sidebar from '../../components/layout/Sidebar';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import EventCard from '../../components/EventCard';

const StudentEvents = () => {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('registered');

  // Mock data
  const events = {
    registered: [
      {
        id: '1',
        title: 'Tech Talk: AI in Modern Development',
        description: 'Join us for an insightful discussion about AI in software development.',
        date: '2025-09-15T18:00:00Z',
        location: 'Engineering Auditorium',
        image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400',
        category: 'Technology',
        status: 'upcoming',
        club: { name: 'Tech Club', id: 'tech-club' },
        attendees: { current: 45, max: 100 },
        isRegistered: true
      }
    ],
    completed: [
      {
        id: '2',
        title: 'Web Development Workshop',
        description: 'Learn modern web development techniques.',
        date: '2025-08-10T14:00:00Z',
        location: 'Computer Lab',
        category: 'Technology',
        status: 'completed',
        club: { name: 'Tech Club', id: 'tech-club' },
        attendees: { current: 30, max: 30 },
        certificate: true
      }
    ]
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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">My Events</h1>

          {/* Tabs */}
          <div className="flex space-x-1 bg-white dark:bg-gray-800 rounded-lg p-1 mb-6 w-fit">
            <button
              onClick={() => setActiveTab('registered')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'registered'
                  ? 'bg-[var(--primary-accent-1)] text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              Registered ({events.registered.length})
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'completed'
                  ? 'bg-[var(--primary-accent-1)] text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              Completed ({events.completed.length})
            </button>
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events[activeTab].map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentEvents;
