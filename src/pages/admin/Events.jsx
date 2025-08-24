import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Sidebar from '../../components/layout/Sidebar';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';

const AdminEvents = () => {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Mock events data
  const events = [
    {
      id: '1',
      title: 'Tech Talk: AI in Modern Development',
      date: '2025-09-15T18:00:00Z',
      location: 'Engineering Auditorium',
      status: 'upcoming',
      registrations: 45,
      maxAttendees: 100,
      category: 'Technology'
    },
    {
      id: '2',
      title: 'Annual Sports Festival',
      date: '2025-09-20T09:00:00Z',
      location: 'Sports Complex',
      status: 'upcoming',
      registrations: 200,
      maxAttendees: 500,
      category: 'Sports'
    },
    {
      id: '3',
      title: 'Web Development Workshop',
      date: '2025-08-10T14:00:00Z',
      location: 'Computer Lab',
      status: 'completed',
      registrations: 30,
      maxAttendees: 30,
      category: 'Technology'
    }
  ];

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

  const confirmDelete = () => {
    console.log('Deleting event:', selectedEvent.id);
    setShowDeleteModal(false);
    setSelectedEvent(null);
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
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Manage Events</h1>
            <Button onClick={() => window.location.href = '/admin/events/create'}>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
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
                    <tr key={event.id} className="border-b border-gray-100 dark:border-gray-800">
                      <td className="py-4">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{event.title}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{event.category}</p>
                        </div>
                      </td>
                      <td className="py-4 text-sm text-gray-600 dark:text-gray-400">
                        {new Date(event.date).toLocaleDateString()}
                      </td>
                      <td className="py-4 text-sm text-gray-600 dark:text-gray-400">
                        {event.location}
                      </td>
                      <td className="py-4">
                        <Badge variant={getStatusColor(event.status)} size="sm">
                          {event.status}
                        </Badge>
                      </td>
                      <td className="py-4 text-sm text-gray-600 dark:text-gray-400">
                        {event.registrations} / {event.maxAttendees}
                      </td>
                      <td className="py-4">
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">Edit</Button>
                          <Button
                            size="sm"
                            variant="danger"
                            onClick={() => handleDelete(event)}
                          >
                            Delete
                          </Button>
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

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Event"
      >
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Delete "{selectedEvent?.title}"?
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            This action cannot be undone. All registrations will be cancelled.
          </p>
          <div className="flex space-x-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setShowDeleteModal(false)}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              className="flex-1"
              onClick={confirmDelete}
            >
              Delete Event
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AdminEvents;
