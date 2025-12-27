# Advanced Automation System - Setup Guide

This document explains how to enable and configure the advanced automation features added to the lead capture system.

## 📦 Package Tiers

The system supports three package tiers with different features:

### **CORE Package** (Default)
- ✅ Email automation
- ✅ AI Chatbot
- ✅ Google Sheets integration

### **PRO Package**
- ✅ Everything in CORE
- ✅ WhatsApp notifications
- ✅ Booking/Appointment integration

### **PREMIUM Package**
- ✅ Everything in PRO
- ✅ Automated follow-ups
- ✅ Advanced reporting

---

## 🚀 Quick Setup

### 1. Set Your Package

Add to your `.env.local` or Vercel environment variables:

```bash
CLIENT_PACKAGE=PRO  # Options: CORE, PRO, PREMIUM
```

### 2. Enable Individual Features (Optional)

You can also enable features individually regardless of package:

```bash
WHATSAPP_ENABLED=true
BOOKING_ENABLED=true
FOLLOW_UPS_ENABLED=true
```

---

## 📱 WhatsApp Integration (PRO & PREMIUM)

### Setup with Twilio

1. **Create Twilio Account**
   - Sign up at https://www.twilio.com
   - Get your Account SID and Auth Token from the dashboard

2. **Enable WhatsApp on Twilio**
   - Go to Messaging → Try it out → Send a WhatsApp message
   - Follow Twilio's setup instructions
   - Get your WhatsApp-enabled phone number (format: `whatsapp:+1234567890`)

3. **Add Environment Variables**

```bash
# Twilio Credentials
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_WHATSAPP_NUMBER=whatsapp:+1234567890

# Owner WhatsApp Number (where notifications are sent)
OWNER_WHATSAPP_NUMBER=whatsapp:+1234567890

# Optional: Send confirmation to lead via WhatsApp
WHATSAPP_SEND_TO_LEAD=true  # Set to 'true' to enable
```

### How It Works

- **On Lead Submission:**
  - Owner receives WhatsApp notification with lead details
  - Lead receives confirmation (if `WHATSAPP_SEND_TO_LEAD=true`)

- **Phone Number Format:**
  - Must be in format: `whatsapp:+1234567890`
  - Include country code (e.g., +1 for US, +44 for UK)

---

## 📅 Booking Integration (PRO & PREMIUM)

### Setup with Calendly

1. **Create Calendly Account**
   - Sign up at https://calendly.com
   - Create your event type
   - Get your Calendly link (e.g., `https://calendly.com/yourname/30min`)

2. **Add Environment Variables**

```bash
BOOKING_ENABLED=true
BOOKING_PROVIDER=calendly
CALENDLY_LINK=https://calendly.com/yourname/30min

# When to show booking link
SHOW_BOOKING_AFTER_SUBMISSION=true  # Show after form submission
SHOW_BOOKING_IN_CHATBOT=true        # Show in chatbot responses
```

### Setup with Google Calendar

```bash
BOOKING_ENABLED=true
BOOKING_PROVIDER=google-calendar
GOOGLE_CALENDAR_LINK=https://calendar.google.com/calendar/appointments/schedules/...
```

### How It Works

- **After Form Submission:**
  - If `SHOW_BOOKING_AFTER_SUBMISSION=true`, booking link appears in success message

- **In Chatbot:**
  - If `SHOW_BOOKING_IN_CHATBOT=true`, booking link is added to relevant responses
  - Triggered by keywords: "book", "schedule", "appointment", "consultation"

---

## 🔄 Follow-up Automation (PREMIUM Only)

### Setup

1. **Enable Follow-ups**

```bash
CLIENT_PACKAGE=PREMIUM
# OR
FOLLOW_UPS_ENABLED=true
```

2. **Configure Follow-up Settings**

```bash
# Reminder timing (default: 24 hours)
FOLLOW_UP_REMINDER_HOURS=24

# Final follow-up timing (default: 72 hours / 3 days)
FOLLOW_UP_FINAL_HOURS=72

# Channels to use (comma-separated)
FOLLOW_UP_CHANNELS=email,whatsapp  # Options: email, whatsapp
```

### How It Works

- **Automatic Follow-ups:**
  - Reminder sent after 24 hours if lead status = "Not Contacted"
  - Final follow-up sent after 3 days if still "Not Contacted"
  - Only sends to leads who haven't opted out

- **Lead Status Tracking:**
  - Status column in Google Sheets tracks: "Not Contacted", "Contacted", "Followed Up", "Converted", "Opted Out"
  - System automatically updates status when follow-ups are sent

- **Opt-Out:**
  - Leads can reply "STOP" to opt out
  - Opt-out status stored in Google Sheets

### Running Follow-ups

**Option 1: Vercel Cron Jobs (Recommended)**

Create `vercel.json`:

```json
{
  "crons": [{
    "path": "/api/follow-ups",
    "schedule": "0 */6 * * *"
  }]
}
```

This runs every 6 hours.

**Option 2: Manual Trigger**

Call `POST /api/follow-ups` manually or via external cron service.

**Option 3: External Cron Service**

Use services like:
- https://cron-job.org
- https://www.easycron.com
- https://crontab.guru (for setup help)

Set to call: `https://yourdomain.com/api/follow-ups` every 6 hours.

---

## ⚙️ Client Configuration

### Creating a New Client Configuration

1. **Copy Default Config**

