/**
 * Email Service
 * Production-ready email automation with duplicate prevention
 */

import nodemailer from 'nodemailer';
import { logError, logInfo, logWarn } from './logger';

let transporter = null;
const sentEmails = new Set(); // Track sent emails (in-memory, resets on restart)

/**
 * Initialize email transporter
 */
function initEmailTransporter() {
  if (transporter) return transporter;

  const smtpConfig = {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD || process.env.SMTP_PASS // Support both variable names
    }
  };

  // Validate configuration
  if (!smtpConfig.auth.user || !smtpConfig.auth.pass) {
    logWarn('Email not configured - SMTP credentials missing');
    return null;
  }

  try {
    transporter = nodemailer.createTransport(smtpConfig);
    logInfo('Email transporter initialized');
    return transporter;
  } catch (error) {
    logError('Error initializing email transporter', error);
    return null;
  }
}

/**
 * Generate email ID for duplicate prevention
 */
function getEmailId(to, subject, type) {
  return `${to}-${subject}-${type}-${Date.now()}`;
}

/**
 * Check if email was already sent (prevent duplicates)
 */
function isEmailSent(emailId) {
  // Check if sent in last 5 minutes
  const fiveMinutesAgo = Date.now() - (5 * 60 * 1000);
  const recentEmails = Array.from(sentEmails).filter(id => {
    const timestamp = parseInt(id.split('-').pop());
    return timestamp > fiveMinutesAgo;
  });
  
  return sentEmails.has(emailId);
}

/**
 * Mark email as sent
 */
function markEmailSent(emailId) {
  sentEmails.add(emailId);
  // Clean old entries (keep only last hour)
  const oneHourAgo = Date.now() - (60 * 60 * 1000);
  for (const id of sentEmails) {
    const timestamp = parseInt(id.split('-').pop());
    if (timestamp < oneHourAgo) {
      sentEmails.delete(id);
    }
  }
}

/**
 * Email templates
 */
const templates = {
  leadConfirmation: (data) => ({
    subject: 'Thank You for Your Interest!',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { padding: 30px; background: #f9fafb; border-radius: 0 0 10px 10px; }
          .button { display: inline-block; padding: 12px 24px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Thank You, ${data.name}!</h1>
          </div>
          <div class="content">
            <p>We've received your interest in <strong>${data.service}</strong> and we're excited to help you achieve your goals!</p>
            <p>Our team will contact you within 24 hours to schedule your free consultation.</p>
            <p>In the meantime, feel free to explore our services or reach out if you have any questions.</p>
            <p>Best regards,<br><strong>The Pramana15 Team</strong></p>
            <p style="font-size: 12px; color: #6b7280; margin-top: 30px;">
              Pramana15 | Global Service<br>
              Email: pramana15.co@gmail.com
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
      Thank You, ${data.name}!
      
      We've received your interest in ${data.service} and we're excited to help you achieve your goals!
      
      Our team will contact you within 24 hours to schedule your free consultation.
      
      Best regards,
      The Pramana15 Team
      
      Pramana15 | Global Service
      Email: pramana15.co@gmail.com
    `
  }),

  ownerNotification: (data) => ({
    subject: `🎉 New Lead: ${data.name} - ${data.service}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { padding: 30px; background: #f9fafb; border-radius: 0 0 10px 10px; }
          .lead-info { background: white; padding: 20px; margin: 15px 0; border-left: 4px solid #10b981; border-radius: 5px; }
          .lead-info p { margin: 10px 0; }
          .lead-info strong { color: #1f2937; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 New Lead Received!</h1>
          </div>
          <div class="content">
            <div class="lead-info">
              <p><strong>Name:</strong> ${data.name}</p>
              <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
              <p><strong>Phone:</strong> <a href="tel:${data.phone}">${data.phone}</a></p>
              <p><strong>Service:</strong> ${data.service}</p>
              <p><strong>Date:</strong> ${new Date(data.date).toLocaleString()}</p>
            </div>
            <p style="margin-top: 20px; padding: 15px; background: #fef3c7; border-radius: 5px;">
              <strong>💡 Tip:</strong> Follow up within 24 hours for best conversion rates!
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
      New Lead Received!
      
      Name: ${data.name}
      Email: ${data.email}
      Phone: ${data.phone}
      Service: ${data.service}
      Date: ${new Date(data.date).toLocaleString()}
      
      Tip: Follow up within 24 hours for best conversion rates!
    `
  })
};

/**
 * Send email
 */
export async function sendEmail({ to, subject, template, data, type = 'general' }) {
  try {
    const emailTransporter = initEmailTransporter();
    
    if (!emailTransporter) {
      logWarn('Email not sent - transporter not configured', { to, subject });
      return { 
        success: false, 
        error: 'Email service not configured',
        skipped: true
      };
    }

    // Prevent duplicate emails
    const emailId = getEmailId(to, subject, type);
    if (isEmailSent(emailId)) {
      logInfo('Email already sent recently, skipping', { to, subject });
      return { 
        success: true, 
        skipped: true,
        message: 'Email was already sent recently'
      };
    }

    const templateData = templates[template](data);
    
    const mailOptions = {
      from: `"${process.env.EMAIL_FROM_NAME || 'Pramana15'}" <${process.env.SMTP_USER}>`,
      to,
      subject: subject || templateData.subject,
      html: templateData.html,
      text: templateData.text
    };

    const info = await emailTransporter.sendMail(mailOptions);
    
    markEmailSent(emailId);
    
    logInfo('Email sent successfully', { 
      to, 
      subject, 
      messageId: info.messageId 
    });
    
    return { 
      success: true, 
      messageId: info.messageId 
    };
  } catch (error) {
    logError('Error sending email', error);
    return { 
      success: false, 
      error: error.message 
    };
  }
}

