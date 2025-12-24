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
                  <div className="logo-text-icon">N</div>
                </div>
                <span className="logo-name">Next.js</span>
              </div>
              
              <div className="logo-item">
                <div className="logo-svg react-logo">
                  <div className="logo-react-icon">
                    <div className="react-circle"></div>
                    <div className="react-orbit"></div>
                  </div>
                </div>
                <span className="logo-name">React</span>
              </div>
              
              <div className="logo-item">
                <div className="logo-svg nodejs-logo">
                  <div className="logo-text-icon" style={{color: '#339933', fontWeight: '700'}}>N</div>
                </div>
                <span className="logo-name">Node.js</span>
              </div>
              
              <div className="logo-item">
                <div className="logo-svg vercel-logo">
                  <div className="logo-vercel-icon">
                    <div className="vercel-triangle"></div>
                  </div>
                </div>
                <span className="logo-name">Vercel</span>
              </div>
              
              <div className="logo-item">
                <div className="logo-svg google-logo">
                  <div className="logo-google-icon">
                    <div className="google-g">G</div>
                  </div>
                </div>
                <span className="logo-name">Google</span>
              </div>
              
              <div className="logo-item">
                <div className="logo-svg openai-logo">
                  <div className="logo-openai-icon">
                    <div className="openai-sparkle">✨</div>
                  </div>
                </div>
                <span className="logo-name">OpenAI</span>
              </div>
            </div>
          </div>
          
          {/* Certification Logos */}
          <div className="logo-category">
            <h4 className="logo-category-title">Certifications & Standards</h4>
            <div className="logo-items">
              <div className="logo-item">
                <div className="logo-svg ssl-logo">
                  <div className="cert-icon">🔒</div>
                </div>
                <span className="logo-name">SSL Certified</span>
              </div>
              
              <div className="logo-item">
                <div className="logo-svg gdpr-logo">
                  <div className="cert-icon">✅</div>
                </div>
                <span className="logo-name">GDPR Compliant</span>
              </div>
              
              <div className="logo-item">
                <div className="logo-svg iso-logo">
                  <div className="cert-icon">🏆</div>
                </div>
                <span className="logo-name">ISO Standard</span>
              </div>
              
              <div className="logo-item">
                <div className="logo-svg pci-logo">
                  <div className="cert-icon">💳</div>
                </div>
                <span className="logo-name">PCI DSS</span>
              </div>
            </div>
          </div>
        </div>

        {/* Client/Partner Logos Section */}
        <div className="client-logos-section">
          <h4 className="client-logos-title">Trusted By</h4>
          <div className="client-logos-grid">
            <div className="client-logo-item">
              <div className="client-logo-circle">BC</div>
              <span>Business Coaches</span>
            </div>
            <div className="client-logo-item">
              <div className="client-logo-circle">LC</div>
              <span>Life Coaches</span>
            </div>
            <div className="client-logo-item">
              <div className="client-logo-circle">CC</div>
              <span>Career Coaches</span>
            </div>
            <div className="client-logo-item">
              <div className="client-logo-circle">EC</div>
              <span>Executive Coaches</span>
            </div>
            <div className="client-logo-item">
              <div className="client-logo-circle">FC</div>
              <span>Fitness Coaches</span>
            </div>
            <div className="client-logo-item">
              <div className="client-logo-circle">WC</div>
              <span>Wellness Coaches</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogoSection;

