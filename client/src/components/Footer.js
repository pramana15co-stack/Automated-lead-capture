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
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Company</h4>
            <ul className="footer-links">
              <li><a href="/#features">Services</a></li>
              <li><a href="/#testimonials">Testimonials</a></li>
              <li><a href="/#contact">Contact Us</a></li>
              <li><a href="/#lead-form">Get Started</a></li>
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
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

