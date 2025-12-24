import React, { useState } from 'react';
import axios from 'axios';
import { getApiUrl } from '../config/api';
import './LeadCaptureForm.css';

/**
 * Lead Capture Form Component
 * Handles form submission, validation, and API communication
 */
const LeadCaptureForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: ''
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
    'Other'
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
    } else if (!/^[\d\s\-+()]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.service) {
      newErrors.service = 'Please select a service';
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
      const response = await axios.post(getApiUrl('/api/leads'), formData);

      if (response.data.success) {
        setSubmitStatus('success');
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: ''
        });
        // Clear success message after 5 seconds
        setTimeout(() => setSubmitStatus(null), 5000);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      if (error.response?.data?.error) {
        setErrors({ submit: error.response.data.error });
      } else {
        setErrors({ submit: 'Something went wrong. Please try again.' });
      }
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
          ✅ Thank you! We've received your information and will contact you within 24 hours.
        </div>
      )}

      {/* Error Message */}
      {submitStatus === 'error' && errors.submit && (
        <div className="alert alert-error">
          ❌ {errors.submit}
        </div>
      )}
    </form>
  );
};

export default LeadCaptureForm;

