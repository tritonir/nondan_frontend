import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  ArrowRight,
  Calendar,
  Users,
  TrendingUp,
  Award,
  Globe,
} from "lucide-react";
import Button from "../components/ui/Button";
import EventCard from "../components/EventCard";
import ClubCard from "../components/ClubCard";

const Home = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [featuredClubs, setFeaturedClubs] = useState([]);

  // Fetch events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("https://nondan-backend.vercel.app/api/event/");
        const data = await res.json();
        setFeaturedEvents(data.slice(0, 3)); // only first 3 events
      } catch (err) {
        console.error("Failed to fetch events:", err);
      }
    };

    const fetchClubs = async () => {
      try {
        const res = await fetch("https://nondan-backend.vercel.app/api/club/");
        const data = await res.json();
        setFeaturedClubs(data.slice(0, 3)); // only first 3 clubs
      } catch (err) {
        console.error("Failed to fetch clubs:", err);
      }
    };

    fetchEvents();
    fetchClubs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                Discover Amazing{" "}
                <span className="text-pink-600">Events & Communities</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Join thousands of students exploring opportunities and building
                connections.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                {isAuthenticated ? (
                  <>
                    <Button
                      size="lg"
                      onClick={() => navigate("/explore")}
                      icon={<Calendar className="w-5 h-5" />}
                    >
                      Explore Events
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => navigate("/student/dashboard")}
                    >
                      Go to Dashboard
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      size="lg"
                      onClick={() => navigate("/auth/signup")}
                      icon={<ArrowRight className="w-5 h-5" />}
                      iconPosition="right"
                    >
                      Get Started
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => navigate("/explore")}
                    >
                      Browse Events
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Events Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Featured Events
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Don't miss these amazing upcoming events
              </p>
            </div>
            <Link to="/explore">
              <Button
                variant="outline"
                icon={<ArrowRight className="w-4 h-4" />}
                iconPosition="right"
              >
                View All Events
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredEvents.length > 0 ? (
              featuredEvents.map((event) => (
                <EventCard key={event._id} event={event} />
              ))
            ) : (
              <p className="text-gray-500">Loading events...</p>
            )}
          </div>
        </div>
      </section>

      {/* Featured Clubs Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Popular Clubs
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Explore top student communities
              </p>
            </div>
            <Link to="/clubs">
              <Button
                variant="outline"
                icon={<ArrowRight className="w-4 h-4" />}
                iconPosition="right"
              >
                View All Clubs
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredClubs.length > 0 ? (
              featuredClubs.map((club) => (
                <ClubCard key={club._id} club={club} />
              ))
            ) : (
              <p className="text-gray-500">Loading clubs...</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
