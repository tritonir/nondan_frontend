import React, { useState, useEffect } from 'react';
import SearchBar from '../components/ui/SearchBar';
import ClubCard from '../components/ClubCard';
import Button from '../components/ui/Button';

const ClubsPage = () => {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  const categories = ['all', 'technology', 'sports', 'arts', 'academic', 'social'];

  // Fetch clubs from backend API
  useEffect(() => {
    const fetchClubs = async () => {
      try {
        setLoading(true);
        const res = await fetch('http://localhost:5000/api/club/');
        if (!res.ok) {
          throw new Error('Failed to fetch clubs');
        }
        const data = await res.json();
        setClubs(data); // assuming API returns an array of clubs
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClubs();
  }, []);

  const filteredClubs = clubs.filter(club => {
    const matchesSearch =
      club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      club.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'all' ||
      club.category.toLowerCase() === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const sortedClubs = [...filteredClubs].sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return (b.memberCount || 0) - (a.memberCount || 0);
      case 'active':
        return (b.eventCount || 0) - (a.eventCount || 0);
      case 'name':
        return a.name.localeCompare(b.name);
      case 'newest':
        return 0; // update when API provides createdAt
      default:
        return 0;
    }
  });

  if (loading) {
    return <div className="p-6 text-center">Loading clubs...</div>;
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-500">
        Failed to load clubs: {error}
      </div>
    );
  }

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
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No clubs found
            </h3>
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

export default ClubsPage;
