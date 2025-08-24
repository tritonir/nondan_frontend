// Mock blog data - easily replaceable with database calls
export const mockBlogs = [
  {
    id: 1,
    title: 'My Experience at the Tech Innovation Summit',
    excerpt: 'Last week, I attended the most amazing tech conference organized by our Tech Club. Here are my key takeaways and insights...',
    content: `# My Experience at the Tech Innovation Summit

Last week, I had the incredible opportunity to attend the Tech Innovation Summit organized by our university's Tech Club. As someone passionate about technology and innovation, this event exceeded all my expectations.

## Key Takeaways

### 1. AI and Machine Learning Trends
The keynote speakers discussed the latest trends in AI and ML, particularly focusing on how these technologies are reshaping various industries. The demonstrations of real-world AI applications were mind-blowing.

### 2. Networking Opportunities
I connected with fellow students, industry professionals, and startup founders. These connections have already led to exciting collaboration opportunities and potential internships.

### 3. Hands-on Workshops
The practical workshops on web development, mobile app creation, and data science provided valuable hands-on experience that I can apply to my projects.

## My Reflections

This summit reinforced my passion for technology and showed me the endless possibilities in this field. I'm now more motivated than ever to pursue my goals in tech.

Thank you to the Tech Club organizing team for making this event possible!`,
    authorId: 'user1',
    author: {
      name: 'Alex Chen',
      avatar: 'https://ui-avatars.com/api/?name=Alex+Chen&background=CF0F47&color=fff',
      role: 'student',
      club: 'Tech Club'
    },
    category: 'Technology',
    tags: ['conference', 'technology', 'learning', 'networking'],
    publishedAt: '2024-03-15T10:30:00Z',
    updatedAt: '2024-03-15T10:30:00Z',
    likes: 45,
    comments: 12,
    views: 234,
    readTime: 5,
    featured: true,
    status: 'published',
    coverImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800'
  },
  {
    id: 2,
    title: 'Building Communities: My Journey as Arts Club President',
    excerpt: 'Leadership lessons learned while organizing cultural events and fostering creativity among students...',
    content: `# Building Communities: My Journey as Arts Club President

Being the president of our Arts Club has been one of the most rewarding experiences of my college life. Over the past year, I've learned invaluable lessons about leadership, community building, and the power of creative expression.

## The Challenge

When I first took on this role, our club had only 15 active members and struggled to organize meaningful events. The challenge was to revitalize the community and create engaging opportunities for artistic expression.

## Our Transformation

### Monthly Art Exhibitions
We started organizing monthly exhibitions showcasing student artwork. These events became incredibly popular, drawing audiences from across the campus.

### Collaborative Projects
We initiated cross-club collaborations, working with the Photography Club for visual storytelling projects and the Music Club for multimedia performances.

### Mentorship Programs
We established a mentorship system where senior students guide newcomers, creating a supportive learning environment.

## Lessons Learned

1. **Listen First**: Understanding what the community needs is crucial before implementing changes.
2. **Empower Others**: The best leaders create more leaders.
3. **Celebrate Small Wins**: Recognizing every achievement, no matter how small, builds momentum.

## Looking Forward

As I prepare to hand over leadership to the next generation, I'm excited to see how they'll continue to grow our artistic community. The foundation we've built together is strong, and I'm confident it will continue to flourish.`,
    authorId: 'user2',
    author: {
      name: 'Maria Rodriguez',
      avatar: 'https://ui-avatars.com/api/?name=Maria+Rodriguez&background=FF0B55&color=fff',
      role: 'student',
      club: 'Arts Club'
    },
    category: 'Leadership',
    tags: ['leadership', 'arts', 'community', 'events'],
    publishedAt: '2024-03-14T14:20:00Z',
    updatedAt: '2024-03-14T14:20:00Z',
    likes: 32,
    comments: 8,
    views: 187,
    readTime: 4,
    featured: false,
    status: 'published',
    coverImage: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800'
  },
  {
    id: 3,
    title: 'Sustainable Campus Living: Tips from Environmental Club',
    excerpt: 'Simple ways students can contribute to environmental sustainability on campus and beyond...',
    content: `# Sustainable Campus Living: Tips from Environmental Club

As members of the Environmental Club, we're passionate about making our campus and community more sustainable. Here are practical tips that every student can implement to reduce their environmental impact.

## Energy Conservation

### In Your Dorm Room
- Use LED bulbs and energy-efficient appliances
- Unplug electronics when not in use
- Adjust thermostat settings mindfully
- Use natural light whenever possible

### Around Campus
- Walk, bike, or use public transportation
- Participate in carpooling programs
- Choose stairs over elevators when possible

## Waste Reduction

### The 3 R's
1. **Reduce**: Buy only what you need
2. **Reuse**: Find creative uses for items before discarding
3. **Recycle**: Follow campus recycling guidelines properly

### Practical Applications
- Use reusable water bottles and coffee cups
- Share textbooks or buy used ones
- Donate clothes instead of throwing them away
- Compost organic waste if facilities are available

## Water Conservation

- Take shorter showers
- Fix leaky faucets promptly
- Use full loads when doing laundry
- Report water waste incidents to maintenance

## Getting Involved

Join our Environmental Club to participate in:
- Campus cleanup events
- Sustainability workshops
- Policy advocacy initiatives
- Community garden projects

## Small Changes, Big Impact

Remember, individual actions collectively make a significant difference. Every sustainable choice you make contributes to a healthier planet for future generations.

Let's work together to make our campus a model of environmental responsibility!`,
    authorId: 'user3',
    author: {
      name: 'David Kim',
      avatar: 'https://ui-avatars.com/api/?name=David+Kim&background=CF0F47&color=fff',
      role: 'student',
      club: 'Eco Club'
    },
    category: 'Environment',
    tags: ['sustainability', 'environment', 'tips', 'campus'],
    publishedAt: '2024-03-13T09:15:00Z',
    updatedAt: '2024-03-13T09:15:00Z',
    likes: 28,
    comments: 15,
    views: 156,
    readTime: 6,
    featured: false,
    status: 'published',
    coverImage: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800'
  }
];

