/**
 * WhatsApp Integration Service
 * 
 * Supports Twilio WhatsApp API for sending notifications
 * Handles failures gracefully and prevents duplicates
 */

import { logError, logInfo, logWarn } from './logger';
import { getClientConfig } from './config';

let twilioClient = null;
const sentMessages = new Set(); // Track sent messages (in-memory)

/**
 * Initialize Twilio client
 */
export function initTwilioClient() {
  if (twilioClient) return twilioClient;
  
  const config = getClientConfig();
  
  if (!config.features.whatsapp || !config.whatsapp.enabled) {
    logWarn('WhatsApp not enabled - feature flag disabled');
    return null;
  }
  
  if (config.whatsapp.provider !== 'twilio') {
    logWarn('WhatsApp provider not supported', { provider: config.whatsapp.provider });
    return null;
  }
  
  if (!config.whatsapp.twilioAccountSid || !config.whatsapp.twilioAuthToken) {
    logWarn('WhatsApp not configured - Twilio credentials missing');
    return null;
  }
  
  try {
    // Dynamic import to avoid loading Twilio if not needed
    const twilio = require('twilio');
    twilioClient = twilio(
      config.whatsapp.twilioAccountSid,
      config.whatsapp.twilioAuthToken
    );
    logInfo('Twilio WhatsApp client initialized');
    return twilioClient;
  } catch (error) {
    logError('Error initializing Twilio client', error);
    return null;
  }
}

/**
 * Generate message ID for duplicate prevention
 */
function getMessageId(to, message, type) {
  return `${to}-${message.substring(0, 50)}-${type}-${Date.now()}`;
}

/**
 * Check if message was already sent
 */
function isMessageSent(messageId) {
  const fiveMinutesAgo = Date.now() - (5 * 60 * 1000);
  const recentMessages = Array.from(sentMessages).filter(id => {
    const timestamp = parseInt(id.split('-').pop());
    return timestamp > fiveMinutesAgo;
  });
  
  return sentMessages.has(messageId);
}

/**
 * Mark message as sent
 */
function markMessageSent(messageId) {
  sentMessages.add(messageId);
  // Clean old entries (keep only last hour)
  const oneHourAgo = Date.now() - (60 * 60 * 1000);
  for (const id of sentMessages) {
    const timestamp = parseInt(id.split('-').pop());
    if (timestamp < oneHourAgo) {
      sentMessages.delete(id);
    }
  }
}

/**
 * WhatsApp message templates
 */
const templates = {
  ownerNotification: (data) => {
    const config = getClientConfig();
    return `🎉 *New Lead Received!*

*Name:* ${data.name}
*Email:* ${data.email}
*Phone:* ${data.phone}
*Service:* ${data.service}
${data.company ? `*Company:* ${data.company}\n` : ''}${data.budget ? `*Budget:* ${data.budget}\n` : ''}*Date:* ${new Date(data.date).toLocaleString()}

💡 *Tip:* Follow up within 24 hours for best conversion rates!

---
${config.businessName}`;
  },
  
  leadConfirmation: (data) => {
    const config = getClientConfig();
    const bookingLink = data.bookingLink;
    const bookingText = bookingLink ? `\n\n📅 *Book Your Free Consultation:*\n${bookingLink}` : '';
    
    return `Hello ${data.name}! 👋

Thank you for your interest in *${data.service}*!

We've received your information and our team will contact you within 24 hours to schedule your free consultation.

${bookingText}

Best regards,
${config.businessName}
${config.businessEmail ? `\nEmail: ${config.businessEmail}` : ''}`;
  },
  
  followUpReminder: (data) => {
    const config = getClientConfig();
    return `Hi ${data.name},

We wanted to follow up on your interest in *${data.service}*.

Are you still interested in learning more? We'd love to help you achieve your goals!

Reply to this message or contact us at ${config.businessEmail || config.businessPhone}.

Best regards,
${config.businessName}`;
  },
  
  finalFollowUp: (data) => {
    const config = getClientConfig();
    return `Hi ${data.name},

This is our final follow-up regarding your interest in *${data.service}*.

If you're still interested, please reply to this message or contact us at ${config.businessEmail || config.businessPhone}.

If you'd prefer not to receive further messages, just reply "STOP".

Best regards,
${config.businessName}`;
  }
};

/**
 * Send WhatsApp message
 * 
 * @param {Object} options
 * @param {string} options.to - Recipient phone number (format: whatsapp:+1234567890)
 * @param {string} options.template - Template name
 * @param {Object} options.data - Template data
 * @param {string} options.type - Message type (notification, confirmation, followup)
 * @param {string} options.message - Custom message (optional, overrides template)
 */
export async function sendWhatsApp({ to, template, data, type = 'general', message = null }) {
  try {
    const config = getClientConfig();
    
    if (!config.features.whatsapp || !config.whatsapp.enabled) {
      logWarn('WhatsApp not enabled - message not sent', { to, template });
      return {
        success: false,
        error: 'WhatsApp feature not enabled',
        skipped: true
      };
    }
    
    const client = initTwilioClient();
    
    if (!client) {
      logWarn('WhatsApp client not initialized - message not sent', { to, template });
      return {
        success: false,
        error: 'WhatsApp service not configured',
        skipped: true
      };
    }
    
    // Validate phone number format
    if (!to || !to.startsWith('whatsapp:+')) {
      logError('Invalid WhatsApp number format', { to });
      return {
        success: false,
        error: 'Invalid phone number format. Must be: whatsapp:+1234567890'
      };
    }
    
    // Get message content
    let messageBody;
    if (message) {
      messageBody = message;
    } else if (templates[template]) {
      messageBody = templates[template](data);
    } else {
      logError('WhatsApp template not found', { template });
      return {
        success: false,
        error: `Template "${template}" not found`
      };
    }
    
    // Prevent duplicate messages
    const messageId = getMessageId(to, messageBody, type);
    if (isMessageSent(messageId)) {
      logInfo('WhatsApp message already sent recently, skipping', { to, template });
      return {
        success: true,
        skipped: true,
        message: 'Message was already sent recently'
      };
    }
    
    // Send message via Twilio
    const twilioMessage = await client.messages.create({
      from: config.whatsapp.twilioWhatsAppNumber,
      to: to,
      body: messageBody
    });
    
    markMessageSent(messageId);
    
    logInfo('WhatsApp message sent successfully', {
      to,
      template,
      messageId: twilioMessage.sid,
      type
    });
    
    return {
      success: true,
      messageId: twilioMessage.sid,
      sid: twilioMessage.sid
    };
    
  } catch (error) {
    logError('Error sending WhatsApp message', error);
    return {
      success: false,
      error: error.message || 'Failed to send WhatsApp message'
    };
  }
}

/**
 * Format phone number for WhatsApp
 * Ensures proper format: whatsapp:+1234567890
 */
export function formatWhatsAppNumber(phone) {
  if (!phone) return null;
  
  // Remove all non-digit characters except +
  let cleaned = phone.replace(/[^\d+]/g, '');
  
  // Add + if not present
  if (!cleaned.startsWith('+')) {
    // Assume country code if not present (you may need to adjust this)
    cleaned = '+1' + cleaned; // Default to US, adjust as needed
  }
  
  // Add whatsapp: prefix
  if (!cleaned.startsWith('whatsapp:')) {
    cleaned = 'whatsapp:' + cleaned;
  }
  
  return cleaned;
}

