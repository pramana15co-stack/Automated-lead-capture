import React from 'react';
import './CaseStudy.css';

/**
 * Case Study Component
 * Showcases real results and success stories
 */
const CaseStudy = () => {
  return (
    <section className="case-study-section">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Success Story</span>
          <h2 className="section-title">Real Results, Real Impact</h2>
          <p className="section-subtitle">
            See how this system transformed a coaching business
          </p>
        </div>

        <div className="case-study-card">
          <div className="case-study-header">
            <div className="case-study-client">
              <div className="client-logo">BC</div>
              <div>
                <h3>Business Coach Pro</h3>
                <p>Life Coaching Business, London, UK</p>
              </div>
            </div>
            <div className="case-study-results">
              <div className="result-item">
                <div className="result-number">300%</div>
                <div className="result-label">Increase in Leads</div>
              </div>
              <div className="result-item">
                <div className="result-number">15hrs</div>
                <div className="result-label">Time Saved Weekly</div>
              </div>
              <div className="result-item">
                <div className="result-number">98%</div>
                <div className="result-label">Satisfaction Rate</div>
              </div>
            </div>
          </div>

          <div className="case-study-content">
            <div className="case-study-challenge">
              <h4>Challenge</h4>
              <p>Manual lead capture was time-consuming, emails were missed, and there was no way to track conversions. The business needed automation to scale.</p>
            </div>

            <div className="case-study-solution">
              <h4>Solution</h4>
              <p>Implemented our complete lead capture and automation system with Google Sheets integration, automated email workflows, and AI chatbot for 24/7 engagement.</p>
            </div>

            <div className="case-study-results-detail">
              <h4>Results</h4>
              <ul>
                <li>✅ Automated lead capture reduced manual work by 90%</li>
                <li>✅ Email automation improved response time from days to minutes</li>
                <li>✅ AI chatbot handles 70% of initial inquiries automatically</li>
                <li>✅ Real-time dashboard provides instant visibility into all leads</li>
                <li>✅ Conversion rate increased from 15% to 45%</li>
              </ul>
            </div>

            <div className="case-study-tech">
              <h4>Technologies Used</h4>
              <div className="tech-badges">
                <span className="tech-badge">Next.js</span>
                <span className="tech-badge">Google Sheets API</span>
                <span className="tech-badge">OpenAI GPT</span>
                <span className="tech-badge">Email Automation</span>
                <span className="tech-badge">Vercel Deployment</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudy;