The default configuration is in `lib/config.js`. For each new client:

- Create a new config file: `lib/configs/client-name.js`
- Export a modified version of `DEFAULT_CLIENT_CONFIG`
- Update `lib/config.js` to import and use the client-specific config

2. **Environment-Based Configuration**

Alternatively, use environment variables (recommended):

```bash
# Business Info
BUSINESS_NAME=Your Business Name
BUSINESS_EMAIL=your@email.com
BUSINESS_PHONE=+1234567890

# Package
CLIENT_PACKAGE=PRO

# Feature Overrides
WHATSAPP_ENABLED=true
BOOKING_ENABLED=true
```

---

## 🔒 Security & Best Practices

### Environment Variables

**Never commit secrets to Git!**

- Use `.env.local` for local development
- Use Vercel Environment Variables for production
- Add `.env.local` to `.gitignore`

### Rate Limiting

- Lead submission: 5 requests per minute per IP
- Follow-ups API: 10 requests per minute per IP
- Chatbot: Already rate-limited

### Error Handling

- All features handle failures gracefully
- System continues working even if one feature fails
- Errors are logged for debugging

---

## 📊 Google Sheets Structure

The system automatically adds these columns if missing:

- **Status** - Lead status tracking
- **Last Follow Up** - Timestamp of last follow-up
- **Opt Out** - Opt-out status (Yes/No)

### Lead Statuses

- `Not Contacted` - Initial status
- `Contacted` - Manually updated when you contact lead
- `Followed Up` - Automatically set when follow-up sent
- `Converted` - Lead converted to customer
- `Opted Out` - Lead opted out of communications

---

## 🧪 Testing

### Test WhatsApp

```bash
# Test endpoint (create pages/api/test-whatsapp.js)
POST /api/test-whatsapp
{
  "to": "whatsapp:+1234567890",
  "message": "Test message"
}
```

### Test Booking Link

1. Submit a form
2. Check if booking link appears in success message
3. Test chatbot with: "I want to book a consultation"

### Test Follow-ups

```bash
# Manually trigger
POST /api/follow-ups
```

---

## 🐛 Troubleshooting

### WhatsApp Not Sending

1. **Check Twilio Credentials**
   - Verify `TWILIO_ACCOUNT_SID` and `TWILIO_AUTH_TOKEN`
   - Check Twilio dashboard for errors

2. **Check Phone Number Format**
   - Must be: `whatsapp:+1234567890`
   - Include country code

3. **Check Twilio Console**
   - Look for error messages
   - Verify WhatsApp is enabled on your Twilio account

### Booking Link Not Showing

1. **Check Feature Flag**
   ```bash
   BOOKING_ENABLED=true
   ```

2. **Check Provider Config**
   ```bash
   BOOKING_PROVIDER=calendly  # or google-calendar
   CALENDLY_LINK=your_link_here
   ```

3. **Check Display Settings**
   ```bash
   SHOW_BOOKING_AFTER_SUBMISSION=true
   SHOW_BOOKING_IN_CHATBOT=true
   ```

### Follow-ups Not Running

1. **Check Package**
   ```bash
   CLIENT_PACKAGE=PREMIUM
   ```

2. **Check Cron Job**
   - Verify Vercel cron is configured
   - Check Vercel logs for cron execution

3. **Manual Test**
   - Call `POST /api/follow-ups` manually
   - Check response for errors

---

## 📝 Environment Variables Reference

### Core Configuration
```bash
CLIENT_PACKAGE=CORE|PRO|PREMIUM
BUSINESS_NAME=Your Business
BUSINESS_EMAIL=your@email.com
BUSINESS_PHONE=+1234567890
```

### WhatsApp (PRO, PREMIUM)
```bash
WHATSAPP_ENABLED=true
TWILIO_ACCOUNT_SID=your_sid
TWILIO_AUTH_TOKEN=your_token
TWILIO_WHATSAPP_NUMBER=whatsapp:+1234567890
OWNER_WHATSAPP_NUMBER=whatsapp:+1234567890
WHATSAPP_SEND_TO_LEAD=true
```

### Booking (PRO, PREMIUM)
```bash
BOOKING_ENABLED=true
BOOKING_PROVIDER=calendly|google-calendar
CALENDLY_LINK=https://calendly.com/...
GOOGLE_CALENDAR_LINK=https://calendar.google.com/...
SHOW_BOOKING_AFTER_SUBMISSION=true
SHOW_BOOKING_IN_CHATBOT=true
```

### Follow-ups (PREMIUM)
```bash
FOLLOW_UPS_ENABLED=true
FOLLOW_UP_REMINDER_HOURS=24
FOLLOW_UP_FINAL_HOURS=72
FOLLOW_UP_CHANNELS=email,whatsapp
```

---

## 🎯 Next Steps

1. **Choose Your Package** - Set `CLIENT_PACKAGE` in environment variables
2. **Configure Features** - Add required environment variables for enabled features
3. **Test Locally** - Test each feature before deploying
4. **Deploy to Vercel** - Add all environment variables in Vercel dashboard
5. **Set Up Cron** - Configure Vercel cron for follow-ups (PREMIUM)
6. **Monitor** - Check logs and Google Sheets for activity

---

## 📞 Support

For issues or questions:
- Check logs in Vercel dashboard
- Review Google Sheets for data
- Test individual API endpoints
- Check environment variables are set correctly

---

**Built with ❤️ for production-ready automation**

