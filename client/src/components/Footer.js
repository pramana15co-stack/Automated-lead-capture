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
              Pramana15 delivers enterprise-grade lead capture and automation solutions 
              built by experienced full-stack developers. Production-ready systems trusted 
              by coaches and businesses worldwide. Serving clients globally with professional 
              development services.
            </p>
            <div className="footer-social">
              <span className="social-label">Follow Us:</span>
              <div className="social-links">
                <a href="#" className="social-link" aria-label="LinkedIn">LinkedIn</a>
                <a href="#" className="social-link" aria-label="Twitter">Twitter</a>
                <a href="#" className="social-link" aria-label="Facebook">Facebook</a>
              </div>
            </div>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Company</h4>
            <ul className="footer-links">
              <li><a href="#services">Services</a></li>
              <li><a href="#testimonials">Testimonials</a></li>
              <li><a href="#contact">Contact Us</a></li>
              <li><a href="#lead-form">Get Started</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Legal</h4>
            <ul className="footer-links">
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#terms">Terms of Service</a></li>
              <li><a href="#cookies">Cookie Policy</a></li>
              <li><a href="#refund">Refund Policy</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Contact Info</h4>
            <ul className="footer-contact">
              <li>
                <span className="contact-icon">🌍</span>
                <div>
                  <strong>Service Area</strong>
                  <p>Global - Worldwide Coverage</p>
                </div>
              </li>
              <li>
                <span className="contact-icon">📧</span>
                <div>
                  <strong>Email</strong>
                  <p><a href="mailto:pramana15.co@gmail.com">pramana15.co@gmail.com</a></p>
                </div>
              </li>
              <li>
                <span className="contact-icon">🌍</span>
                <div>
                  <strong>Service Area</strong>
                  <p>Global - Serving clients worldwide</p>
                </div>
              </li>
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
              <span className="footer-badge">✅ Verified</span>
              <span className="footer-badge">⭐ Trusted</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

