# Environment Variables Setup Guide

This guide provides detailed instructions for setting up all required environment variables.

## Quick Setup

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Fill in the values as described below

## Required Variables

### 1. Google Sheets Configuration

#### GOOGLE_SHEETS_CREDENTIALS
- **Type**: JSON string (single line)
- **How to get**:
  1. Create Google Cloud Project
  2. Enable Google Sheets API
  3. Create Service Account
  4. Download JSON key file
  5. Copy entire JSON content
  6. Paste as single line (escape quotes if needed)

**Example**:
```env
GOOGLE_SHEETS_CREDENTIALS={"type":"service_account","project_id":"my-project","private_key_id":"abc123","private_key":"-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n","client_email":"service@project.iam.gserviceaccount.com","client_id":"123456","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_x509_cert_url":"https://www.googleapis.com/robot/v1/metadata/x509/..."}
```

#### GOOGLE_SHEET_ID
- **Type**: String
- **How to get**: From Google Sheets URL
  ```
  https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit
  ```
- **Example**: `1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms`

**Important**: Share the sheet with the service account email (from JSON credentials)

---

### 2. Email Configuration (SMTP)

#### SMTP_HOST
- **Type**: String
- **Common values**:
  - Gmail: `smtp.gmail.com`
  - Outlook: `smtp-mail.outlook.com`
  - SendGrid: `smtp.sendgrid.net`

#### SMTP_PORT
- **Type**: Number (as string)
- **Common values**: `587` (TLS) or `465` (SSL)

#### SMTP_SECURE
- **Type**: Boolean (as string)
- **Values**: `false` for port 587, `true` for port 465

#### SMTP_USER
- **Type**: Email address
- **Example**: `yourname@gmail.com`

#### SMTP_PASSWORD
- **Type**: String
- **For Gmail**: Use App Password (not regular password)
  - Enable 2FA
  - Generate at: https://myaccount.google.com/apppasswords
- **For other providers**: Use your email password or API key

#### EMAIL_FROM_NAME
- **Type**: String
- **Example**: `"John's Coaching"`

#### OWNER_EMAIL
- **Type**: Email address
- **Purpose**: Where to send new lead notifications
- **Example**: `owner@example.com`

---

## Complete .env Example

```env
# Server
PORT=5000
NODE_ENV=development

# Google Sheets
GOOGLE_SHEETS_CREDENTIALS={"type":"service_account","project_id":"my-project-123","private_key_id":"abc","private_key":"-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n","client_email":"lead-capture@my-project.iam.gserviceaccount.com","client_id":"123456789","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_x509_cert_url":"https://www.googleapis.com/robot/v1/metadata/x509/lead-capture%40my-project.iam.gserviceaccount.com"}
GOOGLE_SHEET_ID=1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms

# Email (Gmail Example)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=yourname@gmail.com
SMTP_PASSWORD=abcd efgh ijkl mnop
EMAIL_FROM_NAME=Your Coaching Business
OWNER_EMAIL=yourname@gmail.com
```

---

## Testing Your Configuration

### Test Google Sheets:
```bash
# The server will log errors if Sheets config is wrong
npm run server
# Try submitting a form - check console for errors
```

### Test Email:
```bash
# Check server logs when form is submitted
# If emails fail, you'll see error messages
```

---

## Security Notes

1. **Never commit `.env` file** - It's in `.gitignore`
2. **Use App Passwords** for Gmail (not regular passwords)
3. **Restrict Service Account** permissions in Google Cloud
4. **Use environment variables** in production (not hardcoded values)

---

## Alternative: Using File for Google Credentials

If you prefer to use a file instead of environment variable:

1. Save JSON file as `credentials.json` in `server/` directory
2. Modify `server/services/googleSheets.js`:
   ```javascript
   const credentials = require('./credentials.json');
   // Instead of: JSON.parse(process.env.GOOGLE_SHEETS_CREDENTIALS)
   ```
3. Add `credentials.json` to `.gitignore`

---

## Troubleshooting

### "Google Sheets credentials not configured"
- Check that `GOOGLE_SHEETS_CREDENTIALS` is set
- Verify JSON is valid (use JSON validator)
- Ensure it's on a single line

### "Invalid email format" or "Authentication failed"
- For Gmail: Use App Password
- Check SMTP settings match your provider
- Verify port and secure settings

### "Permission denied" for Google Sheets
- Share the sheet with service account email
- Check service account has Editor access

