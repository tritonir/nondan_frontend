import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Sidebar from '../../components/layout/Sidebar';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import InviteModal from '../../components/club/InviteModal';
import { UserPlus, Users, Calendar, TrendingUp, Award } from 'lucide-react';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);

  // Mock data - replace with actual API calls
  const stats = [
    { label: 'Total Events', value: '47', change: '+12%', icon: Calendar, color: 'bg-blue-500' },
    { label: 'Active Members', value: '1,284', change: '+23%', icon: Users, color: 'bg-green-500' },
    { label: 'This Month', value: '15', change: '+8%', icon: TrendingUp, color: 'bg-purple-500' },
    { label: 'Registrations', value: '2,156', change: '+31%', icon: Award, color: 'bg-yellow-500' }
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

  const handleInviteMember = async (email, role) => {
    try {
      // TODO: Replace with actual API call to invite member to club/organization
      console.log('Inviting member:', email, 'with role:', role);

      // Mock delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

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

        <div className="max-w-7xl mx-auto p-6">
          {/* Welcome Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Welcome back, {user?.name}! 🚀
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Here's an overview of your club's activity and performance
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-3 mt-4 md:mt-0">
              <Button
                variant="outline"
                onClick={() => setShowInviteModal(true)}
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Invite Member
              </Button>
              <Link to="/admin/events/create">
                <Button>
                  <Calendar className="h-4 w-4 mr-2" />
                  Create Event
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="p-6">
                  <div className="flex items-center">
                    <div className="flex-1">
                      <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                      <p className="text-sm text-green-600 dark:text-green-400">{stat.change}</p>
                    </div>
                    <div className={`${stat.color} p-3 rounded-lg`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Events */}
            <div className="lg:col-span-2">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Events</h2>
                  <Link to="/admin/events">
                    <Button variant="outline" size="sm">View All</Button>
                  </Link>
                </div>

                <div className="space-y-4">
                  {recentEvents.map((event) => (
                    <div key={event.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 dark:text-white">{event.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{new Date(event.date).toLocaleDateString()}</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {event.registrations} registered
                        </span>
                        <Badge variant={getStatusColor(event.status)}>
                          {event.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              {/* Pending Actions */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Pending Actions</h2>
                <div className="space-y-3">
                  {pendingActions.map((action, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg cursor-pointer">
                      <Badge variant={getPriorityColor(action.priority)} className="mt-1">
                        {action.priority}
                      </Badge>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {action.title}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{action.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Upcoming Deadlines */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Upcoming Deadlines</h2>
                <div className="space-y-3">
                  {upcomingDeadlines.map((deadline, index) => (
                    <div key={index} className="p-3 border-l-4 border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {deadline.task}
                        </span>
                        <Badge variant={getDeadlineStatus(deadline.status)}>
                          {deadline.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Due: {new Date(deadline.date).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Invite Member Modal */}
      <InviteModal
        isOpen={showInviteModal}
        onClose={() => setShowInviteModal(false)}
        clubId="admin-organization" // This would be the organization/club ID
        onInvite={handleInviteMember}
      />
    </div>
  );
};

export default AdminDashboard;
