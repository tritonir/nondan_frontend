import React, { useState } from 'react';
import SearchBar from '../components/ui/SearchBar';
import ClubCard from '../components/ClubCard';
import Button from '../components/ui/Button';

const ClubsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  // Mock data - replace with actual API calls
  const clubs = [
    {
      id: 'tech-club',
      name: 'Technology Club',
      description: 'Exploring the latest in technology, programming, and innovation. Join us for workshops, hackathons, and tech talks.',
      category: 'Technology',
      memberCount: 1250,
      eventCount: 24,
      colors: { primary: '#3B82F6', secondary: '#1D4ED8' },
      banner: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400',
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
      banner: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
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
      banner: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400',
      recentEvents: [
        { title: 'Photography Workshop' },
        { title: 'Digital Art Contest' }
      ]
    },
    {
      id: 'business-club',
      name: 'Business Club',
      description: 'Developing entrepreneurial skills and business acumen through networking, workshops, and real-world projects.',
      category: 'Academic',
      memberCount: 680,
      eventCount: 16,
      colors: { primary: '#8B5CF6', secondary: '#7C3AED' },
      banner: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      recentEvents: [
        { title: 'Startup Pitch Night' },
        { title: 'Finance Workshop' }
      ]
    },
    {
      id: 'music-society',
      name: 'Music Society',
      description: 'Bringing together music lovers, performers, and creators to share their passion for music.',
      category: 'Arts',
      memberCount: 320,
      eventCount: 20,
      colors: { primary: '#EF4444', secondary: '#DC2626' },
      banner: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400',
      recentEvents: [
        { title: 'Battle of Bands' },
        { title: 'Music Production Workshop' }
      ]
    },
    {
      id: 'volunteer-club',
      name: 'Volunteer Club',
      description: 'Making a positive impact in the community through service projects and volunteer opportunities.',
      category: 'Social',
      memberCount: 520,
      eventCount: 14,
      colors: { primary: '#06B6D4', secondary: '#0891B2' },
      banner: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400',
      recentEvents: [
        { title: 'Community Service Day' },
        { title: 'Food Drive Campaign' }
      ]
    }
  ];

  const categories = ['all', 'technology', 'sports', 'arts', 'academic', 'social'];

  const filteredClubs = clubs.filter(club => {
    const matchesSearch = club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         club.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' ||
                           club.category.toLowerCase() === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedClubs = [...filteredClubs].sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return b.memberCount - a.memberCount;
      case 'active':
        return b.eventCount - a.eventCount;
      case 'name':
        return a.name.localeCompare(b.name);
      case 'newest':
        return 0; // Would sort by creation date in real app
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Student Clubs</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Join clubs that match your interests and connect with like-minded students
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <SearchBar
                placeholder="Search clubs by name or description..."
                onSearch={setSearchQuery}
              />
            </div>
            <div className="flex gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[var(--primary-accent-1)]"
              >
                <option value="popular">Most Popular</option>
                <option value="active">Most Active</option>
                <option value="name">Name (A-Z)</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>

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

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{clubs.length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Clubs</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {clubs.reduce((sum, club) => sum + club.memberCount, 0).toLocaleString()}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Members</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {clubs.reduce((sum, club) => sum + club.eventCount, 0)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Active Events</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{categories.length - 1}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Categories</div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Showing {sortedClubs.length} clubs
            {selectedCategory !== 'all' && ` in ${selectedCategory}`}
            {searchQuery && ` matching "${searchQuery}"`}
          </p>
        </div>

        {/* Clubs Grid */}
        {sortedClubs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedClubs.map(club => (
              <ClubCard key={club.id} club={club} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No clubs found
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

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-[var(--primary-accent-1)] to-[var(--primary-accent-2)] rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Want to Start Your Own Club?
          </h2>
          <p className="text-white/90 mb-6">
            Have a passion you want to share? Create your own club and bring together students with similar interests.
          </p>
          <Button variant="outline" className="bg-white text-[var(--primary-accent-1)] border-white hover:bg-gray-100">
            Contact Admin
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ClubsPage;
