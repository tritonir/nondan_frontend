import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Sidebar from '../../components/layout/Sidebar';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Mock data - replace with actual API calls
  const stats = [
    { label: 'Total Events', value: '47', change: '+12%', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', color: 'bg-blue-500' },
    { label: 'Active Members', value: '1,284', change: '+23%', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z', color: 'bg-green-500' },
    { label: 'This Month', value: '15', change: '+8%', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', color: 'bg-purple-500' },
    { label: 'Registrations', value: '2,156', change: '+31%', icon: 'M9 12l2 2 4-4m6-2a9 9 0 11-18 0 9 9 0 0118 0z', color: 'bg-yellow-500' }
  ];

  const recentEvents = [
    { id: '1', title: 'Tech Talk: AI in Development', date: '2025-09-15', status: 'upcoming', registrations: 45 },
    { id: '2', title: 'Annual Sports Festival', date: '2025-09-20', status: 'upcoming', registrations: 200 },
    { id: '3', title: 'Art Exhibition', date: '2025-09-25', status: 'upcoming', registrations: 30 },
    { id: '4', title: 'Leadership Workshop', date: '2025-08-10', status: 'completed', registrations: 85 },
    { id: '5', title: 'Coding Bootcamp', date: '2025-08-05', status: 'completed', registrations: 120 }
  ];

  const pendingActions = [
    { type: 'approval', title: 'New event submission: "Marketing Workshop"', priority: 'high', time: '2 hours ago' },
    { type: 'review', title: 'Event feedback from "React Conference"', priority: 'medium', time: '1 day ago' },
    { type: 'update', title: 'Venue change request for "Design Thinking"', priority: 'high', time: '3 hours ago' },
    { type: 'certificate', title: 'Certificate requests pending (5)', priority: 'low', time: '2 days ago' }
  ];

  const upcomingDeadlines = [
    { task: 'Finalize venue for Tech Conference', date: '2025-08-25', status: 'urgent' },
    { task: 'Send certificates for completed events', date: '2025-08-27', status: 'pending' },
    { task: 'Review event proposals', date: '2025-08-30', status: 'pending' },
    { task: 'Monthly report submission', date: '2025-09-01', status: 'upcoming' }
  ];

  const getStatusColor = (status) => {
    const colors = {
      upcoming: 'success',
      completed: 'default',
      cancelled: 'danger',
      draft: 'warning'
    };
    return colors[status] || 'default';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'danger',
      medium: 'warning',
      low: 'default'
    };
    return colors[priority] || 'default';
  };

  const getDeadlineStatus = (status) => {
    const colors = {
      urgent: 'danger',
      pending: 'warning',
      upcoming: 'info'
    };
    return colors[status] || 'default';
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 lg:ml-64">
        {/* Mobile header */}
        <div className="lg:hidden bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-600 dark:text-gray-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        <div className="p-6">
          {/* Welcome Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Welcome back, {user?.name}! 🚀
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Here's an overview of your club's activity and performance
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                    <p className="text-xs text-green-600 dark:text-green-400 mt-1">{stat.change}</p>
                  </div>
                  <div className={`${stat.color} p-3 rounded-lg text-white`}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} />
                    </svg>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Quick Actions */}
          <Card className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link to="/admin/create">
                <Button className="w-full justify-start h-12">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Create New Event
                </Button>
              </Link>
              <Link to="/admin/events">
                <Button variant="outline" className="w-full justify-start h-12">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                  </svg>
                  Manage Events
                </Button>
              </Link>
              <Link to="/admin/analytics">
                <Button variant="outline" className="w-full justify-start h-12">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  View Analytics
                </Button>
              </Link>
            </div>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Recent Events */}
              <Card>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Recent Events
                  </h2>
                  <Link to="/admin/events">
                    <Button variant="ghost" size="sm">View All</Button>
                  </Link>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="text-left py-2 text-sm font-medium text-gray-600 dark:text-gray-400">Event</th>
                        <th className="text-left py-2 text-sm font-medium text-gray-600 dark:text-gray-400">Date</th>
                        <th className="text-left py-2 text-sm font-medium text-gray-600 dark:text-gray-400">Status</th>
                        <th className="text-left py-2 text-sm font-medium text-gray-600 dark:text-gray-400">Registrations</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentEvents.map(event => (
                        <tr key={event.id} className="border-b border-gray-100 dark:border-gray-800">
                          <td className="py-3">
                            <p className="font-medium text-gray-900 dark:text-white">{event.title}</p>
                          </td>
                          <td className="py-3 text-sm text-gray-600 dark:text-gray-400">
                            {new Date(event.date).toLocaleDateString()}
                          </td>
                          <td className="py-3">
                            <Badge variant={getStatusColor(event.status)} size="sm">
                              {event.status}
                            </Badge>
                          </td>
                          <td className="py-3 text-sm text-gray-600 dark:text-gray-400">
                            {event.registrations}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>

              {/* Pending Actions */}
              <Card>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Pending Actions
                </h2>
                <div className="space-y-3">
                  {pendingActions.map((action, index) => (
                    <div key={index} className="flex items-start justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                          {action.title}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{action.time}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={getPriorityColor(action.priority)} size="sm">
                          {action.priority}
                        </Badge>
                        <Button size="sm" variant="outline">
                          Review
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Sidebar Content */}
            <div className="space-y-6">
              {/* Upcoming Deadlines */}
              <Card>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Upcoming Deadlines
                </h3>
                <div className="space-y-3">
                  {upcomingDeadlines.map((deadline, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-[var(--primary-accent-1)] rounded-full mt-2 flex-shrink-0"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {deadline.task}
                        </p>
                        <div className="flex items-center justify-between mt-1">
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {new Date(deadline.date).toLocaleDateString()}
                          </p>
                          <Badge variant={getDeadlineStatus(deadline.status)} size="sm">
                            {deadline.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Club Performance */}
              <Card>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Club Performance
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Event Attendance</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">85%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="bg-[var(--primary-accent-1)] h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Member Growth</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">23%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '23%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Event Success Rate</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">92%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
