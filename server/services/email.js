/**
 * Email Service
 * Handles automated email notifications using Nodemailer
 * 
 * SETUP INSTRUCTIONS:
 * 1. For Gmail: Enable "Less secure app access" or use App Password
 * 2. For other providers: Check their SMTP settings
 * 3. Add email credentials to .env file
 * 
 * ALTERNATIVE: Use services like SendGrid, Mailgun, or AWS SES
 * Or integrate with Zapier/Make.com for email automation
 */

const nodemailer = require('nodemailer');

let transporter = null;

/**
 * Initialize email transporter
 */
function initEmailTransporter() {
  if (transporter) return transporter;

  // Create transporter based on environment variables
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD
    }
  });

  return transporter;
}

/**
 * Email templates
 */
const emailTemplates = {
  leadConfirmation: (data) => ({
    subject: 'Thank You for Your Interest!',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #4F46E5; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background: #f9f9f9; }
          .button { display: inline-block; padding: 12px 24px; background: #4F46E5; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Thank You, ${data.name}!</h1>
          </div>
          <div class="content">
            <p>We've received your interest in <strong>${data.service}</strong> and we're excited to help you achieve your goals!</p>
            <p>Our team will contact you shortly to schedule your free consultation.</p>
            <p>In the meantime, feel free to explore our services or reach out if you have any questions.</p>
            <p>Best regards,<br>The Team</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
      Thank You, ${data.name}!
      
      We've received your interest in ${data.service} and we're excited to help you achieve your goals!
      
      Our team will contact you shortly to schedule your free consultation.
      
      Best regards,
      The Team
    `
  }),

  ownerNotification: (data) => ({
    subject: `New Lead: ${data.name} - ${data.service}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #10B981; color: white; padding: 20px; }
          .content { padding: 20px; background: #f9f9f9; }
          .lead-info { background: white; padding: 15px; margin: 10px 0; border-left: 4px solid #10B981; }
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
              <p><strong>Email:</strong> ${data.email}</p>
              <p><strong>Phone:</strong> ${data.phone}</p>
              <p><strong>Service:</strong> ${data.service}</p>
              <p><strong>Date:</strong> ${new Date(data.date).toLocaleString()}</p>
            </div>
            <p>Don't forget to follow up within 24 hours for best results!</p>
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
      
      Don't forget to follow up within 24 hours for best results!
    `
  })
};

/**
 * Send email
 */
async function sendEmail({ to, subject, template, data }) {
  try {
    // If email is not configured, log and return (for development)
    if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
      console.log('📧 Email not configured. Would send:', {
        to,
        subject,
        template
      });
      return { success: true, message: 'Email logged (not configured)' };
    }

    const transporter = initEmailTransporter();
    const templateData = emailTemplates[template](data);

    const mailOptions = {
      from: `"${process.env.EMAIL_FROM_NAME || 'Lead System'}" <${process.env.SMTP_USER}>`,
      to,
      subject: subject || templateData.subject,
      html: templateData.html,
      text: templateData.text
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent: ${to} - ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

module.exports = {
  sendEmail
};

