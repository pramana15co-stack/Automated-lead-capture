/**
 * Follow-up Automation API
 * 
 * POST /api/follow-ups - Manually trigger follow-up processing
 * GET /api/follow-ups - Get follow-up status
 * 
 * This endpoint can be called:
 * - Manually for testing
 * - Via cron job (Vercel Cron Jobs)
 * - Via scheduled function
 */

import { processFollowUps, optOutLead } from '../../lib/followUps';
import { getClientConfig } from '../../lib/config';
import { logError, logInfo } from '../../lib/logger';
import { checkRateLimit, getClientIP } from '../../lib/rateLimiter';

export default async function handler(req, res) {
  const config = getClientConfig();
  
  // Only allow if follow-ups are enabled
  if (!config.features.followUps || !config.followUps.enabled) {
    return res.status(403).json({
      success: false,
      error: 'Follow-up automation is not enabled for this package',
      package: config.package
    });
  }
  
  // Handle POST - process follow-ups
  if (req.method === 'POST') {
    try {
      // Rate limiting (more lenient for scheduled jobs)
      const clientIP = getClientIP(req);
      const rateLimit = checkRateLimit(clientIP, 10, 60000); // 10 requests per minute
      
      if (!rateLimit.allowed) {
        return res.status(429).json({
          success: false,
          error: 'Too many requests. Please try again later.'
        });
      }
      
      // Check for opt-out request
      if (req.body && req.body.action === 'opt-out' && req.body.email) {
        const result = await optOutLead(req.body.email);
        return res.status(200).json(result);
      }
      
      // Process follow-ups
      const result = await processFollowUps();
      
      logInfo('Follow-ups API called', result);
      
      return res.status(200).json({
        success: true,
        ...result
      });
      
    } catch (error) {
      logError('Error in follow-ups API', error);
      return res.status(500).json({
        success: false,
        error: error.message || 'Failed to process follow-ups'
      });
    }
  }
  
  // Handle GET - get status
  if (req.method === 'GET') {
    return res.status(200).json({
      success: true,
      enabled: true,
      config: {
        reminderAfterHours: config.followUps.reminderAfterHours,
        finalFollowUpAfterHours: config.followUps.finalFollowUpAfterHours,
        channels: config.followUps.channels,
        optOutEnabled: config.followUps.optOutEnabled
      }
    });
  }
  
  return res.status(405).json({
    success: false,
    error: 'Method not allowed'
  });
}

