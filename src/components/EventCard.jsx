import React from 'react';
import { Link } from 'react-router-dom';
import { useClubTheme } from '../context/ThemeHooks';
import Badge from './ui/Badge';
import Button from './ui/Button';

const EventCard = ({ event, showClubInfo = true, className = '' }) => {
  const clubTheme = useClubTheme();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
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

  const getCategoryColor = (category) => {
    const colors = {
      'technology': 'info',
      'sports': 'success',
      'arts': 'warning',
      'academic': 'primary',
      'social': 'danger'
    };
    return colors[category?.toLowerCase()] || 'default';
  };

  return (
    <div className={`card hover:shadow-lg hover:-translate-y-1 transition-all duration-200 overflow-hidden ${className}`}>
      {/* Event Image */}
      <div className="relative h-48 bg-gray-200 dark:bg-gray-700">
        {event.image ? (
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[var(--primary-accent-1)] to-[var(--primary-accent-2)]">
            <svg className="w-16 h-16 text-white opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}

        {/* Status Badge */}
        <div className="absolute top-3 right-3">
          <Badge variant={event.status === 'upcoming' ? 'success' : event.status === 'ongoing' ? 'warning' : 'default'}>
            {event.status}
          </Badge>
        </div>

        {/* Date Badge */}
        <div className="absolute top-3 left-3 bg-white dark:bg-gray-800 rounded-lg p-2 text-center shadow-md">
          <div className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
            {formatDate(event.date).split(' ')[0]}
          </div>
          <div className="text-lg font-bold text-gray-900 dark:text-white">
            {formatDate(event.date).split(' ')[1]}
          </div>
        </div>
      </div>

      {/* Event Content */}
      <div className="p-4">
        {/* Category */}
        {event.category && (
          <Badge variant={getCategoryColor(event.category)} size="sm" className="mb-2">
            {event.category}
          </Badge>
        )}

        {/* Title */}
        <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2 line-clamp-2">
          {event.title}
        </h3>

        {/* Club Info */}
        {showClubInfo && event.club && (
          <div className="flex items-center mb-2">
            <div className="w-6 h-6 bg-[var(--primary-accent-1)] rounded-full flex items-center justify-center text-white text-xs font-bold mr-2">
              {event.club.name.charAt(0)}
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-400">{event.club.name}</span>
          </div>
        )}

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
          {event.description}
        </p>

        {/* Event Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {formatTime(event.date)}
          </div>

          {event.location && (
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {event.location}
            </div>
          )}

          {event.attendees && (
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {event.attendees.current} / {event.attendees.max} attendees
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex space-x-2">
          <Link to={`/event/${event.id}`} className="flex-1">
            <Button variant="outline" className="w-full">
              View Details
            </Button>
          </Link>

          {event.status === 'upcoming' && (
            <Button
              className="flex-1"
              style={{
                backgroundColor: clubTheme?.primary || 'var(--primary-accent-1)',
                borderColor: clubTheme?.primary || 'var(--primary-accent-1)'
              }}
            >
              {event.isRegistered ? 'Registered' : 'Register'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
