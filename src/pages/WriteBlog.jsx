import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/layout/Sidebar';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import {
  Save,
  Eye,
  Send,
  ArrowLeft,
  Image,
  Bold,
  Italic,
  List,
  Link as LinkIcon,
  Quote,
  Code,
  Heading,
  Upload,
  X
} from 'lucide-react';
import { BlogService, blogCategories } from '../data/blogData';

const WriteBlog = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams(); // For editing existing blogs
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(!!id);
  const [isSaving, setIsSaving] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  const [blogData, setBlogData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: 'Personal',
    tags: [],
    coverImage: '',
    status: 'draft'
  });

  const [tagInput, setTagInput] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEditing && id) {
      loadBlogForEditing();
    }
  }, [id, isEditing]);

  const loadBlogForEditing = async () => {
    try {
      const blog = await BlogService.getBlogById(id);
      if (blog) {
        // Check if user owns this blog
        const currentUserId = user?.id || (isAdmin ? 'user2' : 'user1');
        if (blog.authorId !== currentUserId) {
          alert('You can only edit your own blogs');
          navigate(isAdmin ? '/admin/my-blogs' : '/student/my-blogs');
          return;
        }

        setBlogData({
          title: blog.title,
          excerpt: blog.excerpt,
          content: blog.content,
          category: blog.category,
          tags: blog.tags || [],
          coverImage: blog.coverImage || '',
          status: blog.status
        });
      }
    } catch (error) {
      console.error('Error loading blog:', error);
      alert('Failed to load blog for editing');
    }
  };

  const handleInputChange = (field, value) => {
    setBlogData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !blogData.tags.includes(tagInput.trim())) {
      setBlogData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setBlogData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!blogData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (blogData.title.length < 10) {
      newErrors.title = 'Title must be at least 10 characters long';
    }

    if (!blogData.excerpt.trim()) {
      newErrors.excerpt = 'Excerpt is required';
    } else if (blogData.excerpt.length < 50) {
      newErrors.excerpt = 'Excerpt must be at least 50 characters long';
    }

    if (!blogData.content.trim()) {
      newErrors.content = 'Content is required';
    } else if (blogData.content.length < 200) {
      newErrors.content = 'Content must be at least 200 characters long';
    }

    if (blogData.tags.length === 0) {
      newErrors.tags = 'At least one tag is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async (status = 'draft') => {
    if (!validateForm()) {
      return;
    }

    setIsSaving(true);
    try {
      const currentUserId = user?.id || (isAdmin ? 'user2' : 'user1');
      const blogPayload = {
        ...blogData,
        status,
        authorId: currentUserId,
        author: {
          name: user?.name || 'User',
          avatar: user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=CF0F47&color=fff`,
          role: isAdmin ? 'admin' : 'student',
          club: isAdmin ? 'Tech Club' : 'Student'
        },
        readTime: BlogService.calculateReadTime(blogData.content)
      };

      if (isEditing) {
        await BlogService.updateBlog(id, blogPayload);
      } else {
        await BlogService.createBlog(blogPayload);
      }

      alert(`Blog ${status === 'published' ? 'published' : 'saved'} successfully!`);
      navigate(isAdmin ? '/admin/my-blogs' : '/student/my-blogs');
    } catch (error) {
      console.error('Error saving blog:', error);
      alert('Failed to save blog. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const insertMarkdown = (before, after = '') => {
    const textarea = document.getElementById('content-editor');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = blogData.content.substring(start, end);
    const newText = blogData.content.substring(0, start) + before + selectedText + after + blogData.content.substring(end);

    handleInputChange('content', newText);

    // Reset cursor position
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, start + before.length + selectedText.length);
    }, 0);
  };

  const formatContent = (content) => {
    // Simple markdown-like formatting for preview
    return content
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code>$1</code>')
      .replace(/\n/g, '<br>');
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

        <div className="max-w-6xl mx-auto p-4 md:p-6">
          {/* Header */}
          <div className="flex flex-col gap-4 mb-6 md:mb-8">
            {/* Back button and title */}
            <div className="flex flex-col gap-3">
              <Button
                variant="ghost"
                onClick={() => navigate(isAdmin ? '/admin/my-blogs' : '/student/my-blogs')}
                className="self-start"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to My Blogs
              </Button>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                  {isEditing ? 'Edit Blog' : 'Write New Blog'}
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm md:text-base">
                  Share your thoughts and experiences with the community
                </p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
              <Button
                variant="outline"
                onClick={() => setPreviewMode(!previewMode)}
                className="flex-1 sm:flex-none"
              >
                <Eye className="h-5 w-5 mr-2" />
                {previewMode ? 'Edit' : 'Preview'}
              </Button>
              <Button
                variant="outline"
                onClick={() => handleSave('draft')}
                disabled={isSaving}
                className="flex-1 sm:flex-none"
              >
                <Save className="h-5 w-5 mr-2" />
                Save Draft
              </Button>
              <Button
                onClick={() => handleSave('published')}
                disabled={isSaving}
                className="flex-1 sm:flex-none"
              >
                <Send className="h-5 w-5 mr-2" />
                {isSaving ? 'Publishing...' : 'Publish'}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
            {/* Main Editor */}
            <div className="xl:col-span-2 order-2 xl:order-1">
              {!previewMode ? (
                <Card className="p-4 md:p-6">
                  <div className="space-y-4 md:space-y-6">
                    {/* Title */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Blog Title *
                      </label>
                      <input
                        type="text"
                        value={blogData.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        placeholder="Enter an engaging title for your blog..."
                        className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-lg md:text-xl font-semibold focus:ring-2 focus:ring-[var(--primary-accent-1)] focus:border-transparent"
                      />
                      {errors.title && (
                        <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                      )}
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        {blogData.title.length}/100 characters
                      </p>
                    </div>

                    {/* Cover Image */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Cover Image URL
                      </label>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <input
                          type="url"
                          value={blogData.coverImage}
                          onChange={(e) => handleInputChange('coverImage', e.target.value)}
                          placeholder="https://example.com/image.jpg"
                          className="flex-1 px-3 md:px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--primary-accent-1)] focus:border-transparent"
                        />
                        <Button variant="outline" className="w-full sm:w-auto">
                          <Upload className="h-5 w-5 sm:mr-0 mr-2" />
                          <span className="sm:hidden">Upload Image</span>
                        </Button>
                      </div>
                      {blogData.coverImage && (
                        <div className="mt-2">
                          <img
                            src={blogData.coverImage}
                            alt="Cover preview"
                            className="w-full h-32 md:h-48 object-cover rounded-lg"
                            onError={(e) => e.target.style.display = 'none'}
                          />
                        </div>
                      )}
                    </div>

                    {/* Excerpt */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Blog Excerpt *
                      </label>
                      <textarea
                        value={blogData.excerpt}
                        onChange={(e) => handleInputChange('excerpt', e.target.value)}
                        placeholder="Write a compelling summary of your blog..."
                        rows={3}
                        className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--primary-accent-1)] focus:border-transparent resize-none"
                      />
                      {errors.excerpt && (
                        <p className="mt-1 text-sm text-red-600">{errors.excerpt}</p>
                      )}
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        {blogData.excerpt.length}/300 characters
                      </p>
                    </div>

                    {/* Formatting Toolbar */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Content *
                      </label>
                      <div className="border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
                        {/* Toolbar */}
                        <div className="bg-gray-50 dark:bg-gray-800 px-3 md:px-4 py-2 border-b border-gray-300 dark:border-gray-600">
                          <div className="flex flex-wrap gap-1 md:gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => insertMarkdown('# ', '')}
                              title="Heading 1"
                              className="p-1.5 md:p-2"
                            >
                              <Heading className="h-3 w-3 md:h-4 md:w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => insertMarkdown('## ', '')}
                              title="Heading 2"
                              className="p-1.5 md:p-2 text-xs md:text-sm"
                            >
                              H2
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => insertMarkdown('**', '**')}
                              title="Bold"
                              className="p-1.5 md:p-2"
                            >
                              <Bold className="h-3 w-3 md:h-4 md:w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => insertMarkdown('*', '*')}
                              title="Italic"
                              className="p-1.5 md:p-2"
                            >
                              <Italic className="h-3 w-3 md:h-4 md:w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => insertMarkdown('`', '`')}
                              title="Code"
                              className="p-1.5 md:p-2"
                            >
                              <Code className="h-3 w-3 md:h-4 md:w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => insertMarkdown('> ', '')}
                              title="Quote"
                              className="p-1.5 md:p-2"
                            >
                              <Quote className="h-3 w-3 md:h-4 md:w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => insertMarkdown('- ', '')}
                              title="List"
                              className="p-1.5 md:p-2"
                            >
                              <List className="h-3 w-3 md:h-4 md:w-4" />
                            </Button>
                          </div>
                        </div>

                        {/* Content Editor */}
                        <textarea
                          id="content-editor"
                          value={blogData.content}
                          onChange={(e) => handleInputChange('content', e.target.value)}
                          placeholder="Start writing your blog content... You can use Markdown formatting."
                          rows={15}
                          className="w-full px-3 md:px-4 py-2 md:py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-0 focus:outline-none border-0 resize-none text-sm md:text-base"
                        />
                      </div>
                      {errors.content && (
                        <p className="mt-1 text-sm text-red-600">{errors.content}</p>
                      )}
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        {blogData.content.length} characters • ~{BlogService.calculateReadTime(blogData.content)} min read
                      </p>
                    </div>
                  </div>
                </Card>
              ) : (
                /* Preview Mode */
                <Card className="p-4 md:p-6">
                  <div className="prose prose-sm md:prose-lg dark:prose-invert max-w-none">
                    {blogData.coverImage && (
                      <img
                        src={blogData.coverImage}
                        alt="Cover"
                        className="w-full h-48 md:h-64 object-cover rounded-lg mb-4 md:mb-6"
                      />
                    )}
                    <h1 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">{blogData.title || 'Your Blog Title'}</h1>
                    <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg mb-4 md:mb-6 italic">
                      {blogData.excerpt || 'Your blog excerpt will appear here...'}
                    </p>
                    <div
                      className="content text-sm md:text-base"
                      dangerouslySetInnerHTML={{
                        __html: formatContent(blogData.content || 'Start writing your content...')
                      }}
                    />
                  </div>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-4 md:space-y-6 order-1 xl:order-2">
              {/* Publishing Options */}
              <Card className="p-4 md:p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Publishing Options
                </h3>

                <div className="space-y-4">
                  {/* Category */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Category *
                    </label>
                    <select
                      value={blogData.category}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--primary-accent-1)] focus:border-transparent"
                    >
                      {blogCategories.filter(cat => cat.value !== 'all').map(category => (
                        <option key={category.value} value={category.value}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Tags */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Tags *
                    </label>
                    <div className="flex flex-col sm:flex-row gap-2 mb-2">
                      <input
                        type="text"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Add a tag..."
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--primary-accent-1)] focus:border-transparent"
                      />
                      <Button
                        variant="outline"
                        onClick={handleAddTag}
                        disabled={!tagInput.trim()}
                        className="w-full sm:w-auto"
                      >
                        Add
                      </Button>
                    </div>

                    {/* Display Tags */}
                    <div className="flex flex-wrap gap-2 mb-2">
                      {blogData.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="flex items-center gap-1"
                        >
                          {tag}
                          <button
                            onClick={() => handleRemoveTag(tag)}
                            className="ml-1 hover:text-red-500"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                    {errors.tags && (
                      <p className="mt-1 text-sm text-red-600">{errors.tags}</p>
                    )}
                  </div>

                  {/* Status */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Status
                    </label>
                    <select
                      value={blogData.status}
                      onChange={(e) => handleInputChange('status', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--primary-accent-1)] focus:border-transparent"
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                    </select>
                  </div>
                </div>
              </Card>

              {/* Blog Statistics */}
              <Card className="p-4 md:p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Writing Statistics
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Words:</span>
                    <span className="font-medium">{blogData.content.split(' ').length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Characters:</span>
                    <span className="font-medium">{blogData.content.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Reading time:</span>
                    <span className="font-medium">~{BlogService.calculateReadTime(blogData.content)} min</span>
                  </div>
                </div>
              </Card>

              {/* Tips */}
              <Card className="p-4 md:p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Writing Tips
                </h3>
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <p>• Use headings to structure your content</p>
                  <p>• Add relevant tags to help readers find your blog</p>
                  <p>• Include a compelling cover image</p>
                  <p>• Write a clear and engaging excerpt</p>
                  <p>• Preview your blog before publishing</p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WriteBlog;
