/**
 * Test Save API
 * POST /api/test-save
 * 
 * Tests saving a lead to Google Sheets with detailed logging
 */

import { saveLead } from '../../lib/googleSheets';
import { logError, logInfo } from '../../lib/logger';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Test data
    const testLead = {
      name: 'Test User',
      email: `test-${Date.now()}@example.com`,
      phone: '+1234567890',
      company: 'Test Company',
      service: 'Business Coaching',
      budget: '$1,000 - $2,500',
      preferredTime: 'Morning (9 AM - 12 PM)',
      message: 'This is a test submission'
    };

    logInfo('Testing lead save', testLead);

    const result = await saveLead(testLead);

    if (result.success) {
      return res.status(200).json({
        success: true,
        message: 'Test lead saved successfully!',
        testLead,
        result
      });
    } else {
      return res.status(400).json({
        success: false,
        message: 'Test lead save failed',
        testLead,
        result
      });
    }
  } catch (error) {
    logError('Test save error', error);
    return res.status(500).json({
      success: false,
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}

