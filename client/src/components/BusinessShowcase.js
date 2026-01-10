import React, { useEffect, useState } from 'react';
import Logo from './Logo';
import Footer from './Footer';
import './BusinessShowcase.css';

/**
 * Business Showcase Home Page
 * Displays different business types we can help with automation
 */
const BusinessShowcase = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const businessTypes = [
    {
      id: 'dental-clinic',
      title: 'Dental Clinics',
      icon: '🦷',
      description: 'Never miss a patient enquiry. Automate appointment bookings, follow-ups, and patient communication 24/7.',
      problems: [
        'Missed calls after hours',
        'No-shows and last-minute cancellations',
        'Manual appointment scheduling',
        'Lost patient enquiries'
      ],
      solutions: [
        '24/7 automated enquiry response',
        'Smart appointment booking system',
        'Automated reminders and follow-ups',
        'Multi-channel lead capture'
      ],
      pricing: {
        setup: { min: 1200, max: 1500 },
        monthly: 150
      }
    },
    {
      id: 'real-estate',
      title: 'Real Estate Agencies',
      icon: '🏠',
      description: 'Capture and nurture every property enquiry instantly. Automate lead qualification, follow-ups, and client communication.',
      problems: [
        'Hot leads going cold',
        'Missing enquiries on weekends',
        'Manual lead qualification',
        'Inefficient follow-up process'
      ],
      solutions: [
        'Instant enquiry response system',
        'Automated lead qualification',
        'Smart follow-up sequences',
        'Property viewing scheduler'
      ],
      pricing: {
        setup: { min: 1500, max: 2000 },
        monthly: 180
      }
    },
    {
      id: 'business-coach',
      title: 'Business Coaches',
      icon: '💼',
      description: 'Scale your coaching business with automated client onboarding, session booking, and follow-up systems.',
      problems: [
        'Manual client onboarding',
        'Missed discovery calls',
        'No automated follow-ups',
        'Difficulty scaling operations'
      ],
      solutions: [
        'Automated discovery call booking',
        'Client onboarding automation',
        'Session reminder system',
        'Lead nurturing sequences'
      ],
      pricing: {
        setup: { min: 1000, max: 1300 },
        monthly: 130
      }
    },
    {
      id: 'service-business',
      title: 'Service Businesses',
      icon: '🔧',
      description: 'Perfect for consultants, agencies, and professional services. Automate enquiries, quotes, and client communication.',
      problems: [
        'Enquiries not answered quickly',
        'Manual quote generation',
        'Lost leads',
        'Inefficient client communication'
      ],
      solutions: [
        'Instant enquiry capture',
        'Automated quote system',
        'Multi-channel response',
        'Client communication automation'
      ],
      pricing: {
        setup: { min: 1000, max: 1500 },
        monthly: 140
      }
    }
  ];

  return (
    <div className="business-showcase">
      {/* Navigation */}
      <nav className="showcase-navbar">
        <div className="container">
          <div className="nav-content">
            <Logo size="medium" />
            <div className="nav-links">
              <a href="#how-it-works" className="nav-link">How It Works</a>
              <a href="#demo" className="nav-link">See Demo</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className={`showcase-hero ${isVisible ? 'fade-in' : ''}`}>
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <span>Demo Website - Showcasing Our Automation Capabilities</span>
            </div>
            <h1 className="hero-headline">
              We Build Custom Automation Systems
              <span className="gradient-text"> for Your Business</span>
            </h1>
            <p className="hero-subheadline">
              This is a demo website showcasing what we can build for you. 
              Select your business type below to see a tailored automation solution with live demos.
            </p>
            <div className="demo-notice">
              <strong>🎯 This is a Demo:</strong> All forms, chatbots, and automation systems shown here are working examples of what we can build for your business.
            </div>
          </div>
        </div>
      </section>

      {/* Business Types Grid */}
      <section className="business-types-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Choose Your Business Type</span>
            <h2 className="section-title">See How We Can Help Your Business</h2>
            <p className="section-subtitle">
              Each page below shows a complete automation system tailored to that business type, 
              including live demo forms and chatbots.
            </p>
          </div>

          <div className="business-types-grid">
            {businessTypes.map((business, index) => (
              <a 
                href={`/${business.id}`} 
                key={business.id}
                className="business-type-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="business-icon">{business.icon}</div>
                <h3>{business.title}</h3>
                <p className="business-description">{business.description}</p>
                
                <div className="business-problems">
                  <h4>Common Problems:</h4>
                  <ul>
                    {business.problems.map((problem, i) => (
                      <li key={i}>{problem}</li>
                    ))}
                  </ul>
                </div>

                <div className="business-solutions">
                  <h4>Our Solutions:</h4>
                  <ul>
                    {business.solutions.map((solution, i) => (
                      <li key={i}>✓ {solution}</li>
                    ))}
                  </ul>
                </div>

                <div className="business-pricing-preview">
                  <div className="pricing-info">
                    <span className="price-label">Setup:</span>
                    <span className="price-value">${business.pricing.setup.min} - ${business.pricing.setup.max}</span>
                  </div>
                  <div className="pricing-info">
                    <span className="price-label">Monthly:</span>
                    <span className="price-value">${business.pricing.monthly}</span>
                  </div>
                </div>

                <div className="view-demo-btn">
                  View Demo →
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="how-it-works-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">How It Works</span>
            <h2 className="section-title">What You'll See in Each Demo</h2>
            <p className="section-subtitle">
              Every business-specific page includes working examples of our automation systems
            </p>
          </div>

          <div className="demo-features-grid">
            <div className="demo-feature">
              <div className="demo-feature-icon">📋</div>
              <h3>Live Demo Form</h3>
              <p>A fully functional lead capture form tailored to your business type. See how enquiries are captured and processed instantly.</p>
            </div>
            <div className="demo-feature">
              <div className="demo-feature-icon">🤖</div>
              <h3>AI Chatbot Demo</h3>
              <p>An intelligent chatbot that answers common questions 24/7. This is exactly what we can build for your website.</p>
            </div>
            <div className="demo-feature">
              <div className="demo-feature-icon">📧</div>
              <h3>Automated Responses</h3>
              <p>See how enquiries trigger instant automated emails and notifications, ensuring no lead goes unanswered.</p>
            </div>
            <div className="demo-feature">
              <div className="demo-feature-icon">📊</div>
              <h3>Lead Management</h3>
              <p>All captured leads are automatically organized and tracked in a centralized system for easy follow-up.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to See Your Custom Solution?</h2>
            <p>Choose a business type above to see a complete automation system tailored to your industry.</p>
            <p className="cta-note">
              <strong>Remember:</strong> This entire website is a demo of our capabilities. 
              We can build a similar system specifically for your business.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BusinessShowcase;

