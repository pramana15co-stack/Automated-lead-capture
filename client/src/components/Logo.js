import React from 'react';
import './Logo.css';

/**
 * Professional Logo Component for Pramana15
 */
const Logo = ({ size = 'medium', showText = true }) => {
  return (
    <div className={`logo-container logo-${size}`}>
      <div className="logo-icon">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Modern P letter design */}
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#667eea" />
              <stop offset="100%" stopColor="#764ba2" />
            </linearGradient>
          </defs>
          
          {/* Background circle */}
          <circle cx="50" cy="50" r="45" fill="url(#logoGradient)" opacity="0.1"/>
          
          {/* P letter shape */}
          <path 
            d="M 30 20 L 30 80 M 30 20 L 55 20 Q 65 20 65 30 Q 65 40 55 40 L 30 40" 
            stroke="url(#logoGradient)" 
            strokeWidth="8" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            fill="none"
          />
          
          {/* Modern accent */}
          <circle cx="65" cy="30" r="8" fill="url(#logoGradient)"/>
        </svg>
      </div>
      {showText && (
        <span className="logo-text">
          <span className="logo-name">Pramana</span>
          <span className="logo-number">15</span>
        </span>
      )}
    </div>
  );
};

export default Logo;

