/**
 * Lead Submission API
 * POST /api/lead
 * 
 * Handles lead form submissions with validation, duplicate prevention,
 * Google Sheets storage, and email automation.
 */

import { validateLeadData } from '../../lib/validation';
import { saveLead } from '../../lib/googleSheets';
import { sendEmail } from '../../lib/email';
import { checkRateLimit, getClientIP } from '../../lib/rateLimiter';
import { logError, logInfo, logRequest, logWarn } from '../../lib/logger';

export default async function handler(req, res) {
  const startTime = Date.now();
  
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed. Use POST.'
    });
  }

  try {
    // Rate limiting
    const clientIP = getClientIP(req);
    const rateLimit = checkRateLimit(clientIP, 5, 60000); // 5 requests per minute
    
    if (!rateLimit.allowed) {
      logRequest(req.method, req.url, 429, Date.now() - startTime);
      return res.status(429).json({
        success: false,
        error: 'Too many requests. Please try again later.',
        retryAfter: Math.ceil((rateLimit.resetAt - Date.now()) / 1000)
      });
    }

    // Validate request body
    if (!req.body || typeof req.body !== 'object') {
      logRequest(req.method, req.url, 400, Date.now() - startTime);
      return res.status(400).json({
        success: false,
        error: 'Invalid request body'
      });
    }

    // Validate lead data
    const validation = validateLeadData(req.body);
    
    if (!validation.valid) {
      logRequest(req.method, req.url, 400, Date.now() - startTime);
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        errors: validation.errors
      });
    }

    const leadData = validation.data;

    // Save to Google Sheets
    let saveResult;
    try {
      saveResult = await saveLead(leadData);
      
      if (!saveResult.success) {
        if (saveResult.duplicate) {
          logRequest(req.method, req.url, 409, Date.now() - startTime);
          return res.status(409).json({
            success: false,
            error: 'This lead was already submitted recently. Please wait a few minutes.',
            duplicate: true
          });
        }
        throw new Error(saveResult.message || 'Failed to save lead');
      }
    } catch (sheetsError) {
      logError('Google Sheets save error', sheetsError);
      // Return error so user knows it failed
      logRequest(req.method, req.url, 500, Date.now() - startTime);
      return res.status(500).json({
        success: false,
        error: 'Failed to save lead to Google Sheets. Please try again or contact support.',
        details: process.env.NODE_ENV === 'development' ? sheetsError.message : undefined
      });
    }

    // Send confirmation email to lead (non-blocking)
    const confirmationEmailPromise = sendEmail({
      to: leadData.email,
      subject: 'Thank You for Your Interest!',
      template: 'leadConfirmation',
      data: {
        name: leadData.name,
        service: leadData.service
      },
      type: 'confirmation'
    }).catch(error => {
      logError('Failed to send confirmation email', error);
      return { success: false, error: error.message };
    });

    // Send notification email to owner (non-blocking)
    const ownerEmail = process.env.OWNER_EMAIL || process.env.SMTP_USER;
    const notificationEmailPromise = ownerEmail ? sendEmail({
      to: ownerEmail,
      subject: `🎉 New Lead: ${leadData.name} - ${leadData.service}`,
      template: 'ownerNotification',
      data: {
        name: leadData.name,
        email: leadData.email,
        phone: leadData.phone,
        service: leadData.service,
        date: new Date().toISOString()
      },
      type: 'notification'
    }).catch(error => {
      logError('Failed to send notification email', error);
      return { success: false, error: error.message };
    }) : Promise.resolve({ success: false, skipped: true, reason: 'No owner email configured' });

    // Wait for emails (but don't fail if they fail)
    await Promise.allSettled([confirmationEmailPromise, notificationEmailPromise]);

    logRequest(req.method, req.url, 200, Date.now() - startTime);
    logInfo('Lead submitted successfully', { email: leadData.email });

    // Return success
    return res.status(200).json({
      success: true,
      message: 'Thank you! We\'ve received your information and will contact you within 24 hours.',
      lead: {
        name: leadData.name,
        email: leadData.email,
        service: leadData.service
      }
    });

  } catch (error) {
    logError('Unexpected error in lead submission', error);
    logRequest(req.method, req.url, 500, Date.now() - startTime);
    
    return res.status(500).json({
      success: false,
      error: 'An unexpected error occurred. Please try again later.',
      ...(process.env.NODE_ENV === 'development' && { details: error.message })
    });
  }
}

