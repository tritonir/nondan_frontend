import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

const Chatbot = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm the Nondan assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // FAQ responses
  const faqResponses = {
    'how to register': 'To register for an event, visit the event page and click the "Register" button. You\'ll need to be logged in to your Nondan account.',
    'create account': 'You can create an account by clicking "Sign Up" in the top navigation. Choose between Student or Admin account types.',
    'event registration': 'Event registration is free for most events. Some premium events may require payment. You\'ll see the cost (if any) on the event page.',
    'certificates': 'You can download your certificates from the "Certificates" page in your student dashboard after completing events.',
    'hub membership': 'To join a hub, visit the hub page and click "Join Hub". Some hubs may require approval from administrators.',
    'forgot password': 'Click "Forgot Password" on the login page and enter your email. We\'ll send you a reset link.',
    'contact support': 'You can contact our support team at support@nondan.com or use the contact form in the Settings page.',
    'cancel registration': 'You can cancel your event registration from your student dashboard up to 24 hours before the event starts.',
    'event creation': 'Hub administrators can create events through the admin dashboard. Visit "Create Event" in the admin panel.',
    'platform features': 'Nondan offers event management, hub communities, certificate generation, QR check-ins, and analytics for organizers.'
  };

  const quickReplies = [
    'How to register for events?',
    'How to create an account?',
    'Where are my certificates?',
    'How to join a hub?',
    'Contact support'
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse = generateBotResponse(inputMessage.toLowerCase());
      const botMessage = {
        id: Date.now() + 1,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const generateBotResponse = (userInput) => {
    // Check for FAQ matches
    for (const [key, response] of Object.entries(faqResponses)) {
      if (userInput.includes(key)) {
        return response;
      }
    }

    // Check for greeting
    if (userInput.includes('hello') || userInput.includes('hi') || userInput.includes('hey')) {
      return "Hello! Welcome to Nondan. I'm here to help you with any questions about our platform. What would you like to know?";
    }

    // Check for thanks
    if (userInput.includes('thank') || userInput.includes('thanks')) {
      return "You're welcome! Is there anything else I can help you with regarding Nondan?";
    }

    // Default response
    return "I'm not sure about that specific question, but I can help you with:\n\n• Event registration and management\n• Account creation and settings\n• Hub membership\n• Certificates and downloads\n• General platform features\n\nYou can also contact our support team at support@nondan.com for more detailed assistance.";
  };

  const handleQuickReply = (reply) => {
    setInputMessage(reply);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-end p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md h-96 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
              <Bot className="h-4 w-4 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Nondan Assistant</h3>
              <p className="text-xs text-green-500">Online</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex space-x-2 max-w-xs ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.sender === 'user' 
                    ? 'bg-indigo-600' 
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}>
                  {message.sender === 'user' ? (
                    <User className="h-3 w-3 text-white" />
                  ) : (
                    <Bot className="h-3 w-3 text-gray-600 dark:text-gray-300" />
                  )}
                </div>
                <div className={`rounded-lg p-3 ${
                  message.sender === 'user'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                }`}>
                  <p className="text-sm whitespace-pre-line">{message.text}</p>
                  <p className={`text-xs mt-1 ${
                    message.sender === 'user' 
                      ? 'text-indigo-200' 
                      : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="flex space-x-2 max-w-xs">
                <div className="w-6 h-6 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center flex-shrink-0">
                  <Bot className="h-3 w-3 text-gray-600 dark:text-gray-300" />
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Replies */}
        {messages.length === 1 && (
          <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Quick questions:</p>
            <div className="flex flex-wrap gap-2">
              {quickReplies.map((reply, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickReply(reply)}
                  className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                  {reply}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isTyping}
              className="px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Chatbot Toggle Button Component
export const ChatbotToggle = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 flex items-center justify-center z-40"
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      <Chatbot isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default Chatbot;
