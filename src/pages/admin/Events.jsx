import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import Sidebar from '../../components/layout/Sidebar';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const AdminEvents = () => {
  // const { token } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch('http://nondan-backend.vercel.app/api/event/');
        // if (!res.ok) throw new Error('Failed to fetch events');
        const data = await res.json();
        setEvents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const getStatusColor = (status) => {
    const colors = {
      upcoming: 'success',
      ongoing: 'warning',
      completed: 'default',
      cancelled: 'danger'
    };
    return colors[status] || 'default';
  };

  const handleDelete = (event) => {
    setSelectedEvent(event);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    console.log(selectedEvent._id)
    try {
      await fetch(`http://nondan-backend.vercel.app/api/event/${selectedEvent._id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('nondan-token')}` }
      });
      setEvents(prev => prev.filter(ev => ev._id !== selectedEvent._id));
    } catch (err) {
      console.error('Failed to delete event:', err);
    } finally {
      setShowDeleteModal(false);
      setSelectedEvent(null);
    }
  };

  if (loading) return <div className="flex justify-center items-center min-h-screen"><LoadingSpinner /></div>;
  if (error) return <p className="text-red-600 text-center mt-6">{error}</p>;
  if (events.length === 0) return <p className="text-center mt-6">No events found.</p>;

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
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Manage Events</h1>
            <Button onClick={() => window.location.href = '/admin/events/create'}>
              Create Event
            </Button>
          </div>

          <Card>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 text-sm font-medium text-gray-600 dark:text-gray-400">Event</th>
                    <th className="text-left py-3 text-sm font-medium text-gray-600 dark:text-gray-400">Date</th>
                    <th className="text-left py-3 text-sm font-medium text-gray-600 dark:text-gray-400">Location</th>
                    <th className="text-left py-3 text-sm font-medium text-gray-600 dark:text-gray-400">Status</th>
                    <th className="text-left py-3 text-sm font-medium text-gray-600 dark:text-gray-400">Registrations</th>
                    <th className="text-left py-3 text-sm font-medium text-gray-600 dark:text-gray-400">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map(event => (
                    <tr key={event._id} className="border-b border-gray-100 dark:border-gray-800">
                      <td className="py-4">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{event.title}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{event.category}</p>
                        </div>
                      </td>
                      <td className="py-4 text-sm text-gray-600 dark:text-gray-400">
                        {new Date(event.date).toLocaleDateString()}
                      </td>
                      <td className="py-4 text-sm text-gray-600 dark:text-gray-400">{event.location}</td>
                      <td className="py-4">
                        <Badge variant={getStatusColor(event.status)} size="sm">{event.status}</Badge>
                      </td>
                      <td className="py-4 text-sm text-gray-600 dark:text-gray-400">
                        {event.registrations || 0} / {event.maxAttendees || 0}
                      </td>
                      <td className="py-4">
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">Edit</Button>
                          <Button size="sm" variant="danger" onClick={() => handleDelete(event)}>Delete</Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>

      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Event"
      >
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Delete "{selectedEvent?.title}"?
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            This action cannot be undone.
          </p>
          <div className="flex space-x-3">
            <Button variant="outline" className="flex-1" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
            <Button variant="danger" className="flex-1" onClick={confirmDelete}>Delete Event</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AdminEvents;
