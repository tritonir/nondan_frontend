import React from 'react';
import { useParams } from 'react-router-dom';
import { ClubThemeProvider } from '../context/ThemeContext';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import EventCard from '../components/EventCard';

const ClubDetailPage = () => {
  const { id } = useParams();

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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* About */}
              <Card>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">About</h2>
                <p className="text-gray-600 dark:text-gray-300">{club.fullDescription}</p>
              </Card>

              {/* Upcoming Events */}
              <Card>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Upcoming Events</h2>
                <div className="grid gap-6">
                  {upcomingEvents.map(event => (
                    <EventCard key={event.id} event={event} showClubInfo={false} />
                  ))}
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Club Info */}
              <Card>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Club Information</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Category</span>
                    <p className="font-medium text-gray-900 dark:text-white">{club.category}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Founded</span>
                    <p className="font-medium text-gray-900 dark:text-white">{club.founded}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">President</span>
                    <p className="font-medium text-gray-900 dark:text-white">{club.president.name}</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </ClubThemeProvider>
  );
};

export default ClubDetailPage;
