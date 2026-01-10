import React, { useState } from 'react';
import axios from 'axios';
import { getApiUrl } from '../config/api';

/**
 * Business-Specific Lead Capture Form
 * Customizable form for different business types
 */
const BusinessLeadForm = ({ businessType, config }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: '',
    businessType: businessType,
    contactPreference: '',
    services: {
      metaAds: false,
      whatsapp: false,
      voiceAssistant: false
    }
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

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
    }

    if (config.serviceRequired && !formData.service) {
      newErrors.service = 'Please select a service';
    }

    if (!formData.contactPreference) {
      newErrors.contactPreference = 'Please select your preferred contact method';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await axios.post(getApiUrl('/api/lead'), formData, {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 30000
      });

      if (response.data && response.data.success) {
        setSubmitStatus('success');
        // Clear form only if not a duplicate (duplicate means it was already submitted)
        if (!response.data.duplicate) {
          setFormData({
            name: '',
            email: '',
            phone: '',
            company: '',
            service: '',
            message: '',
            businessType: businessType,
            contactPreference: '',
            services: {
              metaAds: false,
              whatsapp: false,
              voiceAssistant: false
            }
          });
        }
        // Clear success message after 8 seconds
        setTimeout(() => {
          setSubmitStatus(null);
        }, 8000);
      } else {
        setSubmitStatus('error');
        setErrors({ submit: response.data?.error || response.data?.message || 'Unexpected response from server.' });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      
      // Check if it's a timeout error
      if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
        // If timeout, check if we got a response (might have succeeded)
        if (error.response && error.response.data && error.response.data.success) {
          setSubmitStatus('success');
          setTimeout(() => {
            setSubmitStatus(null);
          }, 8000);
        } else {
          setSubmitStatus('error');
          setErrors({ submit: 'Request timed out. Your submission may have been received. Please check your email or try again.' });
        }
      } else if (error.response) {
        // Server responded with error
        const responseData = error.response.data;
        if (responseData && responseData.success) {
          // Sometimes success responses come through error handler
          setSubmitStatus('success');
          setTimeout(() => {
            setSubmitStatus(null);
          }, 8000);
        } else {
          setSubmitStatus('error');
          const errorMessage = responseData?.error || responseData?.message || 'Something went wrong. Please try again.';
          setErrors({ submit: errorMessage });
        }
      } else if (error.request) {
        // Request was made but no response received
        setSubmitStatus('error');
        setErrors({ submit: 'Unable to connect to server. Please check your internet connection and try again.' });
      } else {
        // Something else went wrong
        setSubmitStatus('error');
        setErrors({ submit: 'Something went wrong. Please try again.' });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="business-lead-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Full Name *</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder={config.placeholders?.name || "Your full name"}
          className={errors.name ? 'error' : ''}
        />
        {errors.name && <span className="error-message">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email Address *</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder={config.placeholders?.email || "your@email.com"}
          className={errors.email ? 'error' : ''}
        />
        {errors.email && <span className="error-message">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="phone">Phone Number *</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder={config.placeholders?.phone || "+1 (555) 123-4567"}
          className={errors.phone ? 'error' : ''}
        />
        {errors.phone && <span className="error-message">{errors.phone}</span>}
      </div>

      {config.showCompany && (
        <div className="form-group">
          <label htmlFor="company">{config.companyLabel || "Company Name"}</label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder={config.placeholders?.company || "Your company"}
          />
        </div>
      )}

      {config.services && config.services.length > 0 && (
        <div className="form-group">
          <label htmlFor="service">{config.serviceLabel || "Service Interested In"} {config.serviceRequired ? '*' : ''}</label>
          <select
            id="service"
            name="service"
            value={formData.service}
            onChange={handleChange}
            className={errors.service ? 'error' : ''}
          >
            <option value="">Select a service...</option>
            {config.services.map(service => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
          {errors.service && <span className="error-message">{errors.service}</span>}
        </div>
      )}

      {/* Contact Preference */}
      <div className="form-group">
        <label htmlFor="contactPreference">Preferred Contact Method *</label>
        <p className="form-hint">How would you like us to contact you?</p>
        <select
          id="contactPreference"
          name="contactPreference"
          value={formData.contactPreference}
          onChange={handleChange}
          className={errors.contactPreference ? 'error' : ''}
        >
          <option value="">Select preferred contact method...</option>
          <option value="Email">Email</option>
          <option value="Phone">Phone Call</option>
          <option value="WhatsApp">WhatsApp</option>
          <option value="Any">Any Method</option>
        </select>
        {errors.contactPreference && <span className="error-message">{errors.contactPreference}</span>}
      </div>

      {/* Add-On Services Selection */}
      <div className="form-group">
        <label>Additional Services (Optional)</label>
        <p className="form-hint">Select any additional services you'd like to include:</p>
        <div className="services-checkboxes">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="metaAds"
              checked={formData.services.metaAds}
              onChange={(e) => {
                setFormData(prev => ({
                  ...prev,
                  services: {
                    ...prev.services,
                    metaAds: e.target.checked
                  }
                }));
              }}
            />
            <span className="checkbox-content">
              <strong>📱 Meta Ads Setup</strong>
              <span className="checkbox-price">+ ${typeof window !== 'undefined' && window.location.pathname.includes('/dental-clinic') ? '500' : '500'} one-time</span>
              <span className="checkbox-desc">Facebook & Instagram ad campaign setup</span>
            </span>
          </label>

          <label className="checkbox-label">
            <input
              type="checkbox"
              name="whatsapp"
              checked={formData.services.whatsapp}
              onChange={(e) => {
                setFormData(prev => ({
                  ...prev,
                  services: {
                    ...prev.services,
                    whatsapp: e.target.checked
                  }
                }));
              }}
            />
            <span className="checkbox-content">
              <strong>💬 WhatsApp Notification System</strong>
              <span className="checkbox-price">+ ${typeof window !== 'undefined' && window.location.pathname.includes('/dental-clinic') ? '400' : '400'} setup + $50/month</span>
              <span className="checkbox-desc">Automated WhatsApp notifications & messaging</span>
            </span>
          </label>

          <label className="checkbox-label">
            <input
              type="checkbox"
              name="voiceAssistant"
              checked={formData.services.voiceAssistant}
              onChange={(e) => {
                setFormData(prev => ({
                  ...prev,
                  services: {
                    ...prev.services,
                    voiceAssistant: e.target.checked
                  }
                }));
              }}
            />
            <span className="checkbox-content">
              <strong>🎙️ Voice Assistant System</strong>
              <span className="checkbox-price">+ ${typeof window !== 'undefined' && window.location.pathname.includes('/dental-clinic') ? '800' : '800'} setup + $80/month</span>
              <span className="checkbox-desc">AI-powered phone answering & booking</span>
            </span>
          </label>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="message">{config.messageLabel || "Additional Message"}</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder={config.placeholders?.message || "Tell us about your needs..."}
          rows="4"
          maxLength={500}
        />
      </div>

      <button
        type="submit"
        className="btn btn-primary btn-submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Submitting...' : config.submitButtonText || 'Submit Enquiry'}
      </button>

      {submitStatus === 'success' && (
        <div className="alert alert-success">
          <div className="alert-icon">✅</div>
          <div className="alert-content">
            <strong>Success!</strong>
            <p>{config.successMessage || "Thank you! We've received your enquiry and will contact you within 24 hours."}</p>
          </div>
        </div>
      )}

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

export default BusinessLeadForm;

