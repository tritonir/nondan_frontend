import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  PenTool,
  Search,
  Filter,
  Calendar,
  User,
  Heart,
  MessageCircle,
  Share,
  BookOpen,
  TrendingUp,
  Clock,
  Eye,
  Plus
} from 'lucide-react';
import Button from '../components/ui/Button';
import Card, { CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Avatar from '../components/ui/Avatar';

const BlogPage = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  // Mock blog data
  const mockBlogs = [
    {
      id: 1,
      title: 'My Experience at the Tech Innovation Summit',
      excerpt: 'Last week, I attended the most amazing tech conference organized by our Tech Club. Here are my key takeaways and insights...',
      content: 'Full blog content here...',
      author: {
        name: 'Alex Chen',
        avatar: 'https://ui-avatars.com/api/?name=Alex+Chen&background=CF0F47&color=fff',
        role: 'student',
        club: 'Tech Club'
      },
      category: 'Technology',
      tags: ['conference', 'technology', 'learning', 'networking'],
      publishedAt: '2024-03-15T10:30:00Z',
      likes: 45,
      comments: 12,
      views: 234,
      readTime: 5,
      featured: true
    },
    {
      id: 2,
      title: 'Building Communities: My Journey as Arts Club President',
      excerpt: 'Leadership lessons learned while organizing cultural events and fostering creativity among students...',
      content: 'Full blog content here...',
      author: {
        name: 'Maria Rodriguez',
        avatar: 'https://ui-avatars.com/api/?name=Maria+Rodriguez&background=FF0B55&color=fff',
        role: 'student',
        club: 'Arts Club'
      },
      category: 'Leadership',
      tags: ['leadership', 'arts', 'community', 'events'],
      publishedAt: '2024-03-14T14:20:00Z',
      likes: 32,
      comments: 8,
      views: 187,
      readTime: 4,
      featured: false
    },
    {
      id: 3,
      title: 'Sustainable Campus Living: Tips from Environmental Club',
      excerpt: 'Simple ways students can contribute to environmental sustainability on campus and beyond...',
      content: 'Full blog content here...',
      author: {
        name: 'David Kim',
        avatar: 'https://ui-avatars.com/api/?name=David+Kim&background=CF0F47&color=fff',
        role: 'student',
        club: 'Eco Club'
      },
      category: 'Environment',
      tags: ['sustainability', 'environment', 'tips', 'campus'],
      publishedAt: '2024-03-13T09:15:00Z',
      likes: 28,
      comments: 15,
      views: 156,
      readTime: 6,
      featured: false
    },
    {
      id: 4,
      title: 'How Sports Shaped My Leadership Skills',
      excerpt: 'Reflecting on how participating in sports events taught me valuable life lessons about teamwork and perseverance...',
      content: 'Full blog content here...',
      author: {
        name: 'Sarah Johnson',
        avatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=FF0B55&color=fff',
        role: 'student',
        club: 'Sports Club'
      },
      category: 'Sports',
      tags: ['sports', 'leadership', 'teamwork', 'personal growth'],
      publishedAt: '2024-03-12T16:45:00Z',
      likes: 41,
      comments: 9,
      views: 203,
      readTime: 3,
      featured: true
    }
  ];

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'Technology', label: 'Technology' },
    { value: 'Leadership', label: 'Leadership' },
    { value: 'Environment', label: 'Environment' },
    { value: 'Sports', label: 'Sports' },
    { value: 'Arts', label: 'Arts' },
    { value: 'Academic', label: 'Academic' }
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const filteredBlogs = mockBlogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedBlogs = [...filteredBlogs].sort((a, b) => {
    if (sortBy === 'recent') {
      return new Date(b.publishedAt) - new Date(a.publishedAt);
    } else if (sortBy === 'popular') {
      return b.likes - a.likes;
    } else if (sortBy === 'views') {
      return b.views - a.views;
    }
    return 0;
  });

  const featuredBlogs = mockBlogs.filter(blog => blog.featured);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <section className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <BookOpen className="w-8 h-8 mr-3" style={{ color: 'var(--primary-accent-1)' }} />
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                Student Blogs
              </h1>
            </div>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Share your experiences, insights, and stories with the campus community.
              Learn from fellow students and club members.
            </p>

            {isAuthenticated && (
              <Button
                size="lg"
                onClick={() => navigate('/blog/create')}
                icon={<PenTool className="w-5 h-5" />}
              >
                Write a Blog
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search blogs, tags, or topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:border-transparent"
                style={{ '--tw-ring-color': 'var(--primary-accent-1)' }}
              />
            </div>

            <div className="flex gap-4">
              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:border-transparent"
                style={{ '--tw-ring-color': 'var(--primary-accent-1)' }}
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:border-transparent"
                style={{ '--tw-ring-color': 'var(--primary-accent-1)' }}
              >
                <option value="recent">Most Recent</option>
                <option value="popular">Most Popular</option>
                <option value="views">Most Viewed</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Featured Blogs */}
            {featuredBlogs.length > 0 && (
              <div className="mb-12">
                <div className="flex items-center mb-6">
                  <TrendingUp className="w-5 h-5 mr-2" style={{ color: 'var(--primary-accent-1)' }} />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Featured Stories</h2>
                </div>

                <div className="grid gap-6">
                  {featuredBlogs.map(blog => (
                    <Card key={blog.id} hover className="overflow-hidden">
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <Badge
                            variant="primary"
                            className="text-white"
                            style={{ backgroundColor: 'var(--primary-accent-1)' }}
                          >
                            Featured
                          </Badge>
                          <Badge variant="secondary">{blog.category}</Badge>
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
                          {blog.title}
                        </h3>

                        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                          {blog.excerpt}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Avatar src={blog.author.avatar} alt={blog.author.name} size="sm" />
                            <div className="ml-3">
                              <p className="text-sm font-medium text-gray-900 dark:text-white">
                                {blog.author.name}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                {blog.author.club} • {formatDate(blog.publishedAt)}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {blog.readTime} min
                            </div>
                            <div className="flex items-center">
                              <Heart className="w-4 h-4 mr-1" />
                              {blog.likes}
                            </div>
                            <div className="flex items-center">
                              <Eye className="w-4 h-4 mr-1" />
                              {blog.views}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* All Blogs */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                All Stories ({sortedBlogs.length})
              </h2>

              <div className="space-y-6">
                {sortedBlogs.map(blog => (
                  <Card key={blog.id} hover className="overflow-hidden">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant="secondary">{blog.category}</Badge>
                        <div className="flex flex-wrap gap-1">
                          {blog.tags.slice(0, 2).map(tag => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
                        {blog.title}
                      </h3>

                      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                        {blog.excerpt}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Avatar src={blog.author.avatar} alt={blog.author.name} size="sm" />
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              {blog.author.name}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {formatDate(blog.publishedAt)} • {blog.readTime} min read
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4">
                          <button className="flex items-center text-gray-500 hover:text-red-500 transition-colors">
                            <Heart className="w-4 h-4 mr-1" />
                            {blog.likes}
                          </button>
                          <button className="flex items-center text-gray-500 hover:text-blue-500 transition-colors">
                            <MessageCircle className="w-4 h-4 mr-1" />
                            {blog.comments}
                          </button>
                          <button className="flex items-center text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                            <Share className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Write a Blog CTA */}
            {!isAuthenticated && (
              <Card>
                <CardHeader>
                  <CardTitle>Share Your Story</CardTitle>
                  <CardDescription>
                    Join our community of writers and share your experiences with fellow students.
                  </CardDescription>
                </CardHeader>
                <div className="p-6 pt-0">
                  <Button
                    fullWidth
                    onClick={() => navigate('/auth/login')}
                    icon={<PenTool className="w-4 h-4" />}
                  >
                    Start Writing
                  </Button>
                </div>
              </Card>
            )}

            {/* Popular Tags */}
            <Card>
              <CardHeader>
                <CardTitle>Popular Tags</CardTitle>
              </CardHeader>
              <div className="p-6 pt-0">
                <div className="flex flex-wrap gap-2">
                  {['technology', 'leadership', 'events', 'community', 'learning', 'innovation', 'networking', 'sustainability'].map(tag => (
                    <button
                      key={tag}
                      onClick={() => setSearchTerm(tag)}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </div>
            </Card>

            {/* Top Contributors */}
            <Card>
              <CardHeader>
                <CardTitle>Top Contributors</CardTitle>
              </CardHeader>
              <div className="p-6 pt-0 space-y-4">
                {mockBlogs.slice(0, 3).map(blog => (
                  <div key={blog.author.name} className="flex items-center">
                    <Avatar src={blog.author.avatar} alt={blog.author.name} size="sm" />
                    <div className="ml-3 flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {blog.author.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {blog.author.club}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium" style={{ color: 'var(--primary-accent-1)' }}>
                        {blog.likes}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">likes</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
