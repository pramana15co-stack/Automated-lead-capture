import React from 'react';
// CSS imported in _app.js for Next.js compatibility

/**
 * Professional Business Logo Component for Pramana15
 * Modern, clean, and business-oriented design
 */
const Logo = ({ size = 'medium', showText = true }) => {
  return (
    <div className={`logo-container logo-${size}`}>
      <div className="logo-icon">
        <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4F46E5" />
              <stop offset="50%" stopColor="#7C3AED" />
              <stop offset="100%" stopColor="#EC4899" />
            </linearGradient>
            <linearGradient id="logoGradientLight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#818CF8" />
              <stop offset="100%" stopColor="#A78BFA" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Modern geometric P design */}
          <rect x="25" y="25" width="70" height="70" rx="12" fill="url(#logoGradient)" opacity="0.1"/>
          
          {/* Bold P letter */}
          <path 
            d="M 35 30 L 35 85 M 35 30 L 60 30 Q 72 30 72 42 Q 72 54 60 54 L 35 54" 
            stroke="url(#logoGradient)" 
            strokeWidth="8" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            fill="none"
            filter="url(#glow)"
          />
          
          {/* Modern accent - number 15 integrated */}
          <circle cx="72" cy="42" r="6" fill="url(#logoGradient)"/>
          <rect x="75" y="60" width="20" height="3" rx="1.5" fill="url(#logoGradientLight)"/>
          <rect x="75" y="67" width="15" height="3" rx="1.5" fill="url(#logoGradientLight)"/>
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

