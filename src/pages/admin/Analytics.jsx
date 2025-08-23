import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Sidebar from '../../components/layout/Sidebar';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

const Analytics = () => {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [timeframe, setTimeframe] = useState('month');

  // Mock analytics data - would be fetched from API
  const analyticsData = {
    overview: {
      totalEvents: 47,
      totalAttendees: 2156,
      avgAttendance: 45.8,
      completionRate: 89.4
    },
    eventPerformance: [
      { name: 'Tech Talk: AI Development', attendees: 95, capacity: 100, rating: 4.8 },
      { name: 'Web Development Workshop', attendees: 45, capacity: 50, rating: 4.6 },
      { name: 'Sports Festival', attendees: 200, capacity: 300, rating: 4.9 },
      { name: 'Art Exhibition', attendees: 65, capacity: 80, rating: 4.7 }
    ],
    monthlyTrends: [
      { month: 'Jan', events: 8, attendees: 320 },
      { month: 'Feb', events: 12, attendees: 480 },
      { month: 'Mar', events: 15, attendees: 620 },
      { month: 'Apr', events: 10, attendees: 410 },
      { month: 'May', events: 14, attendees: 580 },
      { month: 'Jun', events: 11, attendees: 450 }
    ],
    categoryBreakdown: [
      { category: 'Technology', count: 18, percentage: 38 },
      { category: 'Sports', count: 12, percentage: 26 },
      { category: 'Arts', count: 8, percentage: 17 },
      { category: 'Academic', count: 6, percentage: 13 },
      { category: 'Social', count: 3, percentage: 6 }
    ]
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 lg:ml-64">
        <div className="lg:hidden bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
          <button onClick={() => setSidebarOpen(true)} className="text-gray-600 dark:text-gray-300">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics Dashboard</h1>
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
              <option value="quarter">Last Quarter</option>
              <option value="year">Last Year</option>
            </select>
          </div>

          {/* Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {analyticsData.overview.totalEvents}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Events</p>
                </div>
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {analyticsData.overview.totalAttendees.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Attendees</p>
                </div>
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {analyticsData.overview.avgAttendance}%
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Avg Attendance</p>
                </div>
                <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {analyticsData.overview.completionRate}%
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Completion Rate</p>
                </div>
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Event Performance */}
            <Card>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Top Performing Events</h2>
              <div className="space-y-4">
                {analyticsData.eventPerformance.map((event, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white text-sm">{event.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {event.attendees}/{event.capacity} attendees
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="success" size="sm">★ {event.rating}</Badge>
                      <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-[var(--primary-accent-1)] h-2 rounded-full"
                          style={{ width: `${(event.attendees / event.capacity) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Category Breakdown */}
            <Card>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Events by Category</h2>
              <div className="space-y-4">
                {analyticsData.categoryBreakdown.map((category, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-[var(--primary-accent-1)] rounded-full" />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {category.category}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {category.count} events
                      </span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {category.percentage}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Monthly Trends */}
            <Card className="lg:col-span-2">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Monthly Trends</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-2 text-sm font-medium text-gray-600 dark:text-gray-400">Month</th>
                      <th className="text-left py-2 text-sm font-medium text-gray-600 dark:text-gray-400">Events</th>
                      <th className="text-left py-2 text-sm font-medium text-gray-600 dark:text-gray-400">Attendees</th>
                      <th className="text-left py-2 text-sm font-medium text-gray-600 dark:text-gray-400">Avg per Event</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analyticsData.monthlyTrends.map((month, index) => (
                      <tr key={index} className="border-b border-gray-100 dark:border-gray-800">
                        <td className="py-3 font-medium text-gray-900 dark:text-white">{month.month}</td>
                        <td className="py-3 text-gray-600 dark:text-gray-400">{month.events}</td>
                        <td className="py-3 text-gray-600 dark:text-gray-400">{month.attendees}</td>
                        <td className="py-3 text-gray-600 dark:text-gray-400">
                          {Math.round(month.attendees / month.events)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

          {/* Export Options */}
          <Card className="mt-8">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Export Data</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Download your analytics data for external analysis
                </p>
              </div>
              <div className="flex space-x-3">
                <Button variant="outline">Export CSV</Button>
                <Button variant="outline">Export PDF</Button>
                <Button>Generate Report</Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
