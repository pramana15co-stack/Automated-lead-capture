import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { getApiUrl } from '../config/api';

/**
 * Business-Specific AI Chatbot
 * Customizable chatbot for different business types
 * Supports both inline (embedded) and floating modes
 */
const BusinessChatbot = ({ businessType, config, inline = false }) => {
  const [isOpen, setIsOpen] = useState(inline); // Inline mode starts open
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: config.initialMessage || "Hello! I'm here to help you learn about our automation systems. What would you like to know?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();

    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue.trim();
    setInputValue('');
    
    setMessages(prev => [...prev, { 
      type: 'user', 
      text: userMessage,
      timestamp: new Date()
    }]);
    setIsLoading(true);

    try {
      const response = await axios.post(getApiUrl('/api/chat'), {
        message: userMessage,
        businessType: businessType
      });

      if (response.data.success) {
        setMessages(prev => [...prev, { 
          type: 'bot', 
          text: response.data.response.message || response.data.response
        }]);
      }
    } catch (error) {
      console.error('Chatbot error:', error);
      setMessages(prev => [...prev, { 
        type: 'bot', 
        text: config.errorMessage || "I apologize, but I'm having trouble right now. Please fill out the form above and we'll contact you soon!"
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = async (query) => {
    setMessages(prev => [...prev, { 
      type: 'user', 
      text: query,
      timestamp: new Date()
    }]);
    setIsLoading(true);

    try {
      const response = await axios.post(getApiUrl('/api/chat'), {
        message: query,
        businessType: businessType
      });

      if (response.data.success) {
        setMessages(prev => [...prev, { 
          type: 'bot', 
          text: response.data.response.message || response.data.response,
          timestamp: new Date()
        }]);
      }
    } catch (error) {
      console.error('Chatbot error:', error);
      setMessages(prev => [...prev, { 
        type: 'bot', 
        text: config.errorMessage || "I apologize, but I'm having trouble right now. Please fill out the form above!",
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // If inline mode, render inline chatbot
  if (inline) {
    return (
      <div className="chatbot-inline">
        <div className="chatbot-window-inline">
          <div className="chatbot-header">
            <h3>{config.title || 'Ask Me Anything'}</h3>
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
                  {message.timestamp && (
                    <div className="message-timestamp">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  )}
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

          {(messages.length === 1 || (messages.length === 2 && messages[1].type === 'user')) && config.quickActions && (
            <div className="chatbot-quick-actions">
              <div style={{ fontSize: '11px', color: '#6b7280', marginBottom: '8px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Quick Questions:
              </div>
              {config.quickActions.map((action, index) => (
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

          <form className="chatbot-input-form" onSubmit={handleSend}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={config.inputPlaceholder || "Type your question..."}
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
      </div>
    );
  }

  // Floating mode (default)
  return (
    <>
      <button 
        className="chatbot-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle chatbot"
      >
        {isOpen ? '✕' : '💬'}
      </button>

      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <h3>{config.title || 'Ask Me Anything'}</h3>
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
                  {message.timestamp && (
                    <div className="message-timestamp">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  )}
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

          {(messages.length === 1 || (messages.length === 2 && messages[1].type === 'user')) && config.quickActions && (
            <div className="chatbot-quick-actions">
              <div style={{ fontSize: '11px', color: '#6b7280', marginBottom: '8px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Quick Questions:
              </div>
              {config.quickActions.map((action, index) => (
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

          <form className="chatbot-input-form" onSubmit={handleSend}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={config.inputPlaceholder || "Type your question..."}
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

export default BusinessChatbot;

