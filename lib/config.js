/**
 * Client Configuration & Feature Flags
 * 
 * Central configuration system for managing client settings,
 * feature flags, and package-based features.
 * 
 * PACKAGES:
 * - CORE: email + chatbot + Google Sheets
 * - PRO: CORE + WhatsApp + booking
 * - PREMIUM: PRO + follow-ups + reports
 */

import { logWarn, logInfo } from './logger';

/**
 * Default client configuration
 * Clone this for each new client
 */
export const DEFAULT_CLIENT_CONFIG = {
  // Business Information
  businessName: process.env.BUSINESS_NAME || 'Pramana15',
  businessEmail: process.env.BUSINESS_EMAIL || process.env.OWNER_EMAIL || process.env.SMTP_USER,
  businessPhone: process.env.BUSINESS_PHONE || '',
  
  // Package Type: 'CORE' | 'PRO' | 'PREMIUM'
  package: process.env.CLIENT_PACKAGE || 'CORE',
  
  // Feature Flags (automatically set based on package)
  features: {
    email: true,           // Always enabled
    chatbot: true,         // Always enabled
    googleSheets: true,    // Always enabled
    whatsapp: false,       // PRO, PREMIUM
    booking: false,        // PRO, PREMIUM
    followUps: false,      // PREMIUM only
    reports: false         // PREMIUM only
  },
  
  // WhatsApp Configuration (PRO, PREMIUM)
  whatsapp: {
    enabled: false,
    provider: process.env.WHATSAPP_PROVIDER || 'twilio', // 'twilio' | 'cloud-api'
    twilioAccountSid: process.env.TWILIO_ACCOUNT_SID || '',
    twilioAuthToken: process.env.TWILIO_AUTH_TOKEN || '',
    twilioWhatsAppNumber: process.env.TWILIO_WHATSAPP_NUMBER || '', // Format: whatsapp:+1234567890
    ownerWhatsAppNumber: process.env.OWNER_WHATSAPP_NUMBER || '', // Format: whatsapp:+1234567890
    sendToLead: process.env.WHATSAPP_SEND_TO_LEAD === 'true' // Optional: send confirmation to lead
  },
  
  // Booking Configuration (PRO, PREMIUM)
  booking: {
    enabled: false,
    provider: process.env.BOOKING_PROVIDER || 'calendly', // 'calendly' | 'google-calendar'
    calendlyLink: process.env.CALENDLY_LINK || '',
    googleCalendarLink: process.env.GOOGLE_CALENDAR_LINK || '',
    showAfterSubmission: process.env.SHOW_BOOKING_AFTER_SUBMISSION === 'true',
    showInChatbot: process.env.SHOW_BOOKING_IN_CHATBOT === 'true'
  },
  
  // Follow-up Automation (PREMIUM only)
  followUps: {
    enabled: false,
    channels: ['email'], // 'email' | 'whatsapp' | ['email', 'whatsapp']
    reminderAfterHours: 24,
    finalFollowUpAfterHours: 72, // 3 days
    optOutEnabled: true
  }
};

/**
 * Get client configuration
 * Loads from environment variables and applies package-based feature flags
 */
export function getClientConfig() {
  const packageType = (process.env.CLIENT_PACKAGE || 'CORE').toUpperCase();
  
  const config = {
    ...DEFAULT_CLIENT_CONFIG,
    package: packageType
  };
  
  // Apply package-based feature flags
  switch (packageType) {
    case 'PREMIUM':
      config.features.whatsapp = true;
      config.features.booking = true;
      config.features.followUps = true;
      config.features.reports = true;
      config.whatsapp.enabled = true;
      config.booking.enabled = true;
      config.followUps.enabled = true;
      break;
      
    case 'PRO':
      config.features.whatsapp = true;
      config.features.booking = true;
      config.whatsapp.enabled = true;
      config.booking.enabled = true;
      break;
      
    case 'CORE':
    default:
      // CORE package - only basic features
      config.features.whatsapp = false;
      config.features.booking = false;
      config.features.followUps = false;
      config.features.reports = false;
      config.whatsapp.enabled = false;
      config.booking.enabled = false;
      config.followUps.enabled = false;
      break;
  }
  
  // Override with environment variables if provided
  if (process.env.WHATSAPP_ENABLED === 'true') {
    config.features.whatsapp = true;
    config.whatsapp.enabled = true;
  }
  
  if (process.env.BOOKING_ENABLED === 'true') {
    config.features.booking = true;
    config.booking.enabled = true;
  }
  
  if (process.env.FOLLOW_UPS_ENABLED === 'true') {
    config.features.followUps = true;
    config.followUps.enabled = true;
  }
  
  logInfo('Client config loaded', { 
    package: config.package,
    features: Object.keys(config.features).filter(k => config.features[k])
  });
  
  return config;
}

/**
 * Check if a feature is enabled
 */
export function isFeatureEnabled(featureName) {
  const config = getClientConfig();
  return config.features[featureName] === true;
}

/**
 * Get booking link based on provider
 */
export function getBookingLink() {
  const config = getClientConfig();
  
  if (!config.features.booking || !config.booking.enabled) {
    return null;
  }
  
  if (config.booking.provider === 'calendly' && config.booking.calendlyLink) {
    return config.booking.calendlyLink;
  }
  
  if (config.booking.provider === 'google-calendar' && config.booking.googleCalendarLink) {
    return config.booking.googleCalendarLink;
  }
  
  return null;
}

/**
 * Validate configuration
 */
export function validateConfig() {
  const config = getClientConfig();
  const errors = [];
  
  // Validate WhatsApp config if enabled
  if (config.features.whatsapp && config.whatsapp.enabled) {
    if (config.whatsapp.provider === 'twilio') {
      if (!config.whatsapp.twilioAccountSid) errors.push('TWILIO_ACCOUNT_SID missing');
      if (!config.whatsapp.twilioAuthToken) errors.push('TWILIO_AUTH_TOKEN missing');
      if (!config.whatsapp.twilioWhatsAppNumber) errors.push('TWILIO_WHATSAPP_NUMBER missing');
      if (!config.whatsapp.ownerWhatsAppNumber) errors.push('OWNER_WHATSAPP_NUMBER missing');
    }
  }
  
  // Validate booking config if enabled
  if (config.features.booking && config.booking.enabled) {
    if (config.booking.provider === 'calendly' && !config.booking.calendlyLink) {
      errors.push('CALENDLY_LINK missing');
    }
    if (config.booking.provider === 'google-calendar' && !config.booking.googleCalendarLink) {
      errors.push('GOOGLE_CALENDAR_LINK missing');
    }
  }
  
  if (errors.length > 0) {
    logWarn('Configuration validation errors', { errors });
    return { valid: false, errors };
  }
  
  return { valid: true };
}

