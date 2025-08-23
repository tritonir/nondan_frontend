import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Expand, Minimize2 } from 'lucide-react';
import { useClubTheme } from '../context/ThemeHooks';

const Chatbot = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const messagesEndRef = useRef(null);
  const clubTheme = useClubTheme();

  // Use theme colors with fallbacks
  const safeTheme = {
    primary: clubTheme?.primary || 'var(--primary-accent-1)',
    accent: clubTheme?.accent || 'var(--primary-accent-2)',
    secondary: clubTheme?.secondary || '#10B981'
  };

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

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      fetchInitialMessage();
    }
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // First bot message comes from backend
  const fetchInitialMessage = async () => {
    setIsTyping(true);
    try {
      const response = await fetch("http://localhost:5000/api/ai/aicall", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: "hello" })
      });
      const data = await response.json();
      setMessages([
        {
          id: Date.now(),
          text: data.reply || "Hi! How can I assist you today?",
          sender: 'bot',
          timestamp: new Date()
        }
      ]);
    } catch (err) {
      console.error(err);
      setMessages([
        {
          id: Date.now(),
          text: "⚠️ Error: Could not connect to server.",
          sender: 'bot',
          timestamp: new Date()
        }
      ]);
    } finally {
      setIsTyping(false);
    }
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

    try {
      const response = await fetch("http://localhost:5000/api/ai/aicall", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: inputMessage.toLowerCase() }),
      });

      const data = await response.json();
      console.log(inputMessage)
      console.log(data)

      const botMessage = {
        id: Date.now() + 1,
        text: data || "Sorry, I couldn't understand. Please try again.",
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          text: "⚠️ Error: Could not connect to server. Please try again.",
          sender: 'bot',
          timestamp: new Date()
        }
      ]);
    } finally {
      setIsTyping(false);
    }; 1000;
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

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  // Fullscreen mode
  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-50 bg-white dark:bg-gray-900 flex flex-col">
        {/* Fullscreen Header */}
        <div
          className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700"
          style={{
            background: `linear-gradient(135deg, ${safeTheme.primary}, ${safeTheme.accent})`
          }}
        >
          <div className="flex items-center space-x-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center shadow-sm"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.25)' }}
            >
              <Bot className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-white text-lg">Nondan Assistant</h3>
              <div className="flex items-center space-x-1">
                <div
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: safeTheme.secondary }}
                />
                <p className="text-sm text-white/90">Online - Fullscreen Mode</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsFullscreen(false)}
              className="text-white/80 hover:text-white transition-all duration-200 p-2 rounded-lg hover:bg-white/15 active:scale-95"
              title="Exit fullscreen"
            >
              <Minimize2 className="h-5 w-5" />
            </button>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition-all duration-200 p-2 rounded-lg hover:bg-white/15 active:scale-95"
              title="Close chat"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Fullscreen Messages */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-gray-900/50 max-w-4xl mx-auto w-full">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
              >
                <div className={`flex space-x-3 max-w-[70%] ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm ${message.sender === 'user'
                    ? ''
                    : 'bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600'
                    }`}
                    style={message.sender === 'user' ? {
                      background: `linear-gradient(135deg, ${safeTheme.primary}, ${safeTheme.accent})`
                    } : {}}
                  >
                    {message.sender === 'user' ? (
                      <User className="h-4 w-4 text-white" />
                    ) : (
                      <Bot className="h-4 w-4" style={{ color: safeTheme.primary }} />
                    )}
                  </div>
                  <div className={`rounded-2xl px-4 py-3 shadow-sm border ${message.sender === 'user'
                    ? 'text-white border-transparent'
                    : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-200 dark:border-gray-600'
                    }`}
                    style={message.sender === 'user' ? {
                      background: `linear-gradient(135deg, ${safeTheme.primary}, ${safeTheme.accent})`
                    } : {}}
                  >
                    <p className="text-base leading-relaxed whitespace-pre-line">{message.text}</p>
                    <p className={`text-sm mt-2 ${message.sender === 'user'
                      ? 'text-white/75'
                      : 'text-gray-500 dark:text-gray-400'
                      }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start animate-fadeIn">
                <div className="flex space-x-3 max-w-[70%]">
                  <div className="w-8 h-8 rounded-full bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Bot className="h-4 w-4" style={{ color: safeTheme.primary }} />
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-2xl px-4 py-3 border border-gray-200 dark:border-gray-600 shadow-sm">
                    <div className="flex space-x-1">
                      <div className="w-3 h-3 rounded-full animate-bounce" style={{ backgroundColor: safeTheme.primary }}></div>
                      <div className="w-3 h-3 rounded-full animate-bounce" style={{ backgroundColor: safeTheme.accent, animationDelay: '0.1s' }}></div>
                      <div className="w-3 h-3 rounded-full animate-bounce" style={{ backgroundColor: safeTheme.secondary, animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Fullscreen Input */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="max-w-4xl mx-auto">
            <div className="flex space-x-3">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:border-transparent text-base transition-all duration-200 resize-none"
                style={{
                  outline: 'none'
                }}
                onFocus={(e) => {
                  e.target.style.boxShadow = `0 0 0 2px ${safeTheme.primary}40`;
                  e.target.style.borderColor = safeTheme.primary;
                }}
                onBlur={(e) => {
                  e.target.style.boxShadow = 'none';
                  e.target.style.borderColor = '';
                }}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
                className="px-6 py-3 text-white rounded-xl transition-all duration-200 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 font-medium"
                style={{
                  background: `linear-gradient(135deg, ${safeTheme.primary}, ${safeTheme.accent})`
                }}
                title="Send message"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Regular floating mode - NO BACKGROUND OVERLAY
  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)]">
      <div
        className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl border transition-all duration-300 w-80 h-96 max-w-[calc(100vw-2rem)] max-h-[calc(100vh-8rem)] flex flex-col"
        style={{
          borderColor: `${safeTheme.primary}30`,
          boxShadow: `0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 0 1px ${safeTheme.primary}20`
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between p-3 rounded-t-xl flex-shrink-0"
          style={{
            background: `linear-gradient(135deg, ${safeTheme.primary}, ${safeTheme.accent})`
          }}
        >
          <div className="flex items-center space-x-2">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center shadow-sm"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.25)' }}
            >
              <Bot className="h-4 w-4 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-white text-sm">Nondan Assistant</h3>
              <div className="flex items-center space-x-1">
                <div
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: safeTheme.secondary }}
                />
                <p className="text-xs text-white/90">Online</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <button
              onClick={() => setIsFullscreen(true)}
              className="text-white/80 hover:text-white transition-all duration-200 p-1.5 rounded-lg hover:bg-white/15 active:scale-95"
              title="Open fullscreen"
            >
              <Expand className="h-4 w-4" />
            </button>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition-all duration-200 p-1.5 rounded-lg hover:bg-white/15 active:scale-95"
              title="Close chat"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-gray-50 dark:bg-gray-900/50">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
            >
              <div className={`flex space-x-2 max-w-[75%] ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm ${message.sender === 'user'
                  ? ''
                  : 'bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600'
                  }`}
                  style={message.sender === 'user' ? {
                    background: `linear-gradient(135deg, ${safeTheme.primary}, ${safeTheme.accent})`
                  } : {}}
                >
                  {message.sender === 'user' ? (
                    <User className="h-3 w-3 text-white" />
                  ) : (
                    <Bot className="h-3 w-3" style={{ color: safeTheme.primary }} />
                  )}
                </div>
                <div className={`rounded-2xl px-3 py-2 shadow-sm border ${message.sender === 'user'
                  ? 'text-white border-transparent'
                  : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-200 dark:border-gray-600'
                  }`}
                  style={message.sender === 'user' ? {
                    background: `linear-gradient(135deg, ${safeTheme.primary}, ${safeTheme.accent})`
                  } : {}}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-line">{message.text}</p>
                  <p className={`text-xs mt-1 ${message.sender === 'user'
                    ? 'text-white/75'
                    : 'text-gray-500 dark:text-gray-400'
                    }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start animate-fadeIn">
              <div className="flex space-x-2 max-w-[75%]">
                <div className="w-6 h-6 rounded-full bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Bot className="h-3 w-3" style={{ color: safeTheme.primary }} />
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-2xl px-3 py-2 border border-gray-200 dark:border-gray-600 shadow-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: safeTheme.primary }}></div>
                    <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: safeTheme.accent, animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: safeTheme.secondary, animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-3 border-t border-gray-200 dark:border-gray-700 rounded-b-xl bg-white dark:bg-gray-800 flex-shrink-0">
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:border-transparent text-sm transition-all duration-200 resize-none"
              style={{
                outline: 'none'
              }}
              onFocus={(e) => {
                e.target.style.boxShadow = `0 0 0 2px ${safeTheme.primary}40`;
                e.target.style.borderColor = safeTheme.primary;
              }}
              onBlur={(e) => {
                e.target.style.boxShadow = 'none';
                e.target.style.borderColor = '';
              }}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isTyping}
              className="px-3 py-2 text-white rounded-xl transition-all duration-200 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 font-medium"
              style={{
                background: `linear-gradient(135deg, ${safeTheme.primary}, ${safeTheme.accent})`
              }}
              title="Send message"
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
  const clubTheme = useClubTheme();

  // Use theme colors with fallbacks
  const safeTheme = {
    primary: clubTheme?.primary || 'var(--primary-accent-1)',
    accent: clubTheme?.accent || 'var(--primary-accent-2)'
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 text-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center z-40 transition-all duration-300 transform hover:scale-110"
        style={{
          background: `linear-gradient(135deg, ${safeTheme.primary}, ${safeTheme.accent})`
        }}
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      <Chatbot isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default Chatbot;
