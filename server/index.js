/**
 * Lead Capture & Automation System - Backend Server
 * Handles form submissions, Google Sheets integration, and email automation
 */

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { saveToGoogleSheets } = require('./services/googleSheets');
const { sendEmail } = require('./services/email');
const { getChatbotResponse } = require('./services/chatbot');
const { getLeads } = require('./services/googleSheets');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
// CORS configuration - allow requests from frontend
const allowedOrigins = [
  'http://localhost:3000',
  process.env.FRONTEND_URL,
  process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null,
  process.env.NETLIFY_URL ? `https://${process.env.NETLIFY_URL}` : null
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    
    // Allow requests from allowed origins or in development
    if (allowedOrigins.includes(origin) || process.env.NODE_ENV === 'development') {
      callback(null, true);
    } else {
      // In production, be more strict
      if (process.env.NODE_ENV === 'production' && allowedOrigins.length > 0) {
        callback(new Error('Not allowed by CORS'));
      } else {
        callback(null, true); // Allow if no specific origins set
      }
    }
  },
  credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Health check endpoint
 */
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

/**
 * Lead capture form submission endpoint
 * Saves lead to Google Sheets and sends automated emails
 */
app.post('/api/leads', async (req, res) => {
  try {
    const { name, email, phone, service } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !service) {
      return res.status(400).json({ 
        error: 'All fields are required',
        missing: {
          name: !name,
          email: !email,
          phone: !phone,
          service: !service
        }
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Create lead object
    const lead = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      service: service.trim(),
      date: new Date().toISOString()
    };

    // Save to Google Sheets
    await saveToGoogleSheets(lead);

    // Send confirmation email to lead
    await sendEmail({
      to: lead.email,
      subject: 'Thank You for Your Interest!',
      template: 'leadConfirmation',
      data: { name: lead.name, service: lead.service }
    });

    // Notify business owner
    await sendEmail({
      to: process.env.OWNER_EMAIL,
      subject: `New Lead: ${lead.name} - ${lead.service}`,
      template: 'ownerNotification',
      data: lead
    });

    res.json({ 
      success: true, 
      message: 'Thank you! We\'ll contact you shortly.',
      lead 
    });

  } catch (error) {
    console.error('Error processing lead:', error);
    res.status(500).json({ 
      error: 'Failed to process your submission. Please try again.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

/**
 * Chatbot endpoint - handles AI-powered FAQ responses
 */
app.post('/api/chatbot', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const response = await getChatbotResponse(message.trim());

    res.json({ 
      success: true, 
      response 
    });

  } catch (error) {
    console.error('Error processing chatbot message:', error);
    res.status(500).json({ 
      error: 'Sorry, I encountered an error. Please try again.',
      response: 'We\'ll contact you soon to answer your questions.'
    });
  }
});

/**
 * Admin dashboard endpoint - retrieves all leads
 */
app.get('/api/leads', async (req, res) => {
  try {
    const leads = await getLeads();
    res.json({ 
      success: true, 
      leads 
    });
  } catch (error) {
    console.error('Error fetching leads:', error);
    res.status(500).json({ 
      error: 'Failed to fetch leads',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Admin dashboard: http://localhost:${PORT}/admin`);
});

