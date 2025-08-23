import React, { useState } from 'react';
import SearchBar from '../components/ui/SearchBar';
import EventCard from '../components/EventCard';
import ClubCard from '../components/ClubCard';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';

const ExplorePage = () => {
  const [activeTab, setActiveTab] = useState('events');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');

  // Mock data - replace with actual API calls
  const events = [
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
    },
    {
      id: '4',
      title: 'Business Workshop: Entrepreneurship',
      description: 'Learn from successful entrepreneurs about starting and scaling your own business.',
      date: '2025-09-28T16:00:00Z',
      location: 'Business School',
      category: 'Academic',
      status: 'upcoming',
      club: { name: 'Business Club', id: 'business-club' },
      attendees: { current: 60, max: 120 }
    },
    {
      id: '5',
      title: 'Music Concert: Battle of Bands',
      description: 'Enjoy an evening of live music performances by talented student bands.',
      date: '2025-10-01T19:00:00Z',
      location: 'Main Auditorium',
      category: 'Arts',
      status: 'upcoming',
      club: { name: 'Music Society', id: 'music-society' },
      attendees: { current: 150, max: 300 }
    },
    {
      id: '6',
      title: 'Community Service Day',
      description: 'Join us in giving back to the community through various volunteer activities.',
      date: '2025-10-05T08:00:00Z',
      location: 'Various Locations',
      category: 'Social',
      status: 'upcoming',
      club: { name: 'Volunteer Club', id: 'volunteer-club' },
      attendees: { current: 80, max: 200 }
    }
  ];

  const clubs = [
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

  const categories = ['all', 'technology', 'sports', 'arts', 'academic', 'social'];

  const filteredData = (activeTab === 'events' ? events : clubs).filter(item => {
    const matchesSearch = item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' ||
                           item.category?.toLowerCase() === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Explore</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Discover events and clubs that match your interests
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <SearchBar
            placeholder={`Search ${activeTab}...`}
            onSearch={setSearchQuery}
            className="max-w-2xl"
          />

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-[var(--primary-accent-1)] text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Tabs and View Controls */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-1 bg-white dark:bg-gray-800 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('events')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'events'
                  ? 'bg-[var(--primary-accent-1)] text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              Events ({events.length})
            </button>
            <button
              onClick={() => setActiveTab('clubs')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'clubs'
                  ? 'bg-[var(--primary-accent-1)] text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              Clubs ({clubs.length})
            </button>
          </div>

          {/* View Mode Toggle */}
          <div className="flex space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg ${
                viewMode === 'grid'
                  ? 'bg-[var(--primary-accent-1)] text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg ${
                viewMode === 'list'
                  ? 'bg-[var(--primary-accent-1)] text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="mb-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Showing {filteredData.length} {activeTab}
            {selectedCategory !== 'all' && ` in ${selectedCategory}`}
            {searchQuery && ` matching "${searchQuery}"`}
          </p>
        </div>

        {/* Content Grid/List */}
        {filteredData.length > 0 ? (
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          }`}>
            {filteredData.map(item => (
              activeTab === 'events' ? (
                <EventCard key={item.id} event={item} />
              ) : (
                <ClubCard key={item.id} club={item} />
              )
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No {activeTab} found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Try adjusting your search criteria or browse different categories.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExplorePage;
