import React, { useState, useEffect } from "react";
import SearchBar from "../components/ui/SearchBar";
import EventCard from "../components/EventCard";
import Button from "../components/ui/Button";

const EventsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [events, setEvents] = useState([]); // from API
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch events from backend API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://nondan-backend.vercel.app/api/event/");
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch events");
        }

        setEvents(data); // assuming API returns an array of events
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const categories = ["all", "technology", "sports", "arts", "academic", "social"];

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || event.category?.toLowerCase() === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Events
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Discover upcoming events that match your interests
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <SearchBar
            placeholder="Search events..."
            onSearch={setSearchQuery}
            className="max-w-2xl"
          />

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedCategory === category
                  ? "bg-[var(--primary-accent-1)] text-white"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* View Controls */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            All Events ({events.length})
          </h2>

          <div className="flex space-x-2">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg ${viewMode === "grid"
                ? "bg-[var(--primary-accent-1)] text-white"
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg ${viewMode === "list"
                ? "bg-[var(--primary-accent-1)] text-white"
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
            >
              List
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="mb-4">
          {loading ? (
            <p className="text-sm text-gray-600 dark:text-gray-400">Loading events...</p>
          ) : error ? (
            <p className="text-sm text-red-500">Error: {error}</p>
          ) : (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Showing {filteredEvents.length} events
              {selectedCategory !== "all" && ` in ${selectedCategory}`}
              {searchQuery && ` matching "${searchQuery}"`}
            </p>
          )}
        </div>

        {/* Events Grid/List */}
        {!loading && !error && (
          <>
            {filteredEvents.length > 0 ? (
              <div
                className={`grid gap-6 ${viewMode === "grid"
                  ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                  : "grid-cols-1"
                  }`}
              >
                {filteredEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No events found
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Try adjusting your search criteria or browse different categories.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default EventsPage;
