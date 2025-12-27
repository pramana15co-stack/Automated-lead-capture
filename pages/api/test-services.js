/**
 * Test Services API
 * GET /api/test-services
 * 
 * Tests Google Sheets and Email services with detailed diagnostics
 */

import { initGoogleSheets } from '../../lib/googleSheets';
import { initEmailTransporter } from '../../lib/email';
import { initOpenAI } from '../../lib/chatbot';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const results = {
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    services: {}
  };

  // Test Google Sheets
  try {
    const hasSheetId = !!process.env.GOOGLE_SHEET_ID;
    const hasCredentials = !!process.env.GOOGLE_SHEETS_CREDENTIALS;
    
    results.services.googleSheets = {
      configured: hasSheetId && hasCredentials,
      hasSheetId,
      hasCredentials,
      sheetId: hasSheetId ? process.env.GOOGLE_SHEET_ID.substring(0, 10) + '...' : 'NOT SET',
      test: null,
      error: null
    };

    if (hasSheetId && hasCredentials) {
      try {
        const { doc, sheet } = await initGoogleSheets();
        await doc.loadInfo();
        results.services.googleSheets.test = {
          success: true,
          sheetTitle: doc.title,
          sheetFound: !!sheet,
          sheetName: sheet?.title || 'N/A'
        };
      } catch (error) {
        results.services.googleSheets.test = {
          success: false,
          error: error.message
        };
        results.services.googleSheets.error = error.message;
      }
    } else {
      results.services.googleSheets.error = 'Missing GOOGLE_SHEET_ID or GOOGLE_SHEETS_CREDENTIALS';
    }
  } catch (error) {
    results.services.googleSheets = {
      configured: false,
      error: error.message
    };
  }

  // Test Email
  try {
    const hasSmtpHost = !!process.env.SMTP_HOST;
    const hasSmtpUser = !!process.env.SMTP_USER;
    const hasSmtpPass = !!(process.env.SMTP_PASS || process.env.SMTP_PASSWORD);
    
    results.services.email = {
      configured: hasSmtpHost && hasSmtpUser && hasSmtpPass,
      hasSmtpHost,
      hasSmtpUser,
      hasSmtpPass,
      smtpHost: process.env.SMTP_HOST || 'NOT SET',
      smtpPort: process.env.SMTP_PORT || 'NOT SET',
      smtpUser: hasSmtpUser ? process.env.SMTP_USER.substring(0, 5) + '...' : 'NOT SET',
      test: null,
      error: null
    };

    if (hasSmtpHost && hasSmtpUser && hasSmtpPass) {
      try {
        const transporter = initEmailTransporter();
        if (transporter) {
          await transporter.verify();
          results.services.email.test = {
            success: true,
            message: 'SMTP connection verified successfully'
          };
        } else {
          results.services.email.test = {
            success: false,
            error: 'Email transporter not initialized'
          };
        }
      } catch (error) {
        results.services.email.test = {
          success: false,
          error: error.message
        };
        results.services.email.error = error.message;
      }
    } else {
      results.services.email.error = 'Missing SMTP configuration (SMTP_HOST, SMTP_USER, or SMTP_PASS)';
    }
  } catch (error) {
    results.services.email = {
      configured: false,
      error: error.message
    };
  }

  // Test OpenAI
  try {
    const hasApiKey = !!(process.env.OPENAI_API_KEY || process.env.AI_API_KEY);
    results.services.chatbot = {
      configured: hasApiKey,
      hasApiKey,
      test: null,
      error: null
    };

    if (hasApiKey) {
      try {
        const client = initOpenAI();
        results.services.chatbot.test = {
          success: !!client,
          message: client ? 'OpenAI client initialized' : 'OpenAI client not initialized'
        };
      } catch (error) {
        results.services.chatbot.test = {
          success: false,
          error: error.message
        };
      }
    } else {
      results.services.chatbot.error = 'Missing OPENAI_API_KEY or AI_API_KEY';
    }
  } catch (error) {
    results.services.chatbot = {
      configured: false,
      error: error.message
    };
  }

  // Overall status
  const allConfigured = 
    results.services.googleSheets?.configured &&
    results.services.email?.configured &&
    results.services.chatbot?.configured;

  const allWorking = 
    results.services.googleSheets?.test?.success &&
    results.services.email?.test?.success &&
    results.services.chatbot?.test?.success;

  return res.status(200).json({
    ...results,
    status: allWorking ? 'all_working' : allConfigured ? 'configured_but_errors' : 'not_configured',
    summary: {
      allConfigured,
      allWorking,
      hasErrors: !allWorking
    }
  });
}

