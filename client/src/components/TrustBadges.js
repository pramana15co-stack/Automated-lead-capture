import React from 'react';
// CSS imported in _app.js for Next.js compatibility

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
                <strong>Enterprise Security</strong>
                <span>256-bit SSL Encryption</span>
              </div>
            </div>
            <div className="trust-badge">
              <div className="badge-icon">✅</div>
              <div className="badge-text">
                <strong>GDPR Compliant</strong>
                <span>Full Data Protection</span>
              </div>
            </div>
            <div className="trust-badge">
              <div className="badge-icon">🏆</div>
              <div className="badge-text">
                <strong>Production-Ready</strong>
                <span>Enterprise Grade Code</span>
              </div>
            </div>
            <div className="trust-badge">
              <div className="badge-icon">💼</div>
              <div className="badge-text">
                <strong>Business Grade</strong>
                <span>Trusted by Professionals</span>
              </div>
            </div>
            <div className="trust-badge">
              <div className="badge-icon">🌐</div>
              <div className="badge-text">
                <strong>Global Deployment</strong>
                <span>Serving Clients Worldwide</span>
              </div>
            </div>
            <div className="trust-badge">
              <div className="badge-icon">⭐</div>
              <div className="badge-text">
                <strong>4.9/5 Rating</strong>
                <span>98% Client Satisfaction</span>
              </div>
            </div>
            <div className="trust-badge">
              <div className="badge-icon">⚡</div>
              <div className="badge-text">
                <strong>Lightning Fast</strong>
                <span>Optimized Performance</span>
              </div>
            </div>
            <div className="trust-badge">
              <div className="badge-icon">📚</div>
              <div className="badge-text">
                <strong>Fully Documented</strong>
                <span>Complete Documentation</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;

