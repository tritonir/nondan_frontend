import React from 'react';
import { Link } from 'react-router-dom';
import { useClubTheme } from '../context/ThemeHooks';
import { Calendar, Clock, MapPin, Users, ExternalLink } from 'lucide-react';
import Badge from './ui/Badge';
import Button from './ui/Button';
import Card from './ui/Card';

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

  const getStatusColor = (status) => {
    const colors = {
      'upcoming': 'success',
      'ongoing': 'warning',
      'completed': 'secondary',
      'cancelled': 'danger'
    };
    return colors[status?.toLowerCase()] || 'secondary';
  };

  const getCategoryColor = (category) => {
    const colors = {
      'technology': 'primary',
      'sports': 'success',
      'arts': 'warning',
      'academic': 'primary',
      'social': 'danger',
      'health': 'success',
      'environment': 'success',
      'business': 'warning',
      'cultural': 'primary'
    };
    return colors[category?.toLowerCase()] || 'secondary';
  };

  const isUpcoming = event.status === 'upcoming';
  const isPastEvent = event.status === 'completed';

  return (
    <Card
      hover
      className={`overflow-hidden group ${className}`}
      padding="none"
    >
      {/* Event Image */}
      <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
        {event.image ? (
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center text-white"
            style={{
              background: `linear-gradient(135deg, ${clubTheme?.primary || 'var(--primary-accent-1)'}, ${clubTheme?.accent || 'var(--primary-accent-2)'})`
            }}
          >
            <Calendar className="w-16 h-16 opacity-50" />
          </div>
        )}

        {/* Status Badge */}
        <div className="absolute top-3 right-3">
          <Badge variant={getStatusColor(event.status)} className="capitalize">
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
      <div className="p-6">
        {/* Category */}
        {event.category && (
          <Badge variant={getCategoryColor(event.category)} size="sm" className="mb-3">
            {event.category}
          </Badge>
        )}

        {/* Title */}
        <h3 className="font-semibold text-xl text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {event.title}
        </h3>

        {/* Club Info */}
        {showClubInfo && event.club && (
          <div className="flex items-center mb-3">
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold mr-2"
              style={{ backgroundColor: clubTheme?.primary || 'var(--primary-accent-1)' }}
            >
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
        <div className="space-y-2 mb-6">
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
            <span>{formatTime(event.date)}</span>
          </div>

          {event.location && (
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
              <span className="truncate">{event.location}</span>
            </div>
          )}

          {event.attendees && (
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <Users className="w-4 h-4 mr-2 flex-shrink-0" />
              <span>
                {event.attendees.current || event.attendees}
                {event.attendees.max && ` / ${event.attendees.max}`} attendees
              </span>
            </div>
          )}
        </div>

        {/* Tags */}
        {event.tags && event.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {event.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full"
              >
                #{tag}
              </span>
            ))}
            {event.tags.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full">
                +{event.tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          <Link to={`/event/${event.id}`} className="flex-1">
            <Button
              variant="outline"
              className="w-full"
              icon={<ExternalLink className="w-4 h-4" />}
              iconPosition="right"
            >
              View Details
            </Button>
          </Link>

          {isUpcoming && (
            <Button
              className="flex-1"
              style={{
                backgroundColor: clubTheme?.primary || 'var(--primary-accent-1)',
                borderColor: clubTheme?.primary || 'var(--primary-accent-1)'
              }}
              disabled={event.isRegistered}
            >
              {event.isRegistered ? 'Registered' : 'Register'}
            </Button>
          )}

          {isPastEvent && (
            <Button
              variant="secondary"
              className="flex-1"
            >
              View Summary
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default EventCard;
