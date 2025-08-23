import React, { useState, useRef, useEffect } from 'react';
import { Camera, Scan, CheckCircle, XCircle, User, Calendar, Clock } from 'lucide-react';

const Scanner = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [manualInput, setManualInput] = useState('');
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);

  // Mock attendee data for demo
  const mockAttendees = {
    'NONDAN-2024-001': {
      id: 'att1',
      name: 'John Doe',
      email: 'john@example.com',
      eventTitle: 'Tech Innovation Summit 2024',
      eventDate: '2024-03-15',
      eventTime: '09:00',
      status: 'confirmed'
    },
    'NONDAN-2024-002': {
      id: 'att2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      eventTitle: 'Cultural Diversity Workshop',
      eventDate: '2024-03-20',
      eventTime: '14:00',
      status: 'confirmed'
    }
  };

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setIsScanning(true);
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Unable to access camera. Please check permissions.');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsScanning(false);
  };

  const handleScan = (ticketId) => {
    // Simulate QR code scan
    const attendee = mockAttendees[ticketId];

    if (attendee) {
      setScanResult({
        success: true,
        attendee,
        message: 'Check-in successful!'
      });
    } else {
      setScanResult({
        success: false,
        message: 'Invalid ticket or attendee not found.'
      });
    }

    // Clear result after 3 seconds
    setTimeout(() => setScanResult(null), 3000);
  };

  const handleManualCheckIn = () => {
    if (manualInput.trim()) {
      handleScan(manualInput.trim());
      setManualInput('');
    }
  };

  useEffect(() => {
    return () => {
      // Cleanup camera when component unmounts
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            QR Code Scanner
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Scan attendee tickets for quick check-in
          </p>
        </div>

        {/* Scanner Interface */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Camera Section */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="text-center">
              {!isScanning ? (
                <div className="space-y-4">
                  <div className="w-64 h-64 mx-auto bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                    <Camera className="h-16 w-16 text-gray-400" />
                  </div>
                  <button
                    onClick={startCamera}
                    className="flex items-center justify-center mx-auto px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                  >
                    <Scan className="h-5 w-5 mr-2" />
                    Start Scanning
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="relative">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      className="w-64 h-64 mx-auto rounded-lg object-cover"
                    />
                    <div className="absolute inset-0 border-2 border-indigo-500 rounded-lg pointer-events-none">
                      <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-indigo-500"></div>
                      <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-indigo-500"></div>
                      <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-indigo-500"></div>
                      <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-indigo-500"></div>
                    </div>
                  </div>
                  <div className="flex space-x-4 justify-center">
                    <button
                      onClick={stopCamera}
                      className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      Stop Camera
                    </button>
                    <button
                      onClick={() => handleScan('NONDAN-2024-001')}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      Simulate Scan
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Manual Input Section */}
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Manual Check-in
            </h3>
            <div className="flex space-x-4">
              <input
                type="text"
                value={manualInput}
                onChange={(e) => setManualInput(e.target.value)}
                placeholder="Enter ticket ID manually"
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                onKeyPress={(e) => e.key === 'Enter' && handleManualCheckIn()}
              />
              <button
                onClick={handleManualCheckIn}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Check In
              </button>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Try: NONDAN-2024-001 or NONDAN-2024-002
            </p>
          </div>
        </div>

        {/* Scan Result */}
        {scanResult && (
          <div className={`mt-6 p-6 rounded-lg border ${
            scanResult.success 
              ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' 
              : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
          }`}>
            <div className="flex items-center">
              {scanResult.success ? (
                <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400 mr-3" />
              ) : (
                <XCircle className="h-6 w-6 text-red-600 dark:text-red-400 mr-3" />
              )}
              <div className="flex-1">
                <h4 className={`font-semibold ${
                  scanResult.success 
                    ? 'text-green-800 dark:text-green-200' 
                    : 'text-red-800 dark:text-red-200'
                }`}>
                  {scanResult.message}
                </h4>
                {scanResult.success && scanResult.attendee && (
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center text-sm text-green-700 dark:text-green-300">
                      <User className="h-4 w-4 mr-2" />
                      {scanResult.attendee.name} ({scanResult.attendee.email})
                    </div>
                    <div className="flex items-center text-sm text-green-700 dark:text-green-300">
                      <Calendar className="h-4 w-4 mr-2" />
                      {scanResult.attendee.eventTitle}
                    </div>
                    <div className="flex items-center text-sm text-green-700 dark:text-green-300">
                      <Clock className="h-4 w-4 mr-2" />
                      {scanResult.attendee.eventDate} at {scanResult.attendee.eventTime}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">
            How to use the scanner:
          </h3>
          <ul className="text-blue-700 dark:text-blue-300 space-y-1">
            <li>• Click "Start Scanning" to activate the camera</li>
            <li>• Point the camera at the QR code on the attendee's ticket</li>
            <li>• The system will automatically detect and process the code</li>
            <li>• For manual entry, type the ticket ID in the input field</li>
            <li>• Successful check-ins will be recorded automatically</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Scanner;
