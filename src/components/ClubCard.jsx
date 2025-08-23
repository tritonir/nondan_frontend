import React from 'react';
import { Link } from 'react-router-dom';
import Badge from './ui/Badge';
import Button from './ui/Button';

const ClubCard = ({ club, className = '' }) => {
  const formatMemberCount = (count) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count?.toString() || '0';
  };

  return (
    <div className={`card hover:shadow-lg hover:-translate-y-1 transition-all duration-200 overflow-hidden ${className}`}>
      {/* Club Banner */}
      <div
        className="relative h-32 bg-gradient-to-r from-gray-400 to-gray-600"
        style={{
          background: club.colors?.primary
            ? `linear-gradient(135deg, ${club.colors.primary}, ${club.colors.secondary || club.colors.primary})`
            : undefined
        }}
      >
        {club.banner && (
          <img
            src={club.banner}
            alt={`${club.name} banner`}
            className="w-full h-full object-cover"
          />
        )}

        {/* Club Logo */}
        <div className="absolute -bottom-6 left-4">
          <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-lg border-2 border-white dark:border-gray-800 flex items-center justify-center shadow-md">
            {club.logo ? (
              <img
                src={club.logo}
                alt={`${club.name} logo`}
                className="w-8 h-8 rounded object-cover"
              />
            ) : (
              <span className="text-lg font-bold text-[var(--primary-accent-1)]">
                {club.name.charAt(0)}
              </span>
            )}
          </div>
        </div>

        {/* Follow Status */}
        {club.isFollowing && (
          <div className="absolute top-3 right-3">
            <Badge variant="success" size="sm">Following</Badge>
          </div>
        )}
      </div>

      {/* Club Content */}
      <div className="pt-8 p-4">
        {/* Club Name & Category */}
        <div className="mb-3">
          <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-1">
            {club.name}
          </h3>
          {club.category && (
            <Badge variant="default" size="sm">
              {club.category}
            </Badge>
          )}
        </div>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
          {club.description}
        </p>

        {/* Stats */}
        <div className="flex items-center justify-between mb-4 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {formatMemberCount(club.memberCount)} members
          </div>

          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {club.eventCount || 0} events
          </div>
        </div>

        {/* Recent Events Preview */}
        {club.recentEvents && club.recentEvents.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Recent Events</h4>
            <div className="space-y-1">
              {club.recentEvents.slice(0, 2).map((event, index) => (
                <div key={index} className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                  <div className="w-1 h-1 bg-[var(--primary-accent-1)] rounded-full mr-2"></div>
                  {event.title}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex space-x-2">
          <Link to={`/club/${club.id}`} className="flex-1">
            <Button variant="outline" className="w-full">
              View Club
            </Button>
          </Link>

          <Button
            variant={club.isFollowing ? 'secondary' : 'primary'}
            className="flex-1"
            style={club.colors?.primary && !club.isFollowing ? {
              backgroundColor: club.colors.primary,
              borderColor: club.colors.primary
            } : undefined}
          >
            {club.isFollowing ? 'Following' : 'Follow'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ClubCard;
