import React, { useState } from 'react';
import axios from 'axios';
import { getApiUrl } from '../config/api';
// CSS imported in _app.js for Next.js compatibility

/**
 * Lead Capture Form Component
 * Handles form submission, validation, and API communication
 */
const LeadCaptureForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    budget: '',
    preferredTime: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' or 'error'

  // Service options
  const services = [
    'Business Coaching',
    'Life Coaching',
    'Career Development',
    'Leadership Training',
    'Performance Optimization',
    'Lead Capture System',
    'Email Automation',
    'AI Chatbot Integration',
    'Other'
  ];

  // Budget options
  const budgetOptions = [
    'Under $500',
    '$500 - $1,000',
    '$1,000 - $2,500',
    '$2,500 - $5,000',
    '$5,000 - $10,000',
    'Over $10,000',
    'Not sure yet'
  ];

  // Preferred contact time options
  const timeOptions = [
    'Morning (9 AM - 12 PM)',
    'Afternoon (12 PM - 5 PM)',
    'Evening (5 PM - 8 PM)',
    'Anytime',
    'Weekends only'
  ];

  /**
   * Handle input changes
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  /**
   * Validate form data
   */
  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else {
      // Validate phone format - allow digits, spaces, hyphens, plus, and parentheses
      const phoneRegex = /^[\d\s\-+()]+$/;
      if (!phoneRegex.test(formData.phone)) {
        newErrors.phone = 'Please enter a valid phone number';
      }
    }

    if (!formData.service) {
      newErrors.service = 'Please select a service';
    }

    // Company is optional but validate if provided
    if (formData.company && formData.company.trim().length > 100) {
      newErrors.company = 'Company name is too long';
    }

    // Message is optional but validate if provided
    if (formData.message && formData.message.trim().length > 500) {
      newErrors.message = 'Message is too long (max 500 characters)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const apiUrl = getApiUrl('/api/lead');
      console.log('Submitting to:', apiUrl);
      console.log('Form data:', formData);
      
      const response = await axios.post(apiUrl, formData, {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 30000 // 30 second timeout
      });

      if (response.data && response.data.success) {
        // Check if booking link is provided
        if (response.data.booking && response.data.booking.link) {
          setSubmitStatus('success-with-booking');
          // Store booking link temporarily
          setFormData(prev => ({ ...prev, bookingLink: response.data.booking.link }));
        } else {
          setSubmitStatus('success');
        }
        
        // Reset form (preserve booking link if exists)
        const bookingLink = response.data.booking?.link || '';
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          service: '',
          budget: '',
          preferredTime: '',
          message: '',
          bookingLink: bookingLink
        });
        
        // Clear success message after longer time if booking link shown
        setTimeout(() => {
          setSubmitStatus(null);
          setFormData(prev => ({ ...prev, bookingLink: '' }));
        }, bookingLink ? 10000 : 5000);
      } else {
        // Handle unexpected response format
        setSubmitStatus('error');
        setErrors({ submit: response.data?.error || response.data?.message || 'Unexpected response from server.' });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      
      // Better error handling
      let errorMessage = 'Something went wrong. Please try again.';
      
      if (error.response) {
        // Server responded with error
        errorMessage = error.response.data?.error || error.response.data?.message || errorMessage;
        console.error('Server error:', error.response.data);
      } else if (error.request) {
        // Request made but no response
        errorMessage = 'Unable to connect to server. Please check your internet connection and try again.';
        console.error('Network error:', error.request);
      } else {
        // Something else happened
        errorMessage = error.message || errorMessage;
        console.error('Error:', error.message);
      }
      
      setErrors({ submit: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="lead-capture-form" onSubmit={handleSubmit}>
      {/* Name Field */}
      <div className="form-group">
        <label htmlFor="name">Full Name *</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="John Doe"
          className={errors.name ? 'error' : ''}
        />
        {errors.name && <span className="error-message">{errors.name}</span>}
      </div>

      {/* Email Field */}
      <div className="form-group">
        <label htmlFor="email">Email Address *</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="john@example.com"
          className={errors.email ? 'error' : ''}
        />
        {errors.email && <span className="error-message">{errors.email}</span>}
      </div>

      {/* Phone Field */}
      <div className="form-group">
        <label htmlFor="phone">Phone Number *</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+1 (555) 123-4567"
          className={errors.phone ? 'error' : ''}
        />
        {errors.phone && <span className="error-message">{errors.phone}</span>}
      </div>

      {/* Company Field */}
      <div className="form-group">
        <label htmlFor="company">Company Name</label>
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          placeholder="Your company (optional)"
          className={errors.company ? 'error' : ''}
        />
        {errors.company && <span className="error-message">{errors.company}</span>}
      </div>

      {/* Service Selection */}
      <div className="form-group">
        <label htmlFor="service">Service Interested In *</label>
        <select
          id="service"
          name="service"
          value={formData.service}
          onChange={handleChange}
          className={errors.service ? 'error' : ''}
        >
          <option value="">Select a service...</option>
          {services.map(service => (
            <option key={service} value={service}>
              {service}
            </option>
          ))}
        </select>
        {errors.service && <span className="error-message">{errors.service}</span>}
      </div>

      {/* Budget Selection */}
      <div className="form-group">
        <label htmlFor="budget">Budget Range</label>
        <select
          id="budget"
          name="budget"
          value={formData.budget}
          onChange={handleChange}
        >
          <option value="">Select budget range (optional)</option>
          {budgetOptions.map(budget => (
            <option key={budget} value={budget}>
              {budget}
            </option>
          ))}
        </select>
      </div>

      {/* Preferred Contact Time */}
      <div className="form-group">
        <label htmlFor="preferredTime">Preferred Contact Time</label>
        <select
          id="preferredTime"
          name="preferredTime"
          value={formData.preferredTime}
          onChange={handleChange}
        >
          <option value="">Select preferred time (optional)</option>
          {timeOptions.map(time => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>
      </div>

      {/* Message Field */}
      <div className="form-group">
        <label htmlFor="message">Additional Message</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us about your project or any specific requirements (optional)"
          rows="4"
          className={errors.message ? 'error' : ''}
          maxLength={500}
        />
        {errors.message && <span className="error-message">{errors.message}</span>}
        {formData.message && (
          <span className="char-count">{formData.message.length}/500 characters</span>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="btn btn-primary btn-submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Submitting...' : 'Book a Free Consultation'}
      </button>

      {/* Success Message */}
      {submitStatus === 'success' && (
        <div className="alert alert-success">
          <div className="alert-icon">✅</div>
          <div className="alert-content">
            <strong>Success!</strong>
            <p>Thank you! We've received your information and will contact you within 24 hours.</p>
          </div>
        </div>
      )}

      {/* Success Message with Booking Link */}
      {submitStatus === 'success-with-booking' && formData.bookingLink && (
        <div className="alert alert-success">
          <div className="alert-icon">✅</div>
          <div className="alert-content">
            <strong>Success!</strong>
            <p>Thank you! We've received your information and will contact you within 24 hours.</p>
            <div style={{ marginTop: '15px', padding: '15px', background: '#f0f9ff', borderRadius: '8px', border: '1px solid #3b82f6' }}>
              <strong style={{ display: 'block', marginBottom: '10px', color: '#1e40af' }}>📅 Book Your Free Consultation</strong>
              <a 
                href={formData.bookingLink} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  display: 'inline-block',
                  padding: '10px 20px',
                  background: '#3b82f6',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '5px',
                  fontWeight: 'bold',
                  marginTop: '10px'
                }}
              >
                Schedule Now →
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {submitStatus === 'error' && errors.submit && (
        <div className="alert alert-error">
          <div className="alert-icon">❌</div>
          <div className="alert-content">
            <strong>Error</strong>
            <p>{errors.submit}</p>
          </div>
        </div>
      )}
    </form>
  );
};

export default LeadCaptureForm;

