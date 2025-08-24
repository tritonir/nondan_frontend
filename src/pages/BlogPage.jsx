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
import { BlogService, blogCategories } from '../data/blogData';

const BlogPage = () => {
  const { isAuthenticated, user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    try {
      setLoading(true);
      const allBlogs = await BlogService.getAllBlogs();
      // Only show published blogs on public page
      const publishedBlogs = allBlogs.filter(blog => blog.status === 'published');
      setBlogs(publishedBlogs);
    } catch (error) {
      console.error('Error loading blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const filteredBlogs = blogs.filter(blog => {
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-gray-500 dark:text-gray-400">Loading blogs...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <BookOpen className="h-12 w-12 text-[var(--primary-accent-1)] mr-4" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Community Blog
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Discover insights, experiences, and stories from our vibrant community of students and club members
          </p>

          {isAuthenticated && (
            <div className="mt-8">
              <Button
                onClick={() => navigate(isAdmin ? '/admin/write-blog' : '/student/write-blog')}
                className="mr-4"
              >
                <PenTool className="h-5 w-5 mr-2" />
                Write a Blog
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate(isAdmin ? '/admin/my-blogs' : '/student/my-blogs')}
              >
                <User className="h-5 w-5 mr-2" />
                My Blogs
              </Button>
            </div>
          )}
        </div>

        {/* Search and Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search blogs, topics, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--primary-accent-1)] focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--primary-accent-1)] focus:border-transparent"
              >
                {blogCategories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--primary-accent-1)] focus:border-transparent"
              >
                <option value="recent">Most Recent</option>
                <option value="popular">Most Popular</option>
                <option value="views">Most Viewed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Blog Grid */}
        {sortedBlogs.length === 0 ? (
          <Card className="text-center py-12">
            <div className="flex flex-col items-center">
              <BookOpen className="h-16 w-16 text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {searchTerm || selectedCategory !== 'all' ? 'No blogs found' : 'No blogs yet'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-sm">
                {searchTerm || selectedCategory !== 'all'
                  ? 'Try adjusting your search terms or filters'
                  : 'Be the first to share your story with the community'}
              </p>
              {isAuthenticated && !searchTerm && selectedCategory === 'all' && (
                <Button
                  className="mt-4"
                  onClick={() => navigate(isAdmin ? '/admin/write-blog' : '/student/write-blog')}
                >
                  <PenTool className="h-5 w-5 mr-2" />
                  Write the First Blog
                </Button>
              )}
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedBlogs.map((blog) => (
              <Card key={blog.id} className="group hover:shadow-lg transition-shadow duration-200 cursor-pointer" onClick={() => navigate(`/blog/${blog.id}`)}>
                {/* Blog Image */}
                {blog.coverImage && (
                  <div className="aspect-video overflow-hidden rounded-t-lg">
                    <img
                      src={blog.coverImage}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                )}

                <div className="p-6">
                  {/* Category and Featured Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="outline">{blog.category}</Badge>
                    {blog.featured && (
                      <Badge variant="primary">Featured</Badge>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-[var(--primary-accent-1)] transition-colors line-clamp-2">
                    {blog.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                    {blog.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {blog.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                    {blog.tags.length > 3 && (
                      <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full">
                        +{blog.tags.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Author Info */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Avatar src={blog.author.avatar} alt={blog.author.name} size="sm" className="mr-3" />
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {blog.author.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {blog.author.club}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Calendar className="h-4 w-4 mr-1" />
                      {formatDate(blog.publishedAt)}
                    </div>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Clock className="h-4 w-4 mr-1" />
                      {blog.readTime} min read
                    </div>
                  </div>

                  {/* Engagement */}
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        {blog.views}
                      </div>
                      <div className="flex items-center">
                        <Heart className="h-4 w-4 mr-1" />
                        {blog.likes}
                      </div>
                      <div className="flex items-center">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        {blog.comments}
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Share className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
