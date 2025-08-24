import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ClubThemeProvider } from '../context/ThemeContext';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import EventCard from '../components/EventCard';
import InviteModal from '../components/club/InviteModal';
import MemberList from '../components/club/MemberList';
import RoleManager from '../components/club/RoleManager';
import { ClubService } from '../services/clubService';
import { Users, Settings, Calendar, Info } from 'lucide-react';

const ClubDetailPage = () => {
  const { id } = useParams();
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('about');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [members, setMembers] = useState([]);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock club data - replace with actual API call
  const club = {
    id: 'tech-club',
    name: 'Technology Club',
    description: 'Exploring the latest in technology, programming, and innovation. Join us for workshops, hackathons, and tech talks.',
    fullDescription: 'The Technology Club is a vibrant community of students passionate about technology, programming, and innovation. We organize regular workshops, hackathons, tech talks, and networking events to help members stay updated with the latest trends and develop their technical skills.',
    category: 'Technology',
    memberCount: 1250,
    eventCount: 24,
    colors: { primary: '#3B82F6', secondary: '#1D4ED8' },
    banner: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800',
    logo: null,
    founded: '2018',
    president: {
      name: 'Sarah Johnson',
      email: 'sarah.j@university.edu',
      avatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=3B82F6&color=fff'
    },
    isFollowing: false,
    isMember: false
  };

  const upcomingEvents = [
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
      attendees: { current: 45, max: 100 }
    }
  ];

  useEffect(() => {
    loadClubData();
  }, [id, user]);

  const loadClubData = async () => {
    try {
      setLoading(true);

      // Load club members
      const membersResult = await ClubService.getClubMembers(id);
      if (membersResult.success) {
        setMembers(membersResult.data);

        // Check user's role in this club
        if (isAuthenticated && user?.id) {
          const userMember = membersResult.data.find(member => member.id === user.id);
          setUserRole(userMember?.role || null);
        }
      }
    } catch (error) {
      console.error('Error loading club data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInviteMember = async (email, role) => {
    try {
      const result = await ClubService.inviteMember(id, email, role, user?.id);
      if (result.success) {
        return { success: true };
      } else {
        return { success: false, error: result.error };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const handleUpdateRole = async (memberId, newRole) => {
    try {
      const result = await ClubService.updateMemberRole(id, memberId, newRole, user?.id);
      if (result.success) {
        // Reload members to reflect changes
        loadClubData();
        return true;
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      throw error;
    }
  };

  const handleRemoveMember = async (memberId) => {
    try {
      const result = await ClubService.removeMember(id, memberId, user?.id);
      if (result.success) {
        // Reload members to reflect changes
        loadClubData();
        return true;
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      throw error;
    }
  };

  const canManageMembers = userRole === 'admin' || userRole === 'moderator';

  const tabs = [
    { id: 'about', label: 'About', icon: Info },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'members', label: 'Members', icon: Users },
    ...(userRole ? [{ id: 'roles', label: 'Role Management', icon: Settings }] : [])
  ];

  return (
    <ClubThemeProvider clubColors={club.colors}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Club Header */}
        <div
          className="relative h-64 bg-gradient-to-r from-[var(--club-primary)] to-[var(--club-secondary)]"
          style={{
            background: club.banner
              ? `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${club.banner})`
              : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="max-w-7xl mx-auto flex items-end space-x-6">
              <div className="w-24 h-24 bg-white rounded-lg flex items-center justify-center shadow-lg">
                {club.logo ? (
                  <img src={club.logo} alt={club.name} className="w-16 h-16 rounded" />
                ) : (
                  <span className="text-2xl font-bold text-[var(--club-primary)]">
                    {club.name.charAt(0)}
                  </span>
                )}
              </div>
              <div className="flex-1 text-white">
                <h1 className="text-4xl font-bold mb-2">{club.name}</h1>
                <p className="text-xl opacity-90">{club.description}</p>
                <div className="flex items-center space-x-6 mt-4 text-sm">
                  <span>{club.memberCount.toLocaleString()} members</span>
                  <span>{club.eventCount} events</span>
                  <span>Founded {club.founded}</span>
                </div>
              </div>
              <div className="flex space-x-3">
                <Button variant={club.isFollowing ? 'secondary' : 'primary'}>
                  {club.isFollowing ? 'Following' : 'Follow'}
                </Button>
                <Button variant="outline" className="bg-white/10 border-white text-white">
                  {club.isMember ? 'Member' : 'Join Club'}
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Navigation Tabs */}
          <div className="border-b border-gray-200 dark:border-gray-700 mb-8">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? 'border-[var(--club-primary)] text-[var(--club-primary)]'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Tab Content */}
          {activeTab === 'about' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* About */}
                <Card className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">About</h2>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {club.fullDescription}
                  </p>
                </Card>

                {/* Upcoming Events */}
                <Card className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Upcoming Events</h2>
                  <div className="space-y-4">
                    {upcomingEvents.map((event) => (
                      <EventCard key={event.id} event={event} />
                    ))}
                  </div>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Club Info */}
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Club Information</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Category</span>
                      <Badge>{club.category}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Members</span>
                      <span className="font-medium text-gray-900 dark:text-white">{club.memberCount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Events</span>
                      <span className="font-medium text-gray-900 dark:text-white">{club.eventCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Founded</span>
                      <span className="font-medium text-gray-900 dark:text-white">{club.founded}</span>
                    </div>
                  </div>
                </Card>

                {/* Club Leadership */}
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Leadership</h3>
                  <div className="flex items-center space-x-3">
                    <img
                      src={club.president.avatar}
                      alt={club.president.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">{club.president.name}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">President</div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {activeTab === 'events' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}

          {activeTab === 'members' && (
            <MemberList
              clubId={id}
              members={members}
              onInvite={() => setShowInviteModal(true)}
              onUpdateRole={handleUpdateRole}
              onRemoveMember={handleRemoveMember}
              currentUserRole={userRole}
            />
          )}

          {activeTab === 'roles' && userRole && (
            <RoleManager
              clubId={id}
              currentUserRole={userRole}
              onRoleUpdate={() => loadClubData()}
            />
          )}
        </div>

        {/* Invite Modal */}
        <InviteModal
          isOpen={showInviteModal}
          onClose={() => setShowInviteModal(false)}
          clubId={id}
          onInvite={handleInviteMember}
        />
      </div>
    </ClubThemeProvider>
  );
};

export default ClubDetailPage;
