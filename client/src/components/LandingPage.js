import React from 'react';
import LeadCaptureForm from './LeadCaptureForm';
import Chatbot from './Chatbot';
import './LandingPage.css';

/**
 * Landing Page Component
 * Main conversion-focused landing page with headline, benefits, CTA, and form
 */
const LandingPage = () => {
  const handleCTAClick = () => {
    // Scroll to form smoothly
    setTimeout(() => {
      const formElement = document.getElementById('lead-form');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-headline">
              Book More Clients & Transform Your Business
            </h1>
            <p className="hero-subheadline">
              Get personalized coaching that helps you achieve your goals faster. 
              Join hundreds of successful professionals who've transformed their careers.
            </p>
            <button 
              className="btn btn-primary btn-large"
              onClick={handleCTAClick}
            >
              Book a Free Consultation
            </button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits">
        <div className="container">
          <h2 className="section-title">Why Choose Our Coaching?</h2>
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">🎯</div>
              <h3>Personalized Approach</h3>
              <p>Every coaching program is tailored to your unique goals, challenges, and aspirations.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">⚡</div>
              <h3>Fast Results</h3>
              <p>See measurable improvements in your business and career within the first 30 days.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">🤝</div>
              <h3>Expert Guidance</h3>
              <p>Work with experienced coaches who've helped hundreds of professionals succeed.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">📈</div>
              <h3>Proven System</h3>
              <p>Follow a battle-tested framework that's helped clients achieve breakthrough results.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Lead Capture Form Section */}
      <section id="lead-form" className="lead-form-section">
        <div className="container">
          <div className="form-container">
            <h2 className="form-title">Get Started Today</h2>
            <p className="form-subtitle">
              Fill out the form below and we'll contact you within 24 hours to schedule your free consultation.
            </p>
            <LeadCaptureForm />
          </div>
        </div>
      </section>

      {/* Chatbot */}
      <Chatbot />
    </div>
  );
};

export default LandingPage;

