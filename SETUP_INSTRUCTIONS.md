# Setup Instructions for Your Credentials

## Your Configuration

I've configured the system to work with your credentials. Here's what you need to do:

### 1. Google Sheet ID

**Extracted from your URL**: `1f1FoDZqAxOdsdm6fF9qcAkYD-SY7QZIOkBrMV-I1Hms`

The system will automatically extract this from a full URL if you provide one.

### 2. Gmail SMTP Setup (CRITICAL)

⚠️ **IMPORTANT**: You cannot use your regular Gmail password (`yashmathur14`) for SMTP.

You **MUST** use a Gmail App Password:

1. Go to: https://myaccount.google.com/apppasswords
2. Enable 2-Factor Authentication if not already enabled
3. Generate an App Password for "Mail"
4. Use that 16-character password (not your regular password)

### 3. Google Sheets Service Account

You need to create service account credentials:

1. Go to: https://console.cloud.google.com/
2. Create a new project (or select existing)
3. Enable **Google Sheets API**
4. Go to **IAM & Admin** → **Service Accounts**
5. Create a new service account
6. Download the JSON key file
7. **Share your Google Sheet** with the service account email (from the JSON file)
8. Copy the entire JSON content

### 4. Vercel Environment Variables

Add these in Vercel Dashboard → **Settings** → **Environment Variables**:

#### Required Variables:

```
GOOGLE_SHEET_ID=1f1FoDZqAxOdsdm6fF9qcAkYD-SY7QZIOkBrMV-I1Hms
GOOGLE_SHEETS_CREDENTIALS={paste your service account JSON here}
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=pramana15.co@gmail.com
SMTP_PASSWORD={use Gmail App Password here - NOT your regular password}
EMAIL_FROM_NAME=Pramana15
OWNER_EMAIL=pramana15.co@gmail.com
OPENAI_API_KEY={your OpenAI API key}
OPENAI_MODEL=gpt-3.5-turbo
```

### 5. After Adding Variables

1. Go to **Deployments** tab
2. Click **Redeploy** on the latest deployment
3. Wait for deployment to complete
4. Test the system

### 6. Testing

1. Visit your Vercel URL
2. Submit a test lead through the form
3. Check your Google Sheet - should see new row
4. Check email inbox - should receive confirmation
5. Test chatbot - should respond

## Security Notes

⚠️ **CRITICAL SECURITY ALERTS**:

1. **Change your Gmail password** if `yashmathur14` is your actual password
2. **Use App Password** for SMTP (required by Gmail)
3. **Regenerate OpenAI API key** since it was exposed in chat
4. **Never commit** credentials to git
5. **Keep credentials secure** - use environment variables only

## Troubleshooting

### Gmail Authentication Fails
- **Solution**: Use App Password, not regular password
- Generate at: https://myaccount.google.com/apppasswords

### Google Sheets Permission Denied
- **Solution**: Share sheet with service account email
- The email is in your service account JSON file (ends with @...iam.gserviceaccount.com)

### OpenAI API Errors
- **Solution**: Verify API key is correct
- Check account has credits
- System will use fallback responses if API fails

## Local Testing

Create `.env.local` file (DO NOT commit to git):

```env
GOOGLE_SHEET_ID=1f1FoDZqAxOdsdm6fF9qcAkYD-SY7QZIOkBrMV-I1Hms
GOOGLE_SHEETS_CREDENTIALS={"type":"service_account",...paste JSON here...}
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=pramana15.co@gmail.com
SMTP_PASSWORD=your_app_password_here
OWNER_EMAIL=pramana15.co@gmail.com
OPENAI_API_KEY=your_api_key_here
```

Then run:
```bash
npm install
npm run dev
```

