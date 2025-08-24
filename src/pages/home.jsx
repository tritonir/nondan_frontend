import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  ArrowRight,
  Calendar,
  Users,
  Sparkles,
  TrendingUp,
  Award,
  Globe,
} from "lucide-react";
import Button from "../components/ui/Button";
import Card, {
  CardHeader,
  CardTitle,
  CardDescription,
} from "../components/ui/Card";
import EventCard from "../components/EventCard";
import ClubCard from "../components/ClubCard";

const Home = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  // State to store fetched events and clubs
  const [events, setEvents] = useState([]);
  const [clubs, setClubs] = useState([]);

  // Fetch events and clubs from the APIs
  useEffect(() => {
    // Fetch events
    fetch("https://nondan-backend.vercel.app/api/event/")
      .then((response) => response.json())
      .then((data) => setEvents(data.slice(0, 3))) // Limit to 3 featured events
      .catch((error) => console.error("Error fetching events:", error));

    // Fetch clubs
    fetch("https://nondan-backend.vercel.app/api/club/")
      .then((response) => response.json())
      .then((data) => setClubs(data.slice(0, 3))) // Limit to 3 featured clubs
      .catch((error) => console.error("Error fetching clubs:", error));
  }, []);

  // Use fetched data for featured content
  const featuredEvents = events;
  const featuredClubs = clubs;

  const stats = [
    {
      label: "Active Events",
      value: "150+",
      icon: Calendar,
      color: "text-blue-600",
    },
    {
      label: "Student Clubs",
      value: "50+",
      icon: Users,
      color: "text-green-600",
    },
    {
      label: "Monthly Attendees",
      value: "5K+",
      icon: TrendingUp,
      color: "text-purple-600",
    },
    {
      label: "Success Stories",
      value: "100+",
      icon: Award,
      color: "text-orange-600",
    },
  ];

  const features = [
    {
      icon: Calendar,
      title: "Discover Events",
      description:
        "Find exciting events happening on campus and join activities that match your interests.",
      action: () => navigate("/explore"),
    },
    {
      icon: Users,
      title: "Join Communities",
      description:
        "Connect with like-minded students through our diverse range of clubs and organizations.",
      action: () => navigate("/clubs"),
    },
    {
      icon: Globe,
      title: "Track Progress",
      description:
        "Monitor your participation, earn certificates, and build your portfolio of achievements.",
      action: () =>
        navigate(isAuthenticated ? "/student/dashboard" : "/auth/signup"),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-pink-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(207, 15, 71, 0.1), rgba(255, 11, 85, 0.1))",
          }}
        ></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start mb-6">
                <Sparkles
                  className="w-8 h-8 mr-2"
                  style={{ color: "var(--primary-accent-2)" }}
                />
                <span className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                  Campus Life Platform
                </span>
              </div>

              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                Discover Amazing
                <span
                  className="block"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--primary-accent-1), var(--primary-accent-2))",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Events & Communities
                </span>
              </h1>

              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0">
                Join thousands of students exploring opportunities, building
                connections, and creating unforgettable memories through campus
                events and clubs.
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

              {/* Welcome back message for authenticated users */}
              {isAuthenticated && (
                <div
                  className="mt-8 p-4 rounded-lg border"
                  style={{
                    backgroundColor: "rgba(207, 15, 71, 0.1)",
                    borderColor: "var(--primary-accent-1)",
                  }}
                >
                  <p style={{ color: "var(--primary-accent-1)" }}>
                    Welcome back,{" "}
                    <span className="font-semibold">{user.name}</span>! Ready to
                    discover new opportunities?
                  </p>
                </div>
              )}
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <Card hover className="transform rotate-3">
                    <div className="text-center">
                      <Calendar
                        className="w-8 h-8 mx-auto mb-2"
                        style={{ color: "var(--primary-accent-1)" }}
                      />
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        Tech Summit
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        150 attending
                      </p>
                    </div>
                  </Card>

                  <Card hover className="transform -rotate-2">
                    <div className="text-center">
                      <Users
                        className="w-8 h-8 mx-auto mb-2"
                        style={{ color: "var(--primary-accent-2)" }}
                      />
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        Art Club
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        540 members
                      </p>
                    </div>
                  </Card>
                </div>

                <div className="space-y-4 mt-8">
                  <Card hover className="transform -rotate-1">
                    <div className="text-center">
                      <Award
                        className="w-8 h-8 mx-auto mb-2"
                        style={{ color: "var(--primary-accent-1)" }}
                      />
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        Certificates
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Earn & Track
                      </p>
                    </div>
                  </Card>

                  <Card hover className="transform rotate-2">
                    <div className="text-center">
                      <Globe
                        className="w-8 h-8 mx-auto mb-2"
                        style={{ color: "var(--primary-accent-2)" }}
                      />
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        Global Network
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Connect worldwide
                      </p>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-4">
                    <div
                      className="p-3 rounded-full"
                      style={{
                        backgroundColor:
                          index % 2 === 0
                            ? "rgba(207, 15, 71, 0.1)"
                            : "rgba(255, 11, 85, 0.1)",
                      }}
                    >
                      <Icon
                        className="w-6 h-6"
                        style={{
                          color:
                            index % 2 === 0
                              ? "var(--primary-accent-1)"
                              : "var(--primary-accent-2)",
                        }}
                      />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Everything You Need to Thrive
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              From discovering events to building communities, Nondan provides
              all the tools you need for an amazing campus experience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  hover
                  onClick={feature.action}
                  className="text-center cursor-pointer"
                >
                  <div
                    className="p-3 rounded-full w-fit mx-auto mb-4"
                    style={{
                      backgroundColor: "rgba(207, 15, 71, 0.1)",
                    }}
                  >
                    <Icon
                      className="w-8 h-8"
                      style={{ color: "var(--primary-accent-1)" }}
                    />
                  </div>
                  <CardTitle className="mb-3">{feature.title}</CardTitle>
                  <CardDescription className="mb-4">
                    {feature.description}
                  </CardDescription>
                  <Button variant="outline" size="sm">
                    Learn More
                  </Button>
                </Card>
              );
            })}
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
            {featuredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
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
                Join these thriving communities
              </p>
            </div>
            <Link to="/clubs">
              <Button
                variant="outline"
                icon={<ArrowRight className="w-4 h-4" />}
                iconPosition="right"
              >
                Explore All Clubs
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredClubs.map((club) => (
              <ClubCard key={club.id} club={club} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!isAuthenticated && (
        <section
          className="py-20"
          style={{
            background:
              "linear-gradient(135deg, var(--primary-accent-1), var(--primary-accent-2))",
          }}
        >
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-pink-100 mb-8">
              Join thousands of students who are already making the most of
              their campus experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                onClick={() => navigate("/auth/signup")}
              >
                Create Account
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white"
                style={{ "--hover-text-color": "var(--primary-accent-1)" }}
                onClick={() => navigate("/auth/login")}
              >
                Sign In
              </Button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
