/**
 * Admin Dashboard API
 * GET /api/leads
 * 
 * Fetches all leads for admin dashboard.
 * Note: In production, add authentication here.
 */

import { getLeads } from '../../lib/googleSheets';
import { logError, logInfo, logRequest } from '../../lib/logger';

export default async function handler(req, res) {
  const startTime = Date.now();
  
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed. Use GET.'
    });
  }

  try {
    // TODO: Add authentication in production
    // const authToken = req.headers.authorization;
    // if (!isValidToken(authToken)) {
    //   return res.status(401).json({ success: false, error: 'Unauthorized' });
    // }

    // Fetch leads
    const leads = await getLeads();

    logRequest(req.method, req.url, 200, Date.now() - startTime);
    logInfo('Leads fetched successfully', { count: leads.length });

    return res.status(200).json({
      success: true,
      leads: leads,
      count: leads.length
    });

  } catch (error) {
    logError('Error fetching leads', error);
    logRequest(req.method, req.url, 500, Date.now() - startTime);
    
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch leads. Please check your configuration.',
      ...(process.env.NODE_ENV === 'development' && { details: error.message })
    });
  }
}


