import React from 'react';
// CSS imported in _app.js for Next.js compatibility

/**
 * Contact Section Component
 * Professional contact information for Pramana15
 */
const ContactSection = () => {
  const handleEmailClick = () => {
    window.location.href = 'mailto:pramana15@pramana15.com';
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div className="contact-content">
          <div className="contact-header">
            <h2 className="contact-title">Get in Touch</h2>
            <p className="contact-subtitle">
              Questions about our automation systems? We respond within 24 hours.
            </p>
          </div>
          
          <div className="contact-info-compact">
            <div className="contact-main">
              <div className="contact-email">
                <div className="contact-icon">📧</div>
                <div>
                  <h3>Email Us</h3>
                  <a 
                    href="mailto:pramana15@pramana15.com" 
                    className="contact-detail contact-link"
                    onClick={handleEmailClick}
                  >
                    pramana15@pramana15.com
                  </a>
                  <p className="contact-subdetail">Response within 24 hours</p>
                </div>
              </div>
              <div className="contact-service">
                <div className="contact-icon">🌍</div>
                <div>
                  <h3>Service Area</h3>
                  <p className="contact-detail">Worldwide</p>
                  <p className="contact-subdetail">Serving clients globally</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

