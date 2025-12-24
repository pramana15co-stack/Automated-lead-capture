/**
 * Health Check API
 * GET /api/health
 * 
 * Simple health check endpoint for monitoring.
 */

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Check environment variables
  const hasGoogleSheets = !!(process.env.GOOGLE_SHEET_ID && process.env.GOOGLE_SHEETS_CREDENTIALS);
  const hasEmail = !!(process.env.SMTP_USER && (process.env.SMTP_PASSWORD || process.env.SMTP_PASS));
  const hasChatbot = !!(process.env.OPENAI_API_KEY || process.env.AI_API_KEY);

  const health = {
    status: 'ok',
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    services: {
      googleSheets: hasGoogleSheets,
      email: hasEmail,
      chatbot: hasChatbot
    },
    // Debug info (only in development)
    ...(process.env.NODE_ENV !== 'production' && {
      debug: {
        hasSheetId: !!process.env.GOOGLE_SHEET_ID,
        hasCredentials: !!process.env.GOOGLE_SHEETS_CREDENTIALS,
        hasSmtpUser: !!process.env.SMTP_USER,
        hasSmtpPass: !!(process.env.SMTP_PASSWORD || process.env.SMTP_PASS),
        hasOpenAIKey: !!(process.env.OPENAI_API_KEY || process.env.AI_API_KEY)
      }
    })
  };

  return res.status(200).json(health);
}

