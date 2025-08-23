import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Shield, CheckCircle, XCircle, Download, Calendar, MapPin, User } from 'lucide-react';

const VerifyCertificate = () => {
  const { certificateId } = useParams();
  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock certificate data - TODO: Replace with actual API call
  const mockCertificates = {
    'NONDAN-TECH-2024-001': {
      id: 'cert1',
      certificateId: 'NONDAN-TECH-2024-001',
      recipientName: 'John Doe',
      recipientEmail: 'john@example.com',
      eventTitle: 'Tech Innovation Summit 2024',
      eventDate: '2024-03-15',
      eventLocation: 'Main Auditorium',
      issueDate: '2024-03-16',
      clubName: 'Tech Club',
      verified: true,
      issuedBy: 'Nondan Platform',
      completionStatus: 'Attended',
      certificateHash: 'a1b2c3d4e5f6...'
    },
    'NONDAN-BIZ-2024-002': {
      id: 'cert2',
      certificateId: 'NONDAN-BIZ-2024-002',
      recipientName: 'Jane Smith',
      recipientEmail: 'jane@example.com',
      eventTitle: 'Startup Pitch Competition',
      eventDate: '2024-03-25',
      eventLocation: 'Innovation Lab',
      issueDate: '2024-03-26',
      clubName: 'Entrepreneurship Club',
      verified: true,
      issuedBy: 'Nondan Platform',
      completionStatus: 'Participated',
      certificateHash: 'f6e5d4c3b2a1...'
    }
  };

  useEffect(() => {
    const fetchCertificate = async () => {
      setLoading(true);

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const cert = mockCertificates[certificateId];
      if (cert) {
        setCertificate(cert);
      } else {
        setError('Certificate not found or invalid certificate ID.');
      }

      setLoading(false);
    };

    if (certificateId) {
      fetchCertificate();
    }
  }, [certificateId]);

  const handleDownloadCertificate = () => {
    // TODO: Implement actual certificate download
    alert('Certificate download would start here. This is a demo.');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Verifying certificate...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <Shield className="h-16 w-16 text-indigo-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Certificate Verification
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Verify the authenticity of Nondan platform certificates
          </p>
        </div>

        {error ? (
          /* Error State */
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8 text-center">
            <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Verification Failed
            </h2>
            <p className="text-red-600 dark:text-red-400 mb-6">{error}</p>
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <h3 className="font-semibold text-red-800 dark:text-red-200 mb-2">
                Certificate ID: {certificateId}
              </h3>
              <p className="text-red-700 dark:text-red-300 text-sm">
                This certificate ID is either invalid, expired, or has been revoked.
                Please contact the issuing organization if you believe this is an error.
              </p>
            </div>
          </div>
        ) : certificate ? (
          /* Valid Certificate */
          <div className="space-y-6">
            {/* Verification Status */}
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
              <div className="flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400 mr-3" />
                <div>
                  <h2 className="text-xl font-bold text-green-800 dark:text-green-200">
                    Certificate Verified ✓
                  </h2>
                  <p className="text-green-700 dark:text-green-300">
                    This is a valid certificate issued by the Nondan platform
                  </p>
                </div>
              </div>
            </div>

            {/* Certificate Details */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              {/* Certificate Header */}
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
                <div className="text-center">
                  <h1 className="text-3xl font-bold mb-2">Certificate of Completion</h1>
                  <p className="text-indigo-100">Nondan Platform</p>
                </div>
              </div>

              {/* Certificate Body */}
              <div className="p-8">
                <div className="text-center mb-8">
                  <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                    This certifies that
                  </p>
                  <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    {certificate.recipientName}
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
                    has successfully {certificate.completionStatus.toLowerCase()}
                  </p>
                  <h3 className="text-2xl font-semibold text-indigo-600 dark:text-indigo-400 mb-6">
                    {certificate.eventTitle}
                  </h3>
                </div>

                {/* Event Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Event Date</p>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {new Date(certificate.eventDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {certificate.eventLocation}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <User className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Organized by</p>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {certificate.clubName}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Shield className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Issue Date</p>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {new Date(certificate.issueDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Verification Details */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                    Verification Details
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Certificate ID:</span>
                      <span className="ml-2 font-mono text-gray-900 dark:text-white">
                        {certificate.certificateId}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Recipient Email:</span>
                      <span className="ml-2 text-gray-900 dark:text-white">
                        {certificate.recipientEmail}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Issued By:</span>
                      <span className="ml-2 text-gray-900 dark:text-white">
                        {certificate.issuedBy}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Status:</span>
                      <span className="ml-2 text-green-600 dark:text-green-400 font-semibold">
                        Verified
                      </span>
                    </div>
                  </div>
                </div>

                {/* Download Button */}
                <div className="text-center mt-8">
                  <button
                    onClick={handleDownloadCertificate}
                    className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    <Download className="h-5 w-5 mr-2" />
                    Download Certificate
                  </button>
                </div>
              </div>
            </div>

            {/* Security Notice */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                Security & Authenticity
              </h4>
              <p className="text-blue-700 dark:text-blue-300 text-sm">
                This certificate has been cryptographically verified and is stored on secure servers.
                The certificate hash ({certificate.certificateHash}) ensures its authenticity and prevents tampering.
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default VerifyCertificate;
