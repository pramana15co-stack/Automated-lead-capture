import React from 'react';
import './ContactSection.css';

/**
 * Contact Section Component
 * Professional contact information for Pramana15
 */
const ContactSection = () => {
  const handleEmailClick = () => {
    window.location.href = 'mailto:pramana15.co@gmail.com';
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div className="contact-content">
          <div className="contact-header">
            <h2 className="contact-title">Get in Touch</h2>
            <p className="contact-subtitle">
              Have questions? We're here to help. Reach out to us and we'll respond within 24 hours.
            </p>
          </div>
          
          <div className="contact-info-grid">
            <div className="contact-card">
              <div className="contact-icon">🏢</div>
              <h3>Company</h3>
              <p className="contact-detail">Pramana15</p>
            </div>
            
            <div className="contact-card">
              <div className="contact-icon">📧</div>
              <h3>Email</h3>
              <a 
                href="mailto:pramana15.co@gmail.com" 
                className="contact-detail contact-link"
                onClick={handleEmailClick}
              >
                pramana15.co@gmail.com
              </a>
            </div>
            
            <div className="contact-card">
              <div className="contact-icon">🌍</div>
              <h3>Global Reach</h3>
              <p className="contact-detail">Serving clients worldwide</p>
              <div className="countries">
                <span className="country-tag">🇺🇸 USA</span>
                <span className="country-tag">🇬🇧 UK</span>
                <span className="country-tag">🇦🇺 Australia</span>
                <span className="country-tag">🌎 Global</span>
              </div>
            </div>
          </div>

          <div className="contact-cta">
            <p className="cta-text">Ready to transform your coaching business?</p>
            <button 
              className="btn btn-primary btn-large"
              onClick={() => {
                const formElement = document.getElementById('lead-form');
                if (formElement) {
                  formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
            >
              Book Your Free Consultation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

