import React from "react";
import { Link } from "react-router-dom";
import {
  Users,
  Calendar,
  MapPin,
  ExternalLink,
  Star,
  Heart,
} from "lucide-react";
import Badge from "./ui/Badge";
import Button from "./ui/Button";
import Card from "./ui/Card";

const ClubCard = ({ club, className = "" }) => {
  const formatMemberCount = (count) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count?.toString() || "0";
  };

  const getCategoryColor = (category) => {
    const colors = {
      technology: "primary",
      sports: "success",
      arts: "warning",
      academic: "primary",
      social: "danger",
      health: "success",
      environment: "success",
      business: "warning",
      cultural: "primary",
    };
    return colors[category?.toLowerCase()] || "secondary";
  };

  return (
    <Card hover className={`overflow-hidden group ${className}`} padding="none">
      {/* Club Banner */}
      <div
        className="relative h-32 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800"
        style={{
          background: club.theme?.primary
            ? `linear-gradient(135deg, ${club.theme.primary}, ${
                club.theme.secondary || club.theme.accent
              })`
            : "linear-gradient(135deg, var(--primary-accent-1), var(--primary-accent-2))",
        }}
      >
        {club.banner && (
          <img
            src={club.banner}
            alt={`${club.name} banner`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        )}

        {/* Club Logo */}
        <div className="absolute -bottom-6 left-6">
          <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-xl border-4 border-white dark:border-gray-800 flex items-center justify-center shadow-lg">
            {club.logo ? (
              <img
                src={club.logo}
                alt={`${club.name} logo`}
                className="w-8 h-8 rounded-lg object-cover"
              />
            ) : (
              <span
                className="text-lg font-bold text-white"
                style={{
                  color: club.theme?.primary || "var(--primary-accent-1)",
                }}
              >
                {club.name.charAt(0)}
              </span>
            )}
          </div>
        </div>

        {/* Follow Status */}
        {club.isFollowing && (
          <div className="absolute top-3 right-3">
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full p-2">
              <Heart className="w-4 h-4 text-red-500 fill-current" />
            </div>
          </div>
        )}

        {/* Rating Badge */}
        {club.rating && (
          <div className="absolute top-3 left-3">
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center">
              <Star className="w-3 h-3 text-yellow-500 fill-current mr-1" />
              <span className="text-xs font-medium text-gray-900 dark:text-white">
                {club.rating.toFixed(1)}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Club Content */}
      <div className="p-6 pt-8">
        {/* Category Badge */}
        {club.category && (
          <Badge
            variant={getCategoryColor(club.category)}
            size="sm"
            className="mb-3"
          >
            {club.category}
          </Badge>
        )}

        {/* Club Name */}
        <h3 className="font-semibold text-xl text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {club.name}
        </h3>

        {/* Club Description */}
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
          {club.description}
        </p>

        {/* Club Stats */}
        <div className="flex items-center justify-between mb-4 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-1" />
            <span>{formatMemberCount(club.members)} members</span>
          </div>

          {club.events && (
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              <span>
                {Array.isArray(club.events) ? club.events.length : club.events}{" "}
                events
              </span>
            </div>
          )}
        </div>

        {/* Founded Date */}
        {club.founded && (
          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-4">
            <MapPin className="w-3 h-3 mr-1" />
            <span>Founded {new Date(club.founded).getFullYear()}</span>
          </div>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-lg font-semibold text-gray-900 dark:text-white">
              {formatMemberCount(club.members)}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Members
            </div>
          </div>

          <div className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-lg font-semibold text-gray-900 dark:text-white">
              {Array.isArray(club.events)
                ? club.events.length
                : club.events || 0}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Events
            </div>
          </div>

          <div className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-lg font-semibold text-gray-900 dark:text-white">
              {club.rating ? club.rating.toFixed(1) : "4.8"}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Rating
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Link to={`/club/${club.id}`} className="flex-1">
            <Button
              variant="outline"
              className="w-full"
              icon={<ExternalLink className="w-4 h-4" />}
              iconPosition="right"
            >
              View Club
            </Button>
          </Link>

          <Button
            variant={club.isFollowing ? "secondary" : "primary"}
            style={
              !club.isFollowing
                ? {
                    backgroundColor:
                      club.theme?.primary || "var(--primary-accent-1)",
                    borderColor:
                      club.theme?.primary || "var(--primary-accent-1)",
                  }
                : {}
            }
            icon={
              <Heart
                className={`w-4 h-4 ${
                  club.isFollowing ? "fill-current text-red-500" : ""
                }`}
              />
            }
          >
            {club.isFollowing ? "Following" : "Follow"}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ClubCard;
