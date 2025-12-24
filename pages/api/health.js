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

  const health = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    services: {
      googleSheets: !!process.env.GOOGLE_SHEET_ID,
      email: !!(process.env.SMTP_USER && process.env.SMTP_PASSWORD),
      chatbot: !!process.env.OPENAI_API_KEY
    }
  };

  return res.status(200).json(health);
}

