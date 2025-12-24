import React, { useEffect, useState } from 'react';
import LeadCaptureForm from './LeadCaptureForm';
import Chatbot from './Chatbot';
import ContactSection from './ContactSection';
import './LandingPage.css';

/**
 * Enhanced Landing Page Component
 * Professional, interactive design for international clients
 */
const LandingPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleCTAClick = () => {
    setTimeout(() => {
      const formElement = document.getElementById('lead-form');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
    <div className="landing-page">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="container">
          <div className="nav-content">
            <div className="logo">Pramana15</div>
            <div className="nav-links">
              <a href="#services" className="nav-link">Services</a>
              <a href="#testimonials" className="nav-link">Testimonials</a>
              <a href="#contact" className="nav-link">Contact</a>
              <button className="btn btn-nav" onClick={handleCTAClick}>
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className={`hero ${isVisible ? 'fade-in' : ''}`}>
        <div className="hero-background"></div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <span>✨ Trusted by Coaches Worldwide</span>
            </div>
            <h1 className="hero-headline">
              Transform Your Coaching Business
              <span className="gradient-text"> & Scale Globally</span>
            </h1>
            <p className="hero-subheadline">
              Join successful coaches from the US, UK, Australia, and beyond who've 
              transformed their businesses with our proven lead capture and automation system. 
              Book more clients, automate follow-ups, and grow your coaching practice.
            </p>
            <div className="hero-cta-group">
              <button 
                className="btn btn-primary btn-large btn-pulse"
                onClick={handleCTAClick}
              >
                Book Your Free Consultation
                <span className="btn-arrow">→</span>
              </button>
              <a href="#services" className="btn btn-secondary btn-large">
                Learn More
              </a>
            </div>
            <div className="hero-stats">
              <div className="stat-item">
                <div className="stat-number">500+</div>
                <div className="stat-label">Coaches Worldwide</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">10K+</div>
                <div className="stat-label">Leads Captured</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">98%</div>
                <div className="stat-label">Client Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
      </section>

      {/* Features Section */}
      <section id="services" className="features">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Everything You Need to Grow</h2>
            <p className="section-subtitle">
              A complete system designed for coaches who want to scale their business globally
            </p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🚀</div>
              <h3>Automated Lead Capture</h3>
              <p>Never miss a potential client. Our system automatically captures, organizes, and follows up with every lead.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📧</div>
              <h3>Smart Email Automation</h3>
              <p>Send personalized follow-ups, confirmations, and nurture sequences automatically. Save hours every week.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Real-Time Analytics</h3>
              <p>Track your leads, conversions, and ROI with our comprehensive dashboard. Make data-driven decisions.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🤖</div>
              <h3>AI-Powered Chatbot</h3>
              <p>Answer common questions 24/7 with our intelligent chatbot. Engage visitors even when you're sleeping.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🌍</div>
              <h3>Global Reach</h3>
              <p>Designed for international clients. Works seamlessly across time zones and languages.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💼</div>
              <h3>Professional Branding</h3>
              <p>Showcase your expertise with a stunning, conversion-optimized website that builds trust instantly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Why Coaches Choose Us</h2>
            <p className="section-subtitle">
              Join hundreds of successful coaches who've transformed their businesses
            </p>
          </div>
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">🎯</div>
              <h3>Personalized Approach</h3>
              <p>Every system is tailored to your unique coaching style, niche, and business goals.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">⚡</div>
              <h3>Fast Results</h3>
              <p>See measurable improvements in your lead generation and client bookings within the first week.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">🤝</div>
              <h3>Expert Support</h3>
              <p>Get dedicated support from our team of experts who understand the coaching industry.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">📈</div>
              <h3>Proven System</h3>
              <p>Follow a battle-tested framework that's helped coaches achieve breakthrough results worldwide.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="testimonials">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">What Our Clients Say</h2>
            <p className="section-subtitle">
              Real results from coaches around the world
            </p>
          </div>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-content">
                <div className="stars">★★★★★</div>
                <p>"This system transformed my coaching business. I went from 2-3 clients a month to 15+ clients. The automation saves me 10+ hours weekly!"</p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">SM</div>
                <div className="author-info">
                  <div className="author-name">Sarah Mitchell</div>
                  <div className="author-title">Life Coach, London, UK</div>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-content">
                <div className="stars">★★★★★</div>
                <p>"As a business coach in New York, I needed something professional that works 24/7. This system captures leads even when I'm sleeping. Game changer!"</p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">JD</div>
                <div className="author-info">
                  <div className="author-name">James Davis</div>
                  <div className="author-title">Business Coach, New York, USA</div>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-content">
                <div className="stars">★★★★★</div>
                <p>"The best investment I've made for my coaching practice. My conversion rate increased by 300% and I'm now working with clients from 5 different countries!"</p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">EW</div>
                <div className="author-info">
                  <div className="author-name">Emma Wilson</div>
                  <div className="author-title">Career Coach, Sydney, Australia</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lead Capture Form Section */}
      <section id="lead-form" className="lead-form-section">
        <div className="container">
          <div className="form-container">
            <div className="form-header">
              <h2 className="form-title">Ready to Scale Your Coaching Business?</h2>
              <p className="form-subtitle">
                Join successful coaches worldwide. Book your free consultation and discover how we can help you 
                attract more clients and grow your practice.
              </p>
            </div>
            <LeadCaptureForm />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection />

      {/* Chatbot */}
      <Chatbot />
    </div>
  );
};

export default LandingPage;
