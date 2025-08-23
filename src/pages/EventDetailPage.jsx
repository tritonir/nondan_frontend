import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ClubThemeProvider } from '../context/ThemeContext';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Card from '../components/ui/Card';
import Avatar from '../components/ui/Avatar';
import Modal from '../components/ui/Modal';

const EventDetailPage = () => {
  const { id } = useParams();
  const { isAuthenticated, user } = useAuth();
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  // Mock data - replace with actual API call based on id
  const event = {
    id: '1',
    title: 'Tech Talk: AI in Modern Development',
    description: 'Join us for an insightful discussion about the role of artificial intelligence in modern software development. Our expert speakers will cover the latest trends, tools, and techniques that are shaping the future of technology. This event is perfect for students interested in computer science, software engineering, and emerging technologies.',
    fullDescription: `
      This comprehensive tech talk will dive deep into the world of artificial intelligence and its transformative impact on modern software development. We'll explore:

      • Current AI tools and frameworks being used in the industry
      • How AI is changing the development workflow
      • Practical applications of machine learning in web and mobile development
      • Career opportunities in AI and machine learning
      • Hands-on demonstrations of popular AI development tools

      Our speakers include industry professionals from leading tech companies who will share their real-world experiences and insights. There will be plenty of time for Q&A, networking, and exploring potential collaboration opportunities.

      This event is suitable for all skill levels, from beginners curious about AI to advanced developers looking to expand their toolkit.
    `,
    date: '2025-09-15T18:00:00Z',
    endDate: '2025-09-15T20:00:00Z',
    location: 'Engineering Auditorium, Room 301',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800',
    category: 'Technology',
    status: 'upcoming',
    club: {
      id: 'tech-club',
      name: 'Technology Club',
      colors: { primary: '#3B82F6', secondary: '#1D4ED8' },
      logo: null,
      description: 'Exploring the latest in technology, programming, and innovation.'
    },
    attendees: { current: 45, max: 100 },
    organizer: {
      name: 'Sarah Johnson',
      role: 'Club President',
      avatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=3B82F6&color=fff'
    },
    speakers: [
      {
        name: 'Dr. Michael Chen',
        title: 'AI Research Scientist at TechCorp',
        avatar: 'https://ui-avatars.com/api/?name=Michael+Chen&background=059669&color=fff',
        bio: 'Leading AI researcher with 10+ years of experience in machine learning and neural networks.'
      },
      {
        name: 'Lisa Rodriguez',
        title: 'Senior ML Engineer at StartupAI',
        avatar: 'https://ui-avatars.com/api/?name=Lisa+Rodriguez&background=DC2626&color=fff',
        bio: 'Full-stack developer turned ML engineer, passionate about making AI accessible to developers.'
      }
    ],
    requirements: [
      'Basic programming knowledge (any language)',
      'Laptop with internet connection (optional)',
      'Curiosity about AI and technology!'
    ],
    agenda: [
      { time: '6:00 PM', activity: 'Welcome & Networking' },
      { time: '6:15 PM', activity: 'Opening Remarks' },
      { time: '6:30 PM', activity: 'AI in Modern Development - Dr. Michael Chen' },
      { time: '7:15 PM', activity: 'Break & Refreshments' },
      { time: '7:30 PM', activity: 'Practical AI Tools Demo - Lisa Rodriguez' },
      { time: '8:00 PM', activity: 'Q&A Session' },
      { time: '8:15 PM', activity: 'Closing & Networking' }
    ],
    tags: ['AI', 'Machine Learning', 'Software Development', 'Technology', 'Career'],
    price: 'Free',
    certificate: true
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const handleRegistration = () => {
    if (!isAuthenticated) {
      // Redirect to login
      return;
    }
    setIsRegistered(!isRegistered);
    setShowRegistrationModal(false);
  };

  const shareEvent = () => {
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: event.description,
        url: window.location.href
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <ClubThemeProvider clubColors={event.club.colors}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Hero Section */}
        <div className="relative h-96 bg-gray-900">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent">
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="max-w-4xl mx-auto">
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="primary">{event.category}</Badge>
                  <Badge variant="success">{event.status}</Badge>
                  {event.certificate && <Badge variant="warning">Certificate Available</Badge>}
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  {event.title}
                </h1>
                <div className="flex flex-wrap items-center gap-6 text-white/90">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {formatDate(event.date)} • {formatTime(event.date)}
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    {event.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    {event.attendees.current} / {event.attendees.max} attendees
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* About */}
              <Card>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">About This Event</h2>
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{event.description}</p>
                  <div className="whitespace-pre-line text-gray-600 dark:text-gray-300">
                    {event.fullDescription}
                  </div>
                </div>
              </Card>

              {/* Speakers */}
              <Card>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Speakers</h2>
                <div className="grid gap-6">
                  {event.speakers.map((speaker, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <Avatar src={speaker.avatar} alt={speaker.name} size="lg" />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{speaker.name}</h3>
                        <p className="text-[var(--primary-accent-1)] font-medium mb-2">{speaker.title}</p>
                        <p className="text-gray-600 dark:text-gray-300">{speaker.bio}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Agenda */}
              <Card>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Event Agenda</h2>
                <div className="space-y-4">
                  {event.agenda.map((item, index) => (
                    <div key={index} className="flex items-start space-x-4 pb-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                      <div className="w-20 text-sm font-medium text-[var(--primary-accent-1)] flex-shrink-0">
                        {item.time}
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-900 dark:text-white font-medium">{item.activity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Requirements */}
              <Card>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">What to Bring</h2>
                <ul className="space-y-2">
                  {event.requirements.map((req, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <svg className="w-5 h-5 text-[var(--primary-accent-1)] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-600 dark:text-gray-300">{req}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Registration Card */}
              <Card>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {event.price}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {event.attendees.max - event.attendees.current} spots remaining
                  </p>

                  {isAuthenticated ? (
                    <Button
                      className="w-full mb-4"
                      onClick={() => setShowRegistrationModal(true)}
                      variant={isRegistered ? 'secondary' : 'primary'}
                    >
                      {isRegistered ? 'Registered ✓' : 'Register Now'}
                    </Button>
                  ) : (
                    <Link to="/auth/login">
                      <Button className="w-full mb-4">
                        Login to Register
                      </Button>
                    </Link>
                  )}

                  <button
                    onClick={shareEvent}
                    className="w-full text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white flex items-center justify-center space-x-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                    </svg>
                    <span>Share Event</span>
                  </button>
                </div>
              </Card>

              {/* Organizer Info */}
              <Card>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Organized by
                </h3>
                <Link to={`/club/${event.club.id}`} className="block hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg p-3 -m-3 transition-colors">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-[var(--primary-accent-1)] rounded-lg flex items-center justify-center text-white font-bold">
                      {event.club.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">{event.club.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{event.club.description}</p>
                    </div>
                  </div>
                </Link>

                <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-3">
                    <Avatar src={event.organizer.avatar} alt={event.organizer.name} size="sm" />
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{event.organizer.name}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{event.organizer.role}</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Tags */}
              <Card>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {event.tags.map((tag, index) => (
                    <Badge key={index} variant="default" size="sm">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* Registration Modal */}
        <Modal
          isOpen={showRegistrationModal}
          onClose={() => setShowRegistrationModal(false)}
          title={isRegistered ? 'Unregister from Event' : 'Register for Event'}
        >
          <div className="text-center">
            <div className="w-16 h-16 bg-[var(--primary-accent-1)] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {event.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {isRegistered
                ? 'Are you sure you want to unregister from this event?'
                : 'Confirm your registration for this event.'
              }
            </p>
            <div className="flex space-x-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowRegistrationModal(false)}
              >
                Cancel
              </Button>
              <Button
                className="flex-1"
                onClick={handleRegistration}
                variant={isRegistered ? 'danger' : 'primary'}
              >
                {isRegistered ? 'Unregister' : 'Confirm Registration'}
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </ClubThemeProvider>
  );
};

export default EventDetailPage;
