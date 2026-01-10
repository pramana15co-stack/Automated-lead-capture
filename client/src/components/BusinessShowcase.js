import React, { useEffect, useState } from 'react';
import Logo from './Logo';
import Footer from './Footer';
// CSS imported in _app.js for Next.js compatibility

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
    },
    {
      id: 'law-firm',
      title: 'Law Firms',
      icon: '⚖️',
      description: 'Never miss a potential client. Automate intake forms, consultation scheduling, and client follow-ups.',
      problems: [
        'Missed consultation requests',
        'Manual intake process',
        'No follow-up system',
        'Lost potential clients'
      ],
      solutions: [
        'Automated consultation booking',
        'Client intake automation',
        'Follow-up sequences',
        'Multi-channel enquiry capture'
      ],
      pricing: {
        setup: { min: 1500, max: 2000 },
        monthly: 180
      }
    },
    {
      id: 'medical-practice',
      title: 'Medical Practices',
      icon: '🏥',
      description: 'Streamline patient communication. Automate appointment scheduling, reminders, and patient enquiries.',
      problems: [
        'Missed patient calls',
        'No-show appointments',
        'Manual scheduling',
        'Inefficient patient communication'
      ],
      solutions: [
        '24/7 automated response',
        'Online appointment booking',
        'Automated reminders',
        'Patient enquiry management'
      ],
      pricing: {
        setup: { min: 1300, max: 1700 },
        monthly: 160
      }
    },
    {
      id: 'fitness-studio',
      title: 'Fitness Studios',
      icon: '💪',
      description: 'Grow your membership base. Automate class bookings, trial sign-ups, and member communication.',
      problems: [
        'Missed class bookings',
        'No trial sign-up system',
        'Manual member communication',
        'Lost potential members'
      ],
      solutions: [
        'Automated class booking',
        'Trial sign-up automation',
        'Member communication system',
        'Lead nurturing sequences'
      ],
      pricing: {
        setup: { min: 1100, max: 1400 },
        monthly: 145
      }
    },
    {
      id: 'beauty-salon',
      title: 'Beauty Salons',
      icon: '💅',
      description: 'Book more appointments automatically. Streamline booking, reminders, and client communication.',
      problems: [
        'Missed booking calls',
        'Last-minute cancellations',
        'No reminder system',
        'Lost client enquiries'
      ],
      solutions: [
        'Online booking system',
        'Automated reminders',
        'Client communication automation',
        'Multi-channel booking'
      ],
      pricing: {
        setup: { min: 1000, max: 1300 },
        monthly: 135
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

      {/* What's Next Section */}
      <section id="whats-next" className="whats-next-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Get Started</span>
            <h2 className="section-title">What Happens Next?</h2>
            <p className="section-subtitle">
              Here's exactly what to do if you like our work and want us to build a custom automation system for your business
            </p>
          </div>

          <div className="next-steps-grid">
            <div className="next-step-card">
              <div className="step-number-badge">1</div>
              <h3>Explore the Demo</h3>
              <p>Browse the business-specific pages above and try the live demo forms and chatbots. See how automation works for your industry.</p>
            </div>
            <div className="next-step-card">
              <div className="step-number-badge">2</div>
              <h3>Fill Out the Form</h3>
              <p>On any business page, fill out the demo form with your details. This helps us understand your needs and contact you.</p>
            </div>
            <div className="next-step-card">
              <div className="step-number-badge">3</div>
              <h3>We'll Contact You</h3>
              <p>Within 24 hours, we'll reach out via email or phone to discuss your specific requirements and answer any questions.</p>
            </div>
            <div className="next-step-card">
              <div className="step-number-badge">4</div>
              <h3>Free Consultation</h3>
              <p>We'll schedule a free consultation call to understand your business needs, current processes, and automation goals.</p>
            </div>
            <div className="next-step-card">
              <div className="step-number-badge">5</div>
              <h3>Custom Proposal</h3>
              <p>We'll create a detailed proposal outlining the automation system we'll build for you, including timeline and pricing.</p>
            </div>
            <div className="next-step-card">
              <div className="step-number-badge">6</div>
              <h3>We Build & Deploy</h3>
              <p>Once approved, we'll build your custom automation system and deploy it within 3-5 days. You'll have ongoing support.</p>
            </div>
          </div>

          <div className="contact-info-box">
            <h3>📧 Direct Contact</h3>
            <p>Prefer to reach out directly? Contact us at:</p>
            <div className="contact-details">
              <a href="mailto:pramana15@pramana15.com" className="contact-link">
                📧 pramana15@pramana15.com
              </a>
            </div>
            <p className="contact-note">
              <strong>Response Time:</strong> We typically respond within 24 hours during business days.
            </p>
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
            <a href="#whats-next" className="btn btn-primary btn-large" style={{ marginTop: '24px', display: 'inline-block' }}>
              See What's Next →
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BusinessShowcase;

