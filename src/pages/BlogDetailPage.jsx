import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Avatar from '../components/ui/Avatar';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Eye,
  Heart,
  MessageCircle,
  Share,
  Edit3,
  MoreVertical,
  BookOpen
} from 'lucide-react';
import { BlogService } from '../data/blogData';

const BlogDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated, isAdmin } = useAuth();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    loadBlog();
  }, [id]);

  const loadBlog = async () => {
    try {
      setLoading(true);
      const blogData = await BlogService.getBlogById(id);
      if (blogData) {
        setBlog(blogData);
        // TODO: Check if user has liked this blog from backend
        setLiked(false);
      } else {
        navigate('/blog');
      }
    } catch (error) {
      console.error('Error loading blog:', error);
      navigate('/blog');
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    if (!isAuthenticated) {
      navigate('/auth/login');
      return;
    }

    // TODO: Implement like functionality with backend
    setLiked(!liked);
    setBlog(prev => ({
      ...prev,
      likes: liked ? prev.likes - 1 : prev.likes + 1
    }));
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: blog.title,
          text: blog.excerpt,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const formatContent = (content) => {
    // Simple markdown-like formatting
    return content
      .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mb-4 text-gray-900 dark:text-white">$1</h1>')
      .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mb-3 text-gray-900 dark:text-white">$1</h2>')
      .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold mb-2 text-gray-900 dark:text-white">$1</h3>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      .replace(/`(.*?)`/g, '<code class="bg-gray-100 dark:bg-gray-800 px-1 rounded text-sm">$1</code>')
      .replace(/^> (.*$)/gim, '<blockquote class="border-l-4 border-gray-300 pl-4 italic text-gray-600 dark:text-gray-400">$1</blockquote>')
      .replace(/^- (.*$)/gim, '<li class="ml-4">$1</li>')
      .replace(/\n/g, '<br>');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const canEdit = isAuthenticated && (
    blog?.authorId === (user?.id || (isAdmin ? 'user2' : 'user1'))
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary-accent-1)]"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <Card className="p-8 text-center">
          <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Blog not found</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">The blog post you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/blog')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blogs
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/blog')}
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Blogs
          </Button>
        </div>

        {/* Blog Content */}
        <Card className="overflow-hidden">
          {/* Cover Image */}
          {blog.coverImage && (
            <div className="w-full h-64 md:h-96">
              <img
                src={blog.coverImage}
                alt={blog.title}
                className="w-full h-full object-cover"
                onError={(e) => e.target.style.display = 'none'}
              />
            </div>
          )}

          <div className="p-6 md:p-8">
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="default">{blog.category}</Badge>
                {blog.featured && <Badge variant="secondary">Featured</Badge>}
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {blog.title}
              </h1>

              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 italic">
                {blog.excerpt}
              </p>

              {/* Author and Meta */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-4">
                  <Avatar
                    src={blog.author.avatar}
                    alt={blog.author.name}
                    size="md"
                  />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {blog.author.name}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {blog.author.role} • {blog.author.club}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {formatDate(blog.publishedAt)}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {blog.readTime} min read
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    {blog.views}
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
              <div
                dangerouslySetInnerHTML={{
                  __html: formatContent(blog.content)
                }}
              />
            </div>

            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="mb-8">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-4">
                <Button
                  variant={liked ? "default" : "outline"}
                  onClick={handleLike}
                  className="flex items-center gap-2"
                >
                  <Heart className={`h-5 w-5 ${liked ? 'fill-current' : ''}`} />
                  {blog.likes} {blog.likes === 1 ? 'Like' : 'Likes'}
                </Button>

                <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                  <MessageCircle className="h-5 w-5" />
                  <span>{blog.comments} Comments</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  onClick={handleShare}
                >
                  <Share className="h-5 w-5 mr-2" />
                  Share
                </Button>

                {canEdit && (
                  <Button
                    variant="outline"
                    onClick={() => navigate(`/write-blog/${blog.id}`)}
                  >
                    <Edit3 className="h-5 w-5 mr-2" />
                    Edit
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* Related/Suggested content could go here */}
      </div>
    </div>
  );
};

export default BlogDetailPage;
