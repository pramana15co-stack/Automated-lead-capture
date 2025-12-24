import React from 'react';
import './LogoSection.css';

/**
 * Logo Section Component
 * Displays technology, partner, and certification logos for credibility
 */
const LogoSection = () => {
  return (
    <section className="logo-section">
      <div className="container">
        <div className="logo-section-header">
          <h3 className="logo-section-title">Trusted Technologies & Partners</h3>
          <p className="logo-section-subtitle">
            Built with industry-leading technologies and trusted by professionals worldwide
          </p>
        </div>
        
        <div className="logos-grid">
          {/* Technology Logos */}
          <div className="logo-category">
            <h4 className="logo-category-title">Technologies</h4>
            <div className="logo-items">
              <div className="logo-item">
                <div className="logo-svg nextjs-logo">
                  <svg viewBox="0 0 394 80" fill="none">
                    <path d="M262 0h68.5v12.7h-27.2v66.6h-13.6V12.7H262V0zM149 0v12.7H94v20.4h44.3v12.6H94v21h55v12.6H80.5V0h68.7zm34.1 0h-17.8l63.8 79.4h17.9l-32-39.7 32-39.6h-17.9l-23 28.6-23-28.6zm18.3 56.7l-9-11.2-26.3 32.7h17.8l17.5-21.5z" fill="#000"/>
                  </svg>
                </div>
                <span className="logo-name">Next.js</span>
              </div>
              
              <div className="logo-item">
                <div className="logo-svg react-logo">
                  <svg viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="2" fill="#61DAFB"/>
                    <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V21C3 22.11 3.89 23 5 23H11V21H5V3H13V9H21Z" fill="#61DAFB"/>
                  </svg>
                </div>
                <span className="logo-name">React</span>
              </div>
              
              <div className="logo-item">
                <div className="logo-svg nodejs-logo">
                  <svg viewBox="0 0 24 24" fill="#339933">
                    <path d="M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.08-0.383 c0.585-0.203,0.703-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0l8.795-5.076 c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.081-0.047-0.189-0.047-0.271,0 L3.075,6.68C2.99,6.729,2.936,6.825,2.936,6.921v10.15c0,0.097,0.054,0.189,0.139,0.235l2.409,1.392 c1.307,0.654,2.105-0.116,2.105-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021 c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L2.28,18.675c-0.57-0.329-0.922-0.945-0.922-1.604V6.921 c0-0.659,0.353-1.275,0.922-1.603l8.795-5.082c0.557-0.315,1.296-0.315,1.848,0l8.794,5.082c0.570,0.329,0.924,0.944,0.924,1.603 v10.15c0,0.659-0.354,1.265-0.924,1.604l-8.794,5.078C12.643,23.916,12.324,24,11.998,24z M19.099,13.993 c0-1.9-1.284-2.406-3.946-2.763c-2.731-0.361-3.009-0.548-3.009-1.187c0-0.528,0.235-1.233,2.258-1.233 c1.807,0,2.473,0.389,2.747,1.607c0.024,0.115,0.129,0.199,0.247,0.199h1.141c0.071,0,0.138-0.031,0.186-0.081 c0.048-0.054,0.074-0.123,0.067-0.196c-0.177-2.098-1.571-3.076-4.582-3.076c-2.508,0-4.004,1.058-4.004,2.833 c0,1.925,1.488,2.457,3.752,2.695c2.442,0.261,3.009,0.596,3.009,1.213c0,0.963-0.802,1.333-2.4,1.333 c-2.082,0-2.851-0.389-3.146-1.607c-0.024-0.115-0.129-0.199-0.247-0.199H6.533c-0.071,0-0.138,0.031-0.186,0.081 c-0.048,0.054-0.074,0.123-0.067,0.196c0.177,2.104,1.567,3.076,4.727,3.076 C15.073,16.007,19.099,15.104,19.099,13.993z"/>
                  </svg>
                </div>
                <span className="logo-name">Node.js</span>
              </div>
              
              <div className="logo-item">
                <div className="logo-svg vercel-logo">
                  <svg viewBox="0 0 283 64" fill="none">
                    <path d="M141 0l130.5 64H141V0z" fill="#000"/>
                    <path d="M141 0L10.5 64H141V0z" fill="#000" opacity="0.5"/>
                  </svg>
                </div>
                <span className="logo-name">Vercel</span>
              </div>
              
              <div className="logo-item">
                <div className="logo-svg google-logo">
                  <svg viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                </div>
                <span className="logo-name">Google</span>
              </div>
              
              <div className="logo-item">
                <div className="logo-svg openai-logo">
                  <svg viewBox="0 0 24 24" fill="#10A37F">
                    <path d="M22.282 9.821a4.985 4.985 0 0 0-4.544-2.99 4.864 4.864 0 0 0-2.148.505 4.977 4.977 0 0 0-7.48 3.465 4.985 4.985 0 0 0-4.544 2.99 4.864 4.864 0 0 0 .506 2.148 4.978 4.978 0 0 0 3.465 7.48 4.985 4.985 0 0 0 2.99 4.544 4.864 4.864 0 0 0 2.148-.506 4.978 4.978 0 0 0 7.48-3.465 4.985 4.985 0 0 0 4.544-2.99 4.864 4.864 0 0 0-.506-2.148 4.978 4.978 0 0 0-3.465-7.48zm-9.814 7.576a3.015 3.015 0 1 1 .005-6.031 3.015 3.015 0 0 1-.005 6.031z"/>
                  </svg>
                </div>
                <span className="logo-name">OpenAI</span>
              </div>
            </div>
          </div>
          
          {/* Certification Logos */}
          <div className="logo-category">
            <h4 className="logo-category-title">Certifications</h4>
            <div className="logo-items">
              <div className="logo-item">
                <div className="logo-svg ssl-logo">
                  <div className="ssl-icon">🔒</div>
                </div>
                <span className="logo-name">SSL Certified</span>
              </div>
              
              <div className="logo-item">
                <div className="logo-svg gdpr-logo">
                  <div className="gdpr-icon">✅</div>
                </div>
                <span className="logo-name">GDPR Compliant</span>
              </div>
              
              <div className="logo-item">
                <div className="logo-svg iso-logo">
                  <div className="iso-icon">🏆</div>
                </div>
                <span className="logo-name">ISO Standard</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogoSection;

