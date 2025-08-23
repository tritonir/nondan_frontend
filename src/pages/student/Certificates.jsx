import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Sidebar from '../../components/layout/Sidebar';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

const StudentCertificates = () => {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Mock certificates data
  const certificates = [
    {
      id: '1',
      eventTitle: 'Web Development Workshop',
      clubName: 'Technology Club',
      date: '2025-08-10',
      certificateUrl: '#',
      skills: ['HTML', 'CSS', 'JavaScript'],
      type: 'Workshop Completion'
    },
    {
      id: '2',
      eventTitle: 'Leadership Seminar',
      clubName: 'Business Club',
      date: '2025-07-15',
      certificateUrl: '#',
      skills: ['Leadership', 'Team Management'],
      type: 'Seminar Completion'
    },
    {
      id: '3',
      eventTitle: 'AI in Healthcare Conference',
      clubName: 'Technology Club',
      date: '2025-06-20',
      certificateUrl: '#',
      skills: ['Machine Learning', 'Healthcare AI'],
      type: 'Conference Attendance'
    }
  ];

  const downloadCertificate = (certificate) => {
    // Mock download - would integrate with actual certificate generation
    console.log('Downloading certificate:', certificate.id);
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
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Certificates</h1>
              <p className="text-gray-600 dark:text-gray-400">
                Download and share your earned certificates
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-[var(--primary-accent-1)]">{certificates.length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Earned</div>
            </div>
          </div>

          {certificates.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certificates.map(certificate => (
                <Card key={certificate.id} className="hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 bg-[var(--primary-accent-1)] rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                    </div>
                    <Badge variant="success" size="sm">{certificate.type}</Badge>
                  </div>

                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">
                    {certificate.eventTitle}
                  </h3>

                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {certificate.clubName} • {new Date(certificate.date).toLocaleDateString()}
                  </p>

                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Skills Earned:</h4>
                    <div className="flex flex-wrap gap-1">
                      {certificate.skills.map((skill, index) => (
                        <Badge key={index} variant="default" size="sm">{skill}</Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      className="flex-1"
                      onClick={() => downloadCertificate(certificate)}
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Download
                    </Button>
                    <Button size="sm" variant="outline">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No certificates yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Complete events to earn certificates and showcase your achievements.
              </p>
              <Button onClick={() => window.location.href = '/explore'}>
                Explore Events
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentCertificates;
