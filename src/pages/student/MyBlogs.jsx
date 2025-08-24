import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Sidebar from '../../components/layout/Sidebar';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import {
  Plus,
  Edit3,
  Trash2,
  Eye,
  Heart,
  MessageCircle,
  Calendar,
  Clock,
  MoreVertical,
  Search,
  Filter
} from 'lucide-react';
import { BlogService } from '../../data/blogData';

const StudentMyBlogs = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    loadMyBlogs();
  }, [user]);

  const loadMyBlogs = async () => {
    try {
      setLoading(true);
      // Get current user ID (in real app, this would come from authentication)
      const userId = user?.id || 'user1'; // Mock user ID
      const userBlogs = await BlogService.getBlogsByAuthor(userId);
      setBlogs(userBlogs);
    } catch (error) {
      console.error('Error loading blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBlog = async (blogId) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await BlogService.deleteBlog(blogId);
        setBlogs(blogs.filter(blog => blog.id !== blogId));
        alert('Blog deleted successfully!');
      } catch (error) {
        console.error('Error deleting blog:', error);
        alert('Failed to delete blog. Please try again.');
      }
    }
  };

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || blog.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 lg:ml-64">
        {/* Mobile header */}
        <div className="lg:hidden bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
          <button onClick={() => setSidebarOpen(true)} className="text-gray-600 dark:text-gray-300">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        <div className="max-w-7xl mx-auto p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                My Blogs
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Share your experiences and connect with fellow students
              </p>
            </div>
            <Button onClick={() => navigate('/write-blog')}>
              <Plus className="h-5 w-5 mr-2" />
              New Blog
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="p-6">
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Blogs</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {blogs.length}
                  </p>
                </div>
                <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg">
                  <Eye className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Published</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {blogs.filter(blog => blog.status === 'published').length}
                  </p>
                </div>
                <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg">
                  <Edit3 className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Likes</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {blogs.reduce((total, blog) => total + (blog.likes || 0), 0)}
                  </p>
                </div>
                <div className="bg-pink-100 dark:bg-pink-900 p-3 rounded-lg">
                  <Heart className="h-6 w-6 text-pink-600 dark:text-pink-400" />
                </div>
              </div>
            </Card>
          </div>

          {/* Filters */}
          <Card className="p-6 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search your blogs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--primary-accent-1)] focus:border-transparent"
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--primary-accent-1)] focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
            </div>
          </Card>

          {/* Blogs List */}
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary-accent-1)] mx-auto"></div>
              <p className="text-gray-600 dark:text-gray-400 mt-4">Loading your blogs...</p>
            </div>
          ) : filteredBlogs.length === 0 ? (
            <Card className="p-12 text-center">
              <div className="text-gray-400 mb-4">
                <Edit3 className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                {blogs.length === 0 ? 'No blogs yet' : 'No blogs found'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {blogs.length === 0
                  ? "Start documenting your journey and sharing your experiences!"
                  : "Try adjusting your search or filters."
                }
              </p>
              {blogs.length === 0 && (
                <Button onClick={() => navigate('/write-blog')}>
                  <Plus className="h-5 w-5 mr-2" />
                  Write Your First Blog
                </Button>
              )}
            </Card>
          ) : (
            <div className="space-y-6">
              {filteredBlogs.map((blog) => (
                <Card key={blog.id} className="p-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Blog Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <Link
                            to={`/blog/${blog.id}`}
                            className="text-xl font-bold text-gray-900 dark:text-white hover:text-[var(--primary-accent-1)] transition-colors"
                          >
                            {blog.title}
                          </Link>
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {formatDate(blog.publishedAt)}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {blog.readTime} min read
                            </div>
                            <Badge
                              variant={blog.status === 'published' ? 'default' : 'secondary'}
                            >
                              {blog.status}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                        {blog.excerpt}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                          <div className="flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            {blog.views || 0}
                          </div>
                          <div className="flex items-center gap-1">
                            <Heart className="h-4 w-4" />
                            {blog.likes || 0}
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageCircle className="h-4 w-4" />
                            {blog.comments || 0}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => navigate(`/blog/${blog.id}`)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => navigate(`/write-blog/${blog.id}`)}
                          >
                            <Edit3 className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteBlog(blog.id)}
                            className="text-red-600 hover:text-red-700 hover:border-red-300"
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Cover Image */}
                    {blog.coverImage && (
                      <div className="lg:w-48">
                        <img
                          src={blog.coverImage}
                          alt={blog.title}
                          className="w-full h-32 lg:h-24 object-cover rounded-lg"
                          onError={(e) => e.target.style.display = 'none'}
                        />
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentMyBlogs;
