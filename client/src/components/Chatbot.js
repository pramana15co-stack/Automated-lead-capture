import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { getApiUrl } from '../config/api';
import './Chatbot.css';

/**
 * AI Chatbot Component
 * Embedded chatbot that answers FAQs using prompt-based AI logic
 */
const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: "Hi! I'm here to help you learn more about our coaching services. What would you like to know?"
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  /**
   * Handle sending a message
   */
  const handleSend = async (e) => {
    e.preventDefault();

    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue.trim();
    setInputValue('');
    
    // Add user message to chat
    setMessages(prev => [...prev, { type: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      // Call chatbot API
      const response = await axios.post(getApiUrl('/api/chat'), {
        message: userMessage
      });

      if (response.data.success) {
        // Add bot response to chat
        setMessages(prev => [...prev, { 
          type: 'bot', 
          text: response.data.response.message || response.data.response
        }]);
      }
    } catch (error) {
      console.error('Chatbot error:', error);
      setMessages(prev => [...prev, { 
        type: 'bot', 
        text: "I apologize, but I'm having trouble right now. Please fill out the form above and we'll contact you soon to answer your questions!"
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Quick action buttons for common questions
   */
  const quickActions = [
    { label: 'What services do you offer?', query: 'What services do you offer?' },
    { label: 'What is your pricing?', query: 'What is your pricing?' },
    { label: 'How do I book a call?', query: 'How do I book a consultation?' }
  ];

  const handleQuickAction = async (query) => {
    // Add user message immediately
    setMessages(prev => [...prev, { type: 'user', text: query }]);
    setIsLoading(true);

    try {
      // Call chatbot API
      const response = await axios.post(getApiUrl('/api/chat'), {
        message: query
      });

      if (response.data.success) {
        // Add bot response to chat
        setMessages(prev => [...prev, { 
          type: 'bot', 
          text: response.data.response.message || response.data.response
        }]);
      }
    } catch (error) {
      console.error('Chatbot error:', error);
      setMessages(prev => [...prev, { 
        type: 'bot', 
        text: "I apologize, but I'm having trouble right now. Please fill out the form above and we'll contact you soon to answer your questions!"
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Chatbot Toggle Button */}
      <button 
        className="chatbot-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle chatbot"
      >
        {isOpen ? '✕' : '💬'}
      </button>

      {/* Chatbot Window */}
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <h3>Ask Me Anything</h3>
            <button 
              className="chatbot-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close chatbot"
            >
              ✕
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`chatbot-message ${message.type === 'user' ? 'user-message' : 'bot-message'}`}
              >
                <div className="message-content">
                  {message.text.split('\n').map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      {i < message.text.split('\n').length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="chatbot-message bot-message">
                <div className="message-content">
                  <span className="typing-indicator">...</span>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          {messages.length === 1 && (
            <div className="chatbot-quick-actions">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  className="quick-action-btn"
                  onClick={() => handleQuickAction(action.query)}
                >
                  {action.label}
                </button>
              ))}
            </div>
          )}

          {/* Input Form */}
          <form className="chatbot-input-form" onSubmit={handleSend}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your question..."
              className="chatbot-input"
              disabled={isLoading}
            />
            <button 
              type="submit" 
              className="chatbot-send-btn"
              disabled={!inputValue.trim() || isLoading}
            >
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Chatbot;

