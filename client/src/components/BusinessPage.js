import React, { useEffect, useState } from 'react';
import Logo from './Logo';
import Footer from './Footer';
import BusinessLeadForm from './BusinessLeadForm';
import BusinessChatbot from './BusinessChatbot';
// CSS imported in _app.js for Next.js compatibility

/**
 * Reusable Business Page Component
 * Shows tailored content, pricing, demo form, and chatbot for specific business types
 */
const BusinessPage = ({ businessConfig }) => {
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

    const sections = document.querySelectorAll('.animate-on-scroll');
    sections.forEach(section => observer.observe(section));

    return () => {
      sections.forEach(section => observer.unobserve(section));
    };
  }, []);

  const pricing = businessConfig.pricing[currency] || businessConfig.pricing.USD;

  return (
    <div className="business-page">
      {/* Navigation */}
      <nav className="business-navbar">
        <div className="container">
          <div className="nav-content">
            <a href="/">
              <Logo size="medium" />
            </a>
            <div className="nav-links">
              <a href="#demo" className="nav-link">Try Demo</a>
              <a href="#pricing" className="nav-link">Pricing</a>
              <a href="#how-it-works" className="nav-link">How It Works</a>
              <button 
                className="btn btn-nav" 
                onClick={() => {
                  const formElement = document.getElementById('demo-form');
                  if (formElement) {
                    formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className={`business-hero ${isVisible ? 'fade-in' : ''}`}>
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <span>🎯 Demo Website - Live Automation System</span>
            </div>
            <div className="hero-icon">{businessConfig.icon}</div>
            <h1 className="hero-headline">
              {businessConfig.heroTitle}
            </h1>
            <p className="hero-subheadline">
              {businessConfig.heroDescription}
            </p>
            <div className="demo-notice">
              <strong>This is a working demo:</strong> The form and chatbot below are fully functional examples of what we can build for your {businessConfig.businessType} business.
            </div>
          </div>
        </div>
      </section>

      {/* Problems Section */}
      <section className="problems-section animate-on-scroll">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Common Challenges</span>
            <h2 className="section-title">Problems {businessConfig.businessType} Businesses Face</h2>
          </div>
          <div className="problems-grid">
            {businessConfig.problems.map((problem, index) => (
              <div key={index} className="problem-card">
                <div className="problem-icon">⚠️</div>
                <h3>{problem.title}</h3>
                <p>{problem.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="solutions-section animate-on-scroll">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Our Solutions</span>
            <h2 className="section-title">How We Help {businessConfig.businessType} Businesses</h2>
          </div>
          <div className="solutions-grid">
            {businessConfig.solutions.map((solution, index) => (
              <div key={index} className="solution-card">
                <div className="solution-icon">✓</div>
                <h3>{solution.title}</h3>
                <p>{solution.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="how-it-works-section animate-on-scroll">
        <div className="container">
          <div className="section-header">
            <span className="section-label">How It Works</span>
            <h2 className="section-title">Your Automation System in Action</h2>
            <p className="section-subtitle">
              See how enquiries are captured, processed, and responded to automatically
            </p>
          </div>
          <div className="workflow-steps">
            {businessConfig.workflow.map((step, index) => (
              <div key={index} className="workflow-step">
                <div className="step-number">{index + 1}</div>
                <div className="step-content">
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
                {index < businessConfig.workflow.length - 1 && (
                  <div className="step-arrow">→</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="demo-section animate-on-scroll">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Live Demo</span>
            <h2 className="section-title">Try Our Automation System</h2>
            <p className="section-subtitle">
              Fill out the form below to see how enquiries are captured and processed instantly. 
              This is a working demo - your submission will be received and processed automatically.
            </p>
          </div>
          <div className="demo-container">
            <div className="demo-form-wrapper">
              <h3>📋 Lead Capture Form Demo</h3>
              <p className="demo-description">
                This form is tailored for {businessConfig.businessType} businesses. 
                Submit it to see how enquiries are automatically captured and processed.
              </p>
              <div id="demo-form">
                <BusinessLeadForm businessType={businessConfig.id} config={businessConfig.formConfig} />
              </div>
            </div>
            <div className="demo-chatbot-wrapper">
              <h3>🤖 AI Chatbot Demo</h3>
              <p className="demo-description">
                Click the chat icon in the bottom right to interact with our AI chatbot. 
                It can answer questions about {businessConfig.businessType} automation 24/7.
              </p>
              <BusinessChatbot businessType={businessConfig.id} config={businessConfig.chatbotConfig} />
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="pricing-section animate-on-scroll">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Pricing</span>
            <h2 className="section-title">Simple, Transparent Pricing</h2>
            <p className="section-subtitle">
              One-time setup fee + affordable monthly support
            </p>
          </div>
          <div className="currency-toggle">
            <button
              className={`currency-btn ${currency === 'USD' ? 'active' : ''}`}
              onClick={() => setCurrency('USD')}
            >
              USD
            </button>
            <button
              className={`currency-btn ${currency === 'AUD' ? 'active' : ''}`}
              onClick={() => setCurrency('AUD')}
            >
              AUD
            </button>
          </div>
          <div className="pricing-card">
            <div className="pricing-header">
              <h3>Complete Automation System</h3>
              <p>Everything you need to never miss an enquiry</p>
            </div>
            <div className="pricing-details">
              <div className="pricing-item">
                <span className="pricing-label">One-Time Setup</span>
                <span className="pricing-value">
                  ${pricing.setup.min} - ${pricing.setup.max}
                </span>
                <span className="pricing-note">Includes system design, development, and deployment</span>
              </div>
              <div className="pricing-item">
                <span className="pricing-label">Monthly Support</span>
                <span className="pricing-value">${pricing.monthly}</span>
                <span className="pricing-note">Ongoing maintenance, updates, and support</span>
              </div>
            </div>
            <div className="pricing-features">
              <h4>What's Included:</h4>
              <ul>
                {businessConfig.pricingFeatures.map((feature, index) => (
                  <li key={index}>✓ {feature}</li>
                ))}
              </ul>
            </div>
            <button 
              className="btn btn-primary btn-large"
              onClick={() => {
                const formElement = document.getElementById('demo-form');
                if (formElement) {
                  formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
            >
              Get Started Now
            </button>
          </div>
        </div>
      </section>

      {/* What's Next Section */}
      <section id="whats-next" className="whats-next-section animate-on-scroll">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Next Steps</span>
            <h2 className="section-title">What Happens After You Submit the Form?</h2>
            <p className="section-subtitle">
              Here's exactly what happens when you request a custom automation system for your {businessConfig.businessType} business
            </p>
          </div>

          <div className="next-steps-grid">
            <div className="next-step-card">
              <div className="step-number-badge">1</div>
              <h3>We Receive Your Enquiry</h3>
              <p>Your form submission is instantly captured and sent to our team. You'll receive an automated confirmation email.</p>
            </div>
            <div className="next-step-card">
              <div className="step-number-badge">2</div>
              <h3>Initial Review (Within 24 Hours)</h3>
              <p>Our team reviews your requirements and prepares a personalized response with relevant questions about your business.</p>
            </div>
            <div className="next-step-card">
              <div className="step-number-badge">3</div>
              <h3>Free Consultation Call</h3>
              <p>We'll schedule a 30-minute call to understand your current processes, pain points, and automation goals in detail.</p>
            </div>
            <div className="next-step-card">
              <div className="step-number-badge">4</div>
              <h3>Custom Proposal</h3>
              <p>Within 2-3 days, we'll send you a detailed proposal outlining the exact automation system we'll build, timeline, and pricing.</p>
            </div>
            <div className="next-step-card">
              <div className="step-number-badge">5</div>
              <h3>Approval & Setup</h3>
              <p>Once you approve, we'll begin building your custom system. Setup typically takes 3-5 business days.</p>
            </div>
            <div className="next-step-card">
              <div className="step-number-badge">6</div>
              <h3>Launch & Support</h3>
              <p>We'll deploy your system, provide training, and offer ongoing support to ensure everything runs smoothly.</p>
            </div>
          </div>

          <div className="contact-info-box">
            <h3>📧 Have Questions? Contact Us Directly</h3>
            <p>Prefer to discuss your needs before filling out the form? Reach out to us:</p>
            <div className="contact-details">
              <a href="mailto:pramana15@pramana15.com" className="contact-link">
                📧 pramana15@pramana15.com
              </a>
            </div>
            <p className="contact-note">
              <strong>Response Time:</strong> We respond to all enquiries within 24 hours during business days (Monday-Friday).
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section animate-on-scroll">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Automate Your {businessConfig.businessType} Business?</h2>
            <p>This entire page is a demo of what we can build for you. Fill out the form above to get started.</p>
            <button 
              className="btn btn-primary btn-large"
              onClick={() => {
                const formElement = document.getElementById('demo-form');
                if (formElement) {
                  formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
            >
              Fill Out the Form Above →
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BusinessPage;