export const blogCategories = [
  { value: 'all', label: 'All Categories' },
  { value: 'Technology', label: 'Technology' },
  { value: 'Leadership', label: 'Leadership' },
  { value: 'Environment', label: 'Environment' },
  { value: 'Sports', label: 'Sports' },
  { value: 'Arts', label: 'Arts' },
  { value: 'Academic', label: 'Academic' },
  { value: 'Personal', label: 'Personal' },
  { value: 'Events', label: 'Events' }
];

// Blog service functions - easily replaceable with API calls
export class BlogService {
  // Get all blogs
  static async getAllBlogs() {
    // TODO: Replace with actual API call
    // return await fetch('/api/blogs').then(res => res.json());
    return mockBlogs;
  }

  // Get blogs by author
  static async getBlogsByAuthor(authorId) {
    // TODO: Replace with actual API call
    // return await fetch(`/api/blogs/author/${authorId}`).then(res => res.json());
    return mockBlogs.filter(blog => blog.authorId === authorId);
  }

  // Get single blog
  static async getBlogById(id) {
    // TODO: Replace with actual API call
    // return await fetch(`/api/blogs/${id}`).then(res => res.json());
    return mockBlogs.find(blog => blog.id === parseInt(id));
  }

  // Create new blog
  static async createBlog(blogData) {
    // TODO: Replace with actual API call
    // return await fetch('/api/blogs', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(blogData)
    // }).then(res => res.json());

    const newBlog = {
      id: mockBlogs.length + 1,
      ...blogData,
      publishedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      likes: 0,
      comments: 0,
      views: 0,
      status: 'published'
    };
    mockBlogs.push(newBlog);
    return newBlog;
  }

  // Update blog
  static async updateBlog(id, blogData) {
    // TODO: Replace with actual API call
    // return await fetch(`/api/blogs/${id}`, {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(blogData)
    // }).then(res => res.json());

    const blogIndex = mockBlogs.findIndex(blog => blog.id === parseInt(id));
    if (blogIndex !== -1) {
      mockBlogs[blogIndex] = {
        ...mockBlogs[blogIndex],
        ...blogData,
        updatedAt: new Date().toISOString()
      };
      return mockBlogs[blogIndex];
    }
    throw new Error('Blog not found');
  }

  // Delete blog
  static async deleteBlog(id) {
    // TODO: Replace with actual API call
    // return await fetch(`/api/blogs/${id}`, { method: 'DELETE' });

    const blogIndex = mockBlogs.findIndex(blog => blog.id === parseInt(id));
    if (blogIndex !== -1) {
      mockBlogs.splice(blogIndex, 1);
      return true;
    }
    throw new Error('Blog not found');
  }

  // Calculate read time
  static calculateReadTime(content) {
    const wordsPerMinute = 200;
    const wordCount = content.split(' ').length;
    return Math.ceil(wordCount / wordsPerMinute);
  }
}
