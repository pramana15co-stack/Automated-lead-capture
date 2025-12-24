/**
 * AI Chatbot API
 * POST /api/chat
 * 
 * Handles chatbot queries with AI integration, rate limiting, and fallbacks.
 */

import { getChatbotResponse } from '../../lib/chatbot';
import { checkRateLimit, getClientIP } from '../../lib/rateLimiter';
import { sanitizeString } from '../../lib/validation';
import { logError, logInfo, logRequest } from '../../lib/logger';

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
    // Rate limiting (more lenient for chatbot)
    const clientIP = getClientIP(req);
    const rateLimit = checkRateLimit(clientIP, 20, 60000); // 20 requests per minute
    
    if (!rateLimit.allowed) {
      logRequest(req.method, req.url, 429, Date.now() - startTime);
      return res.status(429).json({
        success: false,
        error: 'Too many requests. Please slow down.',
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

    // Get and sanitize message
    const rawMessage = req.body.message;
    
    if (rawMessage === undefined || rawMessage === null) {
      logRequest(req.method, req.url, 400, Date.now() - startTime);
      return res.status(400).json({
        success: false,
        error: 'Message is required'
      });
    }

    const message = sanitizeString(String(rawMessage));

    if (message.length === 0) {
      logRequest(req.method, req.url, 400, Date.now() - startTime);
      return res.status(400).json({
        success: false,
        error: 'Message cannot be empty'
      });
    }

    // Get chatbot response
    const response = await getChatbotResponse(message);

    if (!response.success) {
      logRequest(req.method, req.url, 400, Date.now() - startTime);
      return res.status(400).json({
        success: false,
        error: response.message || 'Failed to process message'
      });
    }

    logRequest(req.method, req.url, 200, Date.now() - startTime);
    logInfo('Chatbot response generated', { messageLength: message.length });

    return res.status(200).json({
      success: true,
      response: {
        message: response.message
      }
    });

  } catch (error) {
    logError('Unexpected error in chatbot', error);
    logRequest(req.method, req.url, 500, Date.now() - startTime);
    
    return res.status(500).json({
      success: false,
      error: 'I apologize, but I\'m having trouble right now. Please try again or fill out our contact form.',
      ...(process.env.NODE_ENV === 'development' && { details: error.message })
    });
  }
}

