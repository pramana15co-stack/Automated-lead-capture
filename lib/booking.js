/**
 * Booking/Appointment Integration
 * 
 * Provides booking links for Calendly or Google Calendar
 * Simple integration - no UI redesign required
 */

import { getClientConfig, isFeatureEnabled, getBookingLink } from './config';
import { logInfo, logWarn } from './logger';

/**
 * Get booking link for display
 * Returns null if booking is not enabled
 */
export function getBookingUrl() {
  if (!isFeatureEnabled('booking')) {
    return null;
  }
  
  return getBookingLink();
}

/**
 * Check if booking should be shown after form submission
 */
export function shouldShowBookingAfterSubmission() {
  const config = getClientConfig();
  return config.features.booking && 
         config.booking.enabled && 
         config.booking.showAfterSubmission === true;
}

/**
 * Check if booking should be shown in chatbot
 */
export function shouldShowBookingInChatbot() {
  const config = getClientConfig();
  return config.features.booking && 
         config.booking.enabled && 
         config.booking.showInChatbot === true;
}

/**
 * Get booking provider name
 */
export function getBookingProvider() {
  const config = getClientConfig();
  if (!config.features.booking || !config.booking.enabled) {
    return null;
  }
  return config.booking.provider;
}

