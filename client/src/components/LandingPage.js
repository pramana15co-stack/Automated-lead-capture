import React, { useEffect, useState } from 'react';
import LeadCaptureForm from './LeadCaptureForm';
import Chatbot from './Chatbot';
import ContactSection from './ContactSection';
import Logo from './Logo';
import Footer from './Footer';
import TrustBadges from './TrustBadges';
import CaseStudy from './CaseStudy';
// CSS imported in _app.js for Next.js compatibility

/**
 * Enhanced Professional Landing Page
 * Designed for freelancer portfolio showcase
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
            <Logo size="medium" />
            <div className="nav-links">
              <a href="#features" className="nav-link">Features</a>
              <a href="#testimonials" className="nav-link">Results</a>
              <a href="#portfolio" className="nav-link">Portfolio</a>
              <a href="#contact" className="nav-link">Contact</a>
              <button className="btn btn-nav" onClick={handleCTAClick}>
                Stop Missing Enquiries
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
              <span>🏆 Trusted by Service Businesses | Fast Setup in 3-5 Days</span>
            </div>
            <h1 className="hero-headline">
              Stop Missing Enquiries
              <span className="gradient-text"> with Smart Automation</span>
            </h1>
            <p className="hero-subheadline">
              Capture every lead instantly. Get WhatsApp alerts, AI voice confirmations, and automated follow-ups. 
              Never lose a hot lead again, even after business hours.
            </p>
            <div className="hero-cta-group">
              <button 
                className="btn btn-primary btn-large btn-pulse"
                onClick={handleCTAClick}
              >
                Book a 10-Min Demo
                <span className="btn-arrow">→</span>
              </button>
              <a href="#how-it-works" className="btn btn-secondary btn-large">
                See How Automation Works
              </a>
            </div>
          </div>
        </div>
        <div className="hero-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="trust-section">
        <div className="container">
          <div className="trust-logos">
            <div className="trust-logo-item">
              <div className="trust-icon">✅</div>
              <span>Production-Ready</span>
            </div>
            <div className="trust-logo-item">
              <div className="trust-icon">🔒</div>
              <span>Enterprise Security</span>
            </div>
            <div className="trust-logo-item">
              <div className="trust-icon">⚡</div>
              <span>Lightning Fast</span>
            </div>
            <div className="trust-logo-item">
              <div className="trust-icon">🌍</div>
              <span>Global Reach</span>
            </div>
            <div className="trust-logo-item">
              <div className="trust-icon">💼</div>
              <span>Business Grade</span>
            </div>
          </div>
        </div>
      </section>

      {/* How We Stop You Missing Enquiries */}
      <section id="how-it-works" className="enquiry-flow-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">How It Works</span>
            <h2 className="section-title">How We Stop You Missing Enquiries</h2>
            <p className="section-subtitle">
              A simple flow that ensures every enquiry gets attention, instantly
            </p>
          </div>
          <div className="flow-container">
            <div className="flow-step">
              <div className="flow-icon">🌐</div>
              <h3>Website Enquiry</h3>
              <p>Lead submits form on your website</p>
            </div>
            <div className="flow-arrow">→</div>
            <div className="flow-step">
              <div className="flow-icon">💬</div>
              <h3>Instant WhatsApp Alert</h3>
              <p>You get notified immediately on WhatsApp</p>
            </div>
            <div className="flow-arrow">→</div>
            <div className="flow-step flow-step-optional">
              <div className="flow-icon">📞</div>
              <h3>AI Voice Confirmation</h3>
              <p>Optional: AI calls to confirm serious enquiries</p>
            </div>
            <div className="flow-arrow">→</div>
            <div className="flow-step">
              <div className="flow-icon">👤</div>
              <h3>Human Callback</h3>
              <p>You or your team takes over for personal touch</p>
            </div>
            <div className="flow-arrow">→</div>
            <div className="flow-step">
              <div className="flow-icon">🔄</div>
              <h3>Automated Follow-ups</h3>
              <p>Smart reminders keep leads engaged</p>
            </div>
          </div>
        </div>
      </section>

      {/* Automation Channels Section */}
      <section className="automation-channels-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Our Capabilities</span>
            <h2 className="section-title">Automation Channels We Use</h2>
            <p className="section-subtitle">
              Multiple touchpoints to ensure no enquiry goes unnoticed
            </p>
          </div>
          <div className="channels-grid">
            <div className="channel-card">
              <div className="channel-icon">📧</div>
              <h3>Email Automation</h3>
              <p>Instant confirmations and scheduled follow-ups keep leads engaged</p>
            </div>
            <div className="channel-card">
              <div className="channel-icon">💬</div>
              <h3>WhatsApp Notifications & Follow-ups</h3>
              <p>Real-time alerts and automated messages for instant engagement</p>
            </div>
            <div className="channel-card">
              <div className="channel-icon">📞</div>
              <h3>AI Voice Call Automation</h3>
              <p>Instantly confirms serious enquiries so you never lose hot leads</p>
            </div>
            <div className="channel-card">
              <div className="channel-icon">📅</div>
              <h3>Smart Booking & Scheduling</h3>
              <p>Automated appointment booking that works 24/7</p>
            </div>
            <div className="channel-card">
              <div className="channel-icon">📊</div>
              <h3>Lead Tracking Dashboard</h3>
              <p>Complete visibility into every enquiry and follow-up status</p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Packages Section */}
      <section id="packages" className="packages-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Choose Your Plan</span>
            <h2 className="section-title">Service Packages</h2>
            <p className="section-subtitle">
              Select the automation level that fits your business needs
            </p>
          </div>
          <div className="packages-grid">
            <div className="package-card">
              <div className="package-header">
                <h3 className="package-name">CORE</h3>
              </div>
              <div className="package-features">
                <div className="package-feature">
                  <span className="feature-check">✓</span>
                  <span>Instant lead capture</span>
                </div>
                <div className="package-feature">
                  <span className="feature-check">✓</span>
                  <span>Email notifications</span>
                </div>
                <div className="package-feature">
                  <span className="feature-check">✓</span>
                  <span>AI chat assistant</span>
                </div>
                <div className="package-feature">
                  <span className="feature-check">✓</span>
                  <span>Lead dashboard</span>
                </div>
              </div>
              <button className="btn btn-package" onClick={handleCTAClick}>
                Get Started
              </button>
            </div>
            <div className="package-card package-card-popular">
              <div className="popular-badge">Most Popular</div>
              <div className="package-header">
                <h3 className="package-name">PRO</h3>
              </div>
              <div className="package-features">
                <div className="package-feature">
                  <span className="feature-check">✓</span>
                  <span>Everything in CORE</span>
                </div>
                <div className="package-feature">
                  <span className="feature-check">✓</span>
                  <span>WhatsApp alerts</span>
                </div>
                <div className="package-feature">
                  <span className="feature-check">✓</span>
                  <span>Booking integration</span>
                </div>
                <div className="package-feature">
                  <span className="feature-check">✓</span>
                  <span>After-hours auto responses</span>
                </div>
              </div>
              <button className="btn btn-package btn-package-primary" onClick={handleCTAClick}>
                Get Started
              </button>
            </div>
            <div className="package-card">
              <div className="package-header">
                <h3 className="package-name">PREMIUM</h3>
              </div>
              <div className="package-features">
                <div className="package-feature">
                  <span className="feature-check">✓</span>
                  <span>Everything in PRO</span>
                </div>
                <div className="package-feature">
                  <span className="feature-check">✓</span>
                  <span>AI voice call automation</span>
                </div>
                <div className="package-feature">
                  <span className="feature-check">✓</span>
                  <span>Smart lead routing</span>
                </div>
                <div className="package-feature">
                  <span className="feature-check">✓</span>
                  <span>Priority automation setup</span>
                </div>
              </div>
              <button className="btn btn-package" onClick={handleCTAClick}>
                Get Started
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Businesses Choose Pramana15 */}
      <section className="why-choose-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why Choose Us</span>
            <h2 className="section-title">Why Businesses Choose Pramana15</h2>
            <p className="section-subtitle">
              Built specifically for service businesses that can't afford to miss enquiries
            </p>
          </div>
          <div className="why-choose-grid">
            <div className="why-choose-item">
              <div className="why-choose-icon">🎯</div>
              <h3>Designed for Service Businesses</h3>
              <p>Every feature is built with service providers in mind</p>
            </div>
            <div className="why-choose-item">
              <div className="why-choose-icon">⚡</div>
              <h3>Fast Setup (3–5 Days)</h3>
              <p>Get up and running quickly without long delays</p>
            </div>
            <div className="why-choose-item">
              <div className="why-choose-icon">🚫</div>
              <h3>No Missed Enquiries</h3>
              <p>Multiple channels ensure every lead gets attention</p>
            </div>
            <div className="why-choose-item">
              <div className="why-choose-icon">🌙</div>
              <h3>Works After Business Hours</h3>
              <p>Automation handles enquiries even when you're offline</p>
            </div>
            <div className="why-choose-item">
              <div className="why-choose-icon">👥</div>
              <h3>Human Takeover Anytime</h3>
              <p>You stay in control and can step in whenever needed</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Complete Solution</span>
            <h2 className="section-title">Everything You Need in One System</h2>
            <p className="section-subtitle">
              A fully integrated platform designed by experienced developers. No technical knowledge required.
            </p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <div className="feature-icon">🚀</div>
              </div>
              <h3>Automated Lead Capture</h3>
              <p>Intelligent forms that capture every lead automatically. Integrated with Google Sheets for instant data storage. Never miss a potential client.</p>
              <ul className="feature-list">
                <li>Real-time validation</li>
                <li>Duplicate prevention</li>
                <li>Mobile-optimized</li>
              </ul>
            </div>
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <div className="feature-icon">📧</div>
              </div>
              <h3>Smart Email Automation</h3>
              <p>Send personalized confirmation emails, follow-ups, and notifications automatically. Professional HTML templates included.</p>
              <ul className="feature-list">
                <li>Instant confirmations</li>
                <li>Owner notifications</li>
                <li>Customizable templates</li>
              </ul>
            </div>
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <div className="feature-icon">🤖</div>
              </div>
              <h3>AI-Powered Chatbot</h3>
              <p>Intelligent chatbot powered by OpenAI GPT. Answers FAQs 24/7, engages visitors, and converts leads even when you're sleeping.</p>
              <ul className="feature-list">
                <li>OpenAI integration</li>
                <li>Smart fallbacks</li>
                <li>Rate limiting</li>
              </ul>
            </div>
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <div className="feature-icon">📊</div>
              </div>
              <h3>Analytics Dashboard</h3>
              <p>Beautiful admin dashboard to view all leads, track conversions, and analyze performance. Real-time updates included.</p>
              <ul className="feature-list">
                <li>Real-time data</li>
                <li>Export capabilities</li>
                <li>Search & filter</li>
              </ul>
            </div>
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <div className="feature-icon">🔐</div>
              </div>
              <h3>Enterprise Security</h3>
              <p>Production-grade security with input validation, rate limiting, error handling, and comprehensive logging. GDPR compliant.</p>
              <ul className="feature-list">
                <li>SSL encryption</li>
                <li>Data protection</li>
                <li>Secure APIs</li>
              </ul>
            </div>
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <div className="feature-icon">⚙️</div>
              </div>
              <h3>Easy Integration</h3>
              <p>Works seamlessly with Google Sheets, Gmail, and major email providers. One-click setup, no coding required.</p>
              <ul className="feature-list">
                <li>Google Sheets API</li>
                <li>SMTP compatible</li>
                <li>RESTful APIs</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio/Showcase Section */}
      <section id="portfolio" className="portfolio-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Our Work</span>
            <h2 className="section-title">Built for Real Businesses</h2>
            <p className="section-subtitle">
              Production-ready solutions trusted by coaches and businesses worldwide
            </p>
          </div>
          <div className="portfolio-grid">
            <div className="portfolio-card">
              <div className="portfolio-image">
                <div className="portfolio-placeholder">📈</div>
              </div>
              <div className="portfolio-content">
                <h3>Lead Capture System</h3>
                <p>Complete automation system with form validation, email automation, and Google Sheets integration.</p>
              </div>
            </div>
            <div className="portfolio-card">
              <div className="portfolio-image">
                <div className="portfolio-placeholder">🤖</div>
              </div>
              <div className="portfolio-content">
                <h3>AI Chatbot Integration</h3>
                <p>Intelligent chatbot with OpenAI GPT integration, rate limiting, and smart fallback responses.</p>
              </div>
            </div>
            <div className="portfolio-card">
              <div className="portfolio-image">
                <div className="portfolio-placeholder">📧</div>
              </div>
              <div className="portfolio-content">
                <h3>Email Automation</h3>
                <p>Professional email system with HTML templates, duplicate prevention, and SMTP integration.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why Choose Us</span>
            <h2 className="section-title">Professional Development Services</h2>
            <p className="section-subtitle">
              Built by experienced full-stack developers with a focus on quality and reliability
            </p>
          </div>
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">💻</div>
              <h3>Expert Development</h3>
              <p>Built by senior full-stack engineers with years of experience in production systems. Clean, maintainable, scalable code.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">✅</div>
              <h3>Production-Ready</h3>
              <p>Not a prototype. This is a complete, tested, production-ready system with error handling, logging, and monitoring.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">🔧</div>
              <h3>Fully Customizable</h3>
              <p>Easy to customize for your clients. Well-documented code, clear structure, and comprehensive setup guides.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">📚</div>
              <h3>Complete Documentation</h3>
              <p>Comprehensive documentation, setup guides, testing checklists, and deployment instructions included.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="testimonials">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Client Success</span>
            <h2 className="section-title">What Our Clients Say</h2>
            <p className="section-subtitle">
              Real results from businesses using our system
            </p>
          </div>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-content">
                <div className="stars">★★★★★</div>
                <p>"This system transformed my coaching business. The automation saves me 15+ hours weekly, and I've seen a 300% increase in lead conversions. The code quality is exceptional - clean, well-documented, and easy to customize."</p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">SM</div>
                <div className="author-info">
                  <div className="author-name">Sarah Mitchell</div>
                  <div className="author-title">Business Coach, London, UK</div>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-content">
                <div className="stars">★★★★★</div>
                <p>"As a freelancer, I've used this system for multiple clients. It's production-ready, reliable, and impresses every client. The documentation is thorough, and the code is professional-grade. Highly recommend!"</p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">JD</div>
                <div className="author-info">
                  <div className="author-name">James Davis</div>
                  <div className="author-title">Freelance Developer, New York, USA</div>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-content">
                <div className="stars">★★★★★</div>
                <p>"The best investment I've made. The system works flawlessly, captures leads 24/7, and the AI chatbot handles most inquiries automatically. My conversion rate increased dramatically, and I'm now working with clients from 8 different countries!"</p>
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

      {/* Case Study Section */}
      <CaseStudy />


      {/* Lead Capture Form Section */}
      <section id="lead-form" className="lead-form-section">
        <div className="container">
          <div className="form-container">
            <div className="form-header">
              <span className="section-label">Get Started</span>
              <h2 className="form-title">Stop Missing Enquiries</h2>
              <p className="form-subtitle">
                Book a 10-minute demo and see how automation can transform your lead handling. 
                Fast setup, no missed opportunities, works 24/7.
              </p>
            </div>
            <LeadCaptureForm />
          </div>
        </div>
      </section>

      {/* Trust Badges Section */}
      <TrustBadges />

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <Footer />

      {/* Chatbot */}
      <Chatbot />
    </div>
  );
};

export default LandingPage;
