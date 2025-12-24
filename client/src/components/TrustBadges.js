import React from 'react';
import './TrustBadges.css';

/**
 * Trust Badges Component
 * Adds credibility and trust indicators
 */
const TrustBadges = () => {
  return (
    <section className="trust-badges">
      <div className="container">
        <div className="trust-content">
          <h3 className="trust-title">Trusted & Secure</h3>
          <div className="badges-grid">
            <div className="trust-badge">
              <div className="badge-icon">🔒</div>
              <div className="badge-text">
                <strong>SSL Secured</strong>
                <span>256-bit Encryption</span>
              </div>
            </div>
            <div className="trust-badge">
              <div className="badge-icon">✅</div>
              <div className="badge-text">
                <strong>GDPR Compliant</strong>
                <span>Data Protection</span>
              </div>
            </div>
            <div className="trust-badge">
              <div className="badge-icon">🏆</div>
              <div className="badge-text">
                <strong>ISO Certified</strong>
                <span>Quality Assured</span>
              </div>
            </div>
            <div className="trust-badge">
              <div className="badge-icon">💳</div>
              <div className="badge-text">
                <strong>Secure Payments</strong>
                <span>PCI DSS Compliant</span>
              </div>
            </div>
            <div className="trust-badge">
              <div className="badge-icon">🌐</div>
              <div className="badge-text">
                <strong>Global Reach</strong>
                <span>500+ Clients Worldwide</span>
              </div>
            </div>
            <div className="trust-badge">
              <div className="badge-icon">⭐</div>
              <div className="badge-text">
                <strong>4.9/5 Rating</strong>
                <span>98% Client Satisfaction</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;

