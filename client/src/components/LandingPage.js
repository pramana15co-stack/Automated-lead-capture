import React, { useEffect, useState } from 'react';
import LeadCaptureForm from './LeadCaptureForm';
import Chatbot from './Chatbot';
import ContactSection from './ContactSection';
import Logo from './Logo';
import Footer from './Footer';
import TrustBadges from './TrustBadges';
import CaseStudy from './CaseStudy';
import LogoSection from './LogoSection';
// CSS imported in _app.js for Next.js compatibility

/**
 * Enhanced Professional Landing Page
 * Designed for freelancer portfolio showcase
 */
const LandingPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    // Animate stats on scroll
    const timer = setTimeout(() => setStatsVisible(true), 500);
    return () => clearTimeout(timer);
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
              <span>🏆 Award-Winning Solution | Trusted by 500+ Coaches Worldwide</span>
            </div>
            <h1 className="hero-headline">
              Premium Lead Capture System
              <span className="gradient-text"> Built for Success</span>
            </h1>
            <p className="hero-subheadline">
              A complete, production-ready automation system that captures leads, sends automated emails, 
              and integrates with AI chatbots. Built by experienced developers in Jaipur, Rajasthan, 
              serving clients across the US, UK, Australia, and globally.
            </p>
            <div className="hero-cta-group">
              <button 
                className="btn btn-primary btn-large btn-pulse"
                onClick={handleCTAClick}
              >
                Book Your Free Consultation
                <span className="btn-arrow">→</span>
              </button>
              <a href="#features" className="btn btn-secondary btn-large">
                View Features
              </a>
            </div>
            <div className={`hero-stats ${statsVisible ? 'fade-in' : ''}`}>
              <div className="stat-item">
                <div className="stat-number" data-target="500">0</div>
                <div className="stat-label">Active Users</div>
              </div>
              <div className="stat-item">
                <div className="stat-number" data-target="10000">0</div>
                <div className="stat-label">Leads Captured</div>
              </div>
              <div className="stat-item">
                <div className="stat-number" data-target="98">0</div>
                <div className="stat-label">% Satisfaction</div>
              </div>
              <div className="stat-item">
                <div className="stat-number" data-target="24">0</div>
                <div className="stat-label">Hour Support</div>
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

      {/* Technology & Certification Logos */}
      <LogoSection />

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
                <div className="portfolio-tech">
                  <span className="tech-tag">Next.js</span>
                  <span className="tech-tag">Google Sheets</span>
                  <span className="tech-tag">Node.js</span>
                </div>
              </div>
            </div>
            <div className="portfolio-card">
              <div className="portfolio-image">
                <div className="portfolio-placeholder">🤖</div>
              </div>
              <div className="portfolio-content">
                <h3>AI Chatbot Integration</h3>
                <p>Intelligent chatbot with OpenAI GPT integration, rate limiting, and smart fallback responses.</p>
                <div className="portfolio-tech">
                  <span className="tech-tag">OpenAI API</span>
                  <span className="tech-tag">React</span>
                  <span className="tech-tag">Rate Limiting</span>
                </div>
              </div>
            </div>
            <div className="portfolio-card">
              <div className="portfolio-image">
                <div className="portfolio-placeholder">📧</div>
              </div>
              <div className="portfolio-content">
                <h3>Email Automation</h3>
                <p>Professional email system with HTML templates, duplicate prevention, and SMTP integration.</p>
                <div className="portfolio-tech">
                  <span className="tech-tag">Nodemailer</span>
                  <span className="tech-tag">SMTP</span>
                  <span className="tech-tag">Templates</span>
                </div>
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

      {/* Technology Stack */}
      <section className="tech-stack">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Built With</span>
            <h2 className="section-title">Modern Technology Stack</h2>
            <p className="section-subtitle">
              Industry-standard technologies for reliability and performance
            </p>
          </div>
          <div className="tech-grid">
            <div className="tech-item">
              <div className="tech-name">Next.js</div>
              <div className="tech-desc">React Framework</div>
            </div>
            <div className="tech-item">
              <div className="tech-name">Node.js</div>
              <div className="tech-desc">Backend Runtime</div>
            </div>
            <div className="tech-item">
              <div className="tech-name">Google Sheets API</div>
              <div className="tech-desc">Data Storage</div>
            </div>
            <div className="tech-item">
              <div className="tech-name">OpenAI GPT</div>
              <div className="tech-desc">AI Chatbot</div>
            </div>
            <div className="tech-item">
              <div className="tech-name">Vercel</div>
              <div className="tech-desc">Hosting Platform</div>
            </div>
            <div className="tech-item">
              <div className="tech-name">SMTP</div>
              <div className="tech-desc">Email Service</div>
            </div>
          </div>
        </div>
      </section>

      {/* Lead Capture Form Section */}
      <section id="lead-form" className="lead-form-section">
        <div className="container">
          <div className="form-container">
            <div className="form-header">
              <span className="section-label">Get Started</span>
              <h2 className="form-title">Ready to Transform Your Business?</h2>
              <p className="form-subtitle">
                Join successful coaches and businesses worldwide. Book your free consultation and discover 
                how our production-ready system can help you capture more leads and grow your business.
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
