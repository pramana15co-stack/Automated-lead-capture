import React from 'react';
import Logo from './Logo';
// CSS imported in _app.js for Next.js compatibility

/**
 * Professional Footer Component
 * Adds credibility with company information and legal links
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <Logo size="medium" />
            <p className="footer-description">
              We build custom automation systems that ensure no enquiry goes unanswered. 
              Professional, reliable, and tailored to your business needs.
            </p>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Services</h4>
            <ul className="footer-links">
              <li><a href="/dental-clinic">Dental Clinics</a></li>
              <li><a href="/real-estate">Real Estate</a></li>
              <li><a href="/business-coach">Business Coaches</a></li>
              <li><a href="/">All Business Types</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Add-On Services</h4>
            <ul className="footer-links">
              <li><a href="#pricing">Meta Ads Setup</a></li>
              <li><a href="#pricing">WhatsApp Integration</a></li>
              <li><a href="#pricing">Voice Assistant</a></li>
              <li><a href="#pricing">View All Services</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Contact</h4>
            <ul className="footer-contact">
              <li>
                <span className="contact-icon">📧</span>
                <div>
                  <strong>Email</strong>
                  <p><a href="mailto:pramana15@pramana15.com">pramana15@pramana15.com</a></p>
                </div>
              </li>
              <li>
                <span className="contact-icon">⏰</span>
                <div>
                  <strong>Response Time</strong>
                  <p>Within 24 hours</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Legal</h4>
            <ul className="footer-links">
              <li><a href="/privacy">Privacy Policy</a></li>
              <li><a href="/terms">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="copyright">
              © {currentYear} Pramana15. All rights reserved.
            </p>
            <div className="footer-badges">
              <span className="footer-badge">🔒 Secure</span>
              <span className="footer-badge">✅ GDPR Compliant</span>
              <span className="footer-badge">🚀 Production Ready</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

