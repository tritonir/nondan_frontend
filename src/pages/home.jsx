import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import EventCard from '../components/EventCard';
import ClubCard from '../components/ClubCard';
import SearchBar from '../components/ui/SearchBar';

const Home = () => {
  const { isAuthenticated, user } = useAuth();

  // Mock data - replace with actual API calls
  const featuredEvents = [
    {
      id: '1',
      title: 'Tech Talk: AI in Modern Development',
      description: 'Join us for an insightful discussion about the role of artificial intelligence in modern software development.',
      date: '2025-09-15T18:00:00Z',
      location: 'Engineering Auditorium',
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400',
      category: 'Technology',
      status: 'upcoming',
      club: { name: 'Tech Club', id: 'tech-club' },
      attendees: { current: 45, max: 100 }
    },
    {
      id: '2',
      title: 'Annual Sports Festival',
      description: 'Get ready for an exciting day of sports competitions, team spirit, and fun activities.',
      date: '2025-09-20T09:00:00Z',
      location: 'Sports Complex',
      image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400',
      category: 'Sports',
      status: 'upcoming',
      club: { name: 'Sports Club', id: 'sports-club' },
      attendees: { current: 200, max: 500 }
    },
    {
      id: '3',
      title: 'Art Exhibition: Student Showcase',
      description: 'Discover amazing artworks created by our talented students from various disciplines.',
      date: '2025-09-25T14:00:00Z',
      location: 'Art Gallery',
      image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400',
      category: 'Arts',
      status: 'upcoming',
      club: { name: 'Art Society', id: 'art-society' },
      attendees: { current: 30, max: 80 }
    }
  ];

  const popularClubs = [
    {
      id: 'tech-club',
      name: 'Technology Club',
      description: 'Exploring the latest in technology, programming, and innovation. Join us for workshops, hackathons, and tech talks.',
      category: 'Technology',
      memberCount: 1250,
      eventCount: 24,
      colors: { primary: '#3B82F6', secondary: '#1D4ED8' },
      recentEvents: [
        { title: 'React Workshop' },
        { title: 'AI Symposium' }
      ]
    },
    {
      id: 'sports-club',
      name: 'Sports Club',
      description: 'Promoting fitness, teamwork, and sportsmanship through various athletic activities and competitions.',
      category: 'Sports',
      memberCount: 800,
      eventCount: 18,
      colors: { primary: '#10B981', secondary: '#059669' },
      recentEvents: [
        { title: 'Basketball Tournament' },
        { title: 'Marathon Training' }
      ]
    },
    {
      id: 'art-society',
      name: 'Art Society',
      description: 'A creative community for artists, designers, and art enthusiasts to share, learn, and grow together.',
      category: 'Arts',
      memberCount: 450,
      eventCount: 12,
      colors: { primary: '#F59E0B', secondary: '#D97706' },
      recentEvents: [
        { title: 'Photography Workshop' },
        { title: 'Digital Art Contest' }
      ]
    }
  ];

  const stats = [
    { label: 'Active Events', value: '150+', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { label: 'Student Clubs', value: '50+', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
    { label: 'Students', value: '5000+', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z' },
    { label: 'Events This Month', value: '25', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[var(--primary-accent-1)] to-[var(--primary-accent-2)] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Welcome to <span className="text-[var(--soft-background)]">Eventify</span>
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Discover amazing events, connect with clubs, and make the most of your university experience.
              Join thousands of students already using Eventify to stay engaged.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <SearchBar
                placeholder="Search events, clubs, categories..."
                className="bg-white/10 backdrop-blur-sm"
              />
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {isAuthenticated ? (
                <>
                  <Link to="/explore">
                    <Button size="lg" variant="outline" className="bg-white text-[var(--primary-accent-1)] border-white hover:bg-gray-100">
                      Explore Events
                    </Button>
                  </Link>
                  <Link to={user?.role === 'admin' ? '/admin/dashboard' : '/student/dashboard'}>
                    <Button size="lg" className="bg-white/10 backdrop-blur-sm text-white border border-white/30 hover:bg-white/20">
                      Go to Dashboard
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/auth/signup">
                    <Button size="lg" variant="outline" className="bg-white text-[var(--primary-accent-1)] border-white hover:bg-gray-100">
                      Get Started
                    </Button>
                  </Link>
                  <Link to="/explore">
                    <Button size="lg" className="bg-white/10 backdrop-blur-sm text-white border border-white/30 hover:bg-white/20">
                      Explore Events
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-[var(--primary-accent-1)] rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} />
                    </svg>
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{stat.value}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Featured Events</h2>
            <Link to="/explore">
              <Button variant="outline">View All Events</Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Clubs */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Popular Clubs</h2>
            <Link to="/clubs">
              <Button variant="outline">View All Clubs</Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularClubs.map((club) => (
              <ClubCard key={club.id} club={club} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!isAuthenticated && (
        <section className="py-16 bg-[var(--soft-background)] dark:bg-gray-900">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              Join Eventify today and never miss out on amazing university events and activities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth/signup">
                <Button size="lg">Create Account</Button>
              </Link>
              <Link to="/auth/login">
                <Button size="lg" variant="outline">Sign In</Button>
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
