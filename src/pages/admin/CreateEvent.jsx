import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/layout/Sidebar";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

const CreateEvent = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    endDate: "",
    location: "",
    category: "technology",
    maxAttendees: "",
    price: "free",
    customPrice: "",
    image: null,
    requirements: "",
    certificate: false,
  });

  const categories = [
    { value: "technology", label: "Technology" },
    { value: "sports", label: "Sports" },
    { value: "arts", label: "Arts" },
    { value: "academic", label: "Academic" },
    { value: "social", label: "Social" },
  ];

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("nondan-token");
      if (!token) throw new Error("User not authenticated");

      let imageUrl = "";
      // Upload image to Cloudinary if selected
      if (formData.image) {
        const imageData = new FormData();
        imageData.append("file", formData.image);
        imageData.append("upload_preset", "insta_clone");
        imageData.append("cloud_name", "clouding1");

        const cloudRes = await fetch(
          "https://api.cloudinary.com/v1_1/clouding1/image/upload",
          {
            method: "POST",
            body: imageData,
          }
        );

        const cloudData = await cloudRes.json();
        if (!cloudRes.ok) throw new Error("Failed to upload image");
        imageUrl = cloudData.url;
      }

      // Prepare body for your API
      const body = {
        title: formData.title,
        description: formData.description,
        date: formData.date,
        endDate: formData.endDate,
        location: formData.location,
        category: formData.category,
        maxAttendees: formData.maxAttendees,
        price:
          formData.price === "custom" ? formData.customPrice : formData.price,
        image_url: imageUrl,
        requirements: formData.requirements,
        certificate: formData.certificate,
        club_id: "68ab24cbf7d921918a7f62df",
      };
      console.log(body);

      const response = await fetch(
        "https://nondan-backend.vercel.app/api/event/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("nondan-token")}`,
          },
          body: JSON.stringify(body),
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to create event");

      navigate("/admin/events");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 lg:ml-64">
        <div className="lg:hidden bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-600 dark:text-gray-300"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        <div className="p-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Create New Event
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Fill in the details to create your event
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}

            {/* Progress Steps */}
            <div className="flex items-center justify-center mb-8">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      currentStep >= step
                        ? "bg-[var(--primary-accent-1)] text-white"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                    }`}
                  >
                    {step}
                  </div>
                  {step < 3 && (
                    <div
                      className={`w-16 h-1 mx-2 ${
                        currentStep > step
                          ? "bg-[var(--primary-accent-1)]"
                          : "bg-gray-200 dark:bg-gray-700"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit}>
              {/* Step 1: Basic Information */}
              {currentStep === 1 && (
                <Card>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                    Basic Information
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Event Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={(e) =>
                          setFormData({ ...formData, title: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        placeholder="Enter event title"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Description *
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={formData.description}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            description: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        placeholder="Describe your event"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Category *
                        </label>
                        <select
                          required
                          value={formData.category}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              category: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        >
                          {categories.map((cat) => (
                            <option key={cat.value} value={cat.value}>
                              {cat.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Max Attendees *
                        </label>
                        <input
                          type="number"
                          required
                          min="1"
                          value={formData.maxAttendees}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              maxAttendees: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                          placeholder="100"
                        />
                      </div>
                    </div>
                  </div>
                </Card>
              )}

              {/* Step 2: Date & Location */}
              {currentStep === 2 && (
                <Card>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                    Date & Location
                  </h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Start Date & Time *
                        </label>
                        <input
                          type="datetime-local"
                          required
                          value={formData.date}
                          onChange={(e) =>
                            setFormData({ ...formData, date: e.target.value })
                          }
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          End Date & Time
                        </label>
                        <input
                          type="datetime-local"
                          value={formData.endDate}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              endDate: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Location *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.location}
                        onChange={(e) =>
                          setFormData({ ...formData, location: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        placeholder="Engineering Auditorium, Room 301"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Event Image
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          setFormData({ ...formData, image: e.target.files[0] })
                        }
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>
                </Card>
              )}

              {/* Step 3: Additional Details */}
              {currentStep === 3 && (
                <Card>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                    Additional Details
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Requirements
                      </label>
                      <textarea
                        rows={3}
                        value={formData.requirements}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            requirements: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        placeholder="What should attendees bring or know?"
                      />
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="certificate"
                        checked={formData.certificate}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            certificate: e.target.checked,
                          })
                        }
                        className="w-4 h-4 text-[var(--primary-accent-1)] border-gray-300 rounded focus:ring-[var(--primary-accent-1)]"
                      />
                      <label
                        htmlFor="certificate"
                        className="ml-2 text-sm text-gray-700 dark:text-gray-300"
                      >
                        Issue certificates to attendees
                      </label>
                    </div>
                  </div>
                </Card>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1 || loading}
                >
                  Previous
                </Button>

                <div className="flex space-x-3">
                  {currentStep < 3 ? (
                    <Button type="button" onClick={nextStep} disabled={loading}>
                      Next
                    </Button>
                  ) : (
                    <>
                      <Button
                        type="button"
                        variant="outline"
                        disabled={loading}
                      >
                        Save as Draft
                      </Button>
                      <Button type="submit" disabled={loading}>
                        {loading ? (
                          <LoadingSpinner size="sm" />
                        ) : (
                          "Create Event"
                        )}
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
