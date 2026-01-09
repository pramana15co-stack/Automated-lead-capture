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
  const [currency, setCurrency] = useState('USD');

  useEffect(() => {
    setIsVisible(true);
    
    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('.animate-on-scroll');
    sections.forEach(section => observer.observe(section));

    return () => {
      sections.forEach(section => observer.unobserve(section));
    };
  }, []);

  const pricing = {
    USD: {
      setup: { min: 1000, max: 1300 },
      support: 130
    },
    AUD: {
      setup: { min: 1500, max: 2000 },
      support: 200
    }
  };

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
              <a href="#contact" className="nav-link">Contact</a>
              <button className="btn btn-nav" onClick={handleCTAClick}>
                Request a Walkthrough
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
              <span>Professional automation systems for service businesses</span>
            </div>
            <h1 className="hero-headline">
              Automation systems that ensure
              <span className="gradient-text"> no enquiry goes unanswered</span>
            </h1>
            <p className="hero-subheadline">
              We design response and follow-up systems for businesses that rely on incoming enquiries.
            </p>
            <div className="hero-cta-group">
              <button 
                className="btn btn-primary btn-large btn-pulse"
                onClick={handleCTAClick}
              >
                Request a Walkthrough
                <span className="btn-arrow">→</span>
              </button>
              <a href="#how-it-works" className="btn btn-secondary btn-large">
                See How It Works
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

      {/* What We Do Section */}
      <section id="what-we-do" className="what-we-do-section animate-on-scroll">
        <div className="container">
          <div className="section-header">
            <span className="section-label">What We Do</span>
            <h2 className="section-title">What We Do</h2>
            <p className="section-subtitle">
              We help businesses respond faster to website enquiries by combining instant acknowledgement, automated follow-ups, and clear handover to human teams.
            </p>
          </div>
          <div className="what-we-do-grid">
            <div className="what-we-do-item">
              <div className="what-we-do-icon">✓</div>
              <h3>Instant enquiry acknowledgement</h3>
            </div>
            <div className="what-we-do-item">
              <div className="what-we-do-icon">✓</div>
              <h3>Smart notifications to your team</h3>
            </div>
            <div className="what-we-do-item">
              <div className="what-we-do-icon">✓</div>
              <h3>Automated follow-ups</h3>
            </div>
            <div className="what-we-do-item">
              <div className="what-we-do-icon">✓</div>
              <h3>Optional voice confirmation</h3>
            </div>
            <div className="what-we-do-item">
              <div className="what-we-do-icon">✓</div>
              <h3>Human takeover at any time</h3>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="enquiry-flow-section animate-on-scroll">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Process</span>
            <h2 className="section-title">How It Works</h2>
            <p className="section-subtitle">
              A streamlined process that ensures every enquiry receives immediate attention and proper follow-up
            </p>
          </div>
          <div className="flow-container">
            <div className="flow-step flow-step-detailed">
              <div className="flow-icon">1</div>
              <h3>Enquiry Submission</h3>
              <p>Someone fills out your contact form or submits an enquiry through your website. The system captures all details instantly.</p>
            </div>
            <div className="flow-arrow">→</div>
            <div className="flow-step flow-step-detailed">
              <div className="flow-icon">2</div>
              <h3>Instant Acknowledgement</h3>
              <p>The enquiry receives an immediate automated confirmation. The person knows their message was received and will be handled.</p>
            </div>
            <div className="flow-arrow">→</div>
            <div className="flow-step flow-step-detailed">
              <div className="flow-icon">3</div>
              <h3>Team Notification</h3>
              <p>Your team is notified immediately via email and WhatsApp (if enabled). You know about the enquiry within seconds, not hours.</p>
            </div>
            <div className="flow-arrow">→</div>
            <div className="flow-step flow-step-detailed">
              <div className="flow-icon">4</div>
              <h3>Automated Follow-ups</h3>
              <p>If no response is needed immediately, the system automatically sends follow-up messages at optimal intervals to keep the enquiry warm.</p>
            </div>
            <div className="flow-arrow">→</div>
            <div className="flow-step flow-step-detailed">
              <div className="flow-icon">5</div>
              <h3>Human Handover</h3>
              <p>Your team steps in at the right moment to have a personal conversation and close the deal. Automation handles the routine; you handle the relationship.</p>
            </div>
          </div>
          <div className="flow-benefits">
            <div className="flow-benefit">
              <div className="flow-benefit-icon">⚡</div>
              <h4>Instant Response</h4>
              <p>Enquiries are acknowledged within seconds</p>
            </div>
            <div className="flow-benefit">
              <div className="flow-benefit-icon">🔄</div>
              <h4>Never Miss</h4>
              <p>Multiple notification channels ensure visibility</p>
            </div>
            <div className="flow-benefit">
              <div className="flow-benefit-icon">🤝</div>
              <h4>Human Touch</h4>
              <p>Automation handles routine; you handle relationships</p>
            </div>
          </div>
        </div>
      </section>

      {/* Automation Channels Section */}
      <section className="automation-channels-section animate-on-scroll">
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

      {/* Who This Is For Section */}
      <section className="who-this-is-for-section animate-on-scroll">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Ideal Clients</span>
            <h2 className="section-title">Who This Is For</h2>
            <p className="section-subtitle">
              Our automation systems are designed for businesses that need reliable, fast response systems without complex infrastructure
            </p>
          </div>
          <div className="who-this-is-for-grid">
            <div className="who-this-is-for-column">
              <div className="who-this-is-for-icon">✓</div>
              <h3 className="who-this-is-for-heading">Best suited for:</h3>
              <p className="who-this-is-for-description">
                Service-based businesses that depend on incoming enquiries to generate revenue. Our systems work exceptionally well for:
              </p>
              <ul className="who-this-is-for-list">
                <li><strong>Service businesses</strong> – Consultants, coaches, agencies, and professional service providers who need to respond quickly to enquiries</li>
                <li><strong>Local businesses</strong> – Companies serving specific geographic areas where fast response times create competitive advantage</li>
                <li><strong>Small to medium teams</strong> – Businesses with 1-20 employees where every enquiry matters and automation multiplies team capacity</li>
                <li><strong>Businesses with enquiry-driven revenue</strong> – Companies where each lead directly impacts revenue and response speed affects conversion</li>
              </ul>
            </div>
            <div className="who-this-is-for-column">
              <div className="who-this-is-for-icon">ℹ</div>
              <h3 className="who-this-is-for-heading">Not ideal for:</h3>
              <p className="who-this-is-for-description">
                Our systems are optimized for simplicity and speed. They may not be the best fit if you need:
              </p>
              <ul className="who-this-is-for-list">
                <li><strong>Large enterprises</strong> – Companies with 500+ employees typically need more complex, integrated CRM solutions</li>
                <li><strong>Complex internal systems</strong> – Businesses with extensive existing CRM infrastructure may require custom enterprise solutions</li>
                <li><strong>High-volume transactional businesses</strong> – Companies processing thousands of automated transactions per day may need more robust systems</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="packages-section animate-on-scroll">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Pricing</span>
            <h2 className="section-title">Automation Setup</h2>
            <p className="section-subtitle">
              Final pricing depends on complexity and is confirmed after a short walkthrough.
            </p>
          </div>
          <div className="pricing-currency-toggle">
            <button 
              className={`currency-btn ${currency === 'USD' ? 'active' : ''}`}
              onClick={() => setCurrency('USD')}
            >
              USD ($)
            </button>
            <button 
              className={`currency-btn ${currency === 'AUD' ? 'active' : ''}`}
              onClick={() => setCurrency('AUD')}
            >
              AUD ($)
            </button>
          </div>
          <div className="packages-grid">
            <div className="package-card package-card-animated">
              <div className="package-header">
                <h3 className="package-name">Automation Setup</h3>
                <div className="package-price">
                  <span className="price-amount">
                    {currency} {pricing[currency].setup.min.toLocaleString()} – {pricing[currency].setup.max.toLocaleString()}
                  </span>
                  <span className="price-period">one-time</span>
                </div>
              </div>
              <div className="package-features">
                <div className="package-feature">
                  <span className="feature-check">✓</span>
                  <span>Setup of response automation</span>
                </div>
                <div className="package-feature">
                  <span className="feature-check">✓</span>
                  <span>Notification workflows</span>
                </div>
                <div className="package-feature">
                  <span className="feature-check">✓</span>
                  <span>Follow-up logic</span>
                </div>
                <div className="package-feature">
                  <span className="feature-check">✓</span>
                  <span>Deployment and testing</span>
                </div>
              </div>
              <button className="btn btn-package" onClick={handleCTAClick}>
                Request a Walkthrough
              </button>
            </div>
            <div className="package-card package-card-animated">
              <div className="package-header">
                <h3 className="package-name">Ongoing Support (Optional)</h3>
                <div className="package-price">
                  <span className="price-amount">
                    {currency} {pricing[currency].support.toLocaleString()}
                  </span>
                  <span className="price-period">/ month</span>
                </div>
              </div>
              <div className="package-features">
                <div className="package-feature">
                  <span className="feature-check">✓</span>
                  <span>Monitoring</span>
                </div>
                <div className="package-feature">
                  <span className="feature-check">✓</span>
                  <span>Minor adjustments</span>
                </div>
                <div className="package-feature">
                  <span className="feature-check">✓</span>
                  <span>Reliability checks</span>
                </div>
                <div className="package-feature">
                  <span className="feature-check">✓</span>
                  <span>Priority support</span>
                </div>
              </div>
              <button className="btn btn-package" onClick={handleCTAClick}>
                Request a Walkthrough
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Businesses Choose Pramana15 */}
      <section className="why-choose-section animate-on-scroll">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why Choose Us</span>
            <h2 className="section-title">Why Businesses Choose Pramana15</h2>
            <p className="section-subtitle">
              We focus on what matters: ensuring no enquiry goes unanswered and your team can respond faster than competitors
            </p>
          </div>
          <div className="why-choose-grid">
            <div className="why-choose-item">
              <div className="why-choose-icon">🎯</div>
              <h3>Purpose-Built for Service Businesses</h3>
              <p>Every feature addresses real challenges service providers face: fast response times, after-hours coverage, and ensuring no enquiry falls through the cracks. We understand your business model.</p>
            </div>
            <div className="why-choose-item">
              <div className="why-choose-icon">⚡</div>
              <h3>Fast Setup, Quick Results</h3>
              <p>Most systems are operational within 3-5 days. No months-long implementations. We focus on getting you value quickly, not on complex configurations that delay your results.</p>
            </div>
            <div className="why-choose-item">
              <div className="why-choose-icon">🔄</div>
              <h3>Multiple Notification Channels</h3>
              <p>Email, WhatsApp, and optional voice calls ensure your team is notified through the channels they actually use. No single point of failure—if one channel is down, others still work.</p>
            </div>
            <div className="why-choose-item">
              <div className="why-choose-icon">🌙</div>
              <h3>24/7 Enquiry Handling</h3>
              <p>Automation works when you don't. Enquiries submitted at 2 AM are acknowledged immediately and your team is notified. No more "we'll get back to you tomorrow" delays that lose business.</p>
            </div>
            <div className="why-choose-item">
              <div className="why-choose-icon">🤝</div>
              <h3>Human Control, Always</h3>
              <p>Automation handles routine tasks, but you're always in control. Step in at any time, override automated responses, and maintain the personal touch that builds relationships.</p>
            </div>
            <div className="why-choose-item">
              <div className="why-choose-icon">📊</div>
              <h3>Complete Visibility</h3>
              <p>See every enquiry, track response times, and understand what's working. Simple dashboards show you what matters without overwhelming complexity.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features animate-on-scroll">
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
              <h2 className="form-title">Request a Walkthrough</h2>
              <p className="form-subtitle">
                See how our automation systems can help ensure no enquiry goes unanswered. 
                We'll show you the system and discuss your specific needs.
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
