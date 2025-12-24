# Vercel Environment Variables Setup

## Quick Setup for Your Credentials

Based on your provided credentials, here's how to set them up in Vercel:

### Step 1: Extract Google Sheet ID

From your URL:
```
https://docs.google.com/spreadsheets/d/1f1FoDZqAxOdsdm6fF9qcAkYD-SY7QZIOkBrMV-I1Hms/edit?gid=0#gid=0
```

**Sheet ID**: `1f1FoDZqAxOdsdm6fF9qcAkYD-SY7QZIOkBrMV-I1Hms`

### Step 2: Set Up Google Sheets Service Account

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a project or select existing
3. Enable **Google Sheets API**
4. Create **Service Account**
5. Download JSON key file
6. Share your Google Sheet with the service account email (from JSON)
7. Copy the entire JSON content

### Step 3: Add Environment Variables in Vercel

Go to your Vercel project → **Settings** → **Environment Variables**

Add these variables:

#### Google Sheets
```
GOOGLE_SHEET_ID = 1f1FoDZqAxOdsdm6fF9qcAkYD-SY7QZIOkBrMV-I1Hms
GOOGLE_SHEETS_CREDENTIALS = {"type":"service_account",...paste full JSON here...}
```

#### Email (SMTP)
```
SMTP_HOST = smtp.gmail.com
SMTP_PORT = 587
SMTP_SECURE = false
SMTP_USER = pramana15.co@gmail.com
SMTP_PASSWORD = yashmathur14
EMAIL_FROM_NAME = Pramana15
OWNER_EMAIL = pramana15.co@gmail.com
```

**⚠️ IMPORTANT**: For Gmail, you need to use an **App Password**, not your regular password!

To generate App Password:
1. Enable 2-Factor Authentication on your Google account
2. Go to [App Passwords](https://myaccount.google.com/apppasswords)
3. Generate password for "Mail"
4. Use that password (not `yashmathur14`)

#### OpenAI API
```
OPENAI_API_KEY = sk-proj-...your-api-key-here...
OPENAI_MODEL = gpt-3.5-turbo
```

### Step 4: Redeploy

After adding environment variables:
1. Go to **Deployments** tab
2. Click **Redeploy** on latest deployment
3. Or push a new commit to trigger deployment

### Step 5: Test

1. Visit your Vercel URL
2. Submit a test lead
3. Check Google Sheet - should see new row
4. Check email inbox - should receive confirmation
5. Test chatbot - should respond

---

## Security Notes

⚠️ **CRITICAL**: The credentials you shared are sensitive!

1. **Change your Gmail password** if `yashmathur14` is your actual password
2. **Use App Password** instead of regular password for SMTP
3. **Regenerate OpenAI API key** if it's been exposed
4. **Never commit** `.env.local` to git
5. **Rotate credentials** regularly

---

## Troubleshooting

### Gmail Authentication Fails
- Use App Password (not regular password)
- Enable "Less secure app access" (not recommended) OR use App Password

### Google Sheets Permission Denied
- Share sheet with service account email (from JSON credentials)
- Check service account has Editor access

### OpenAI API Errors
- Verify API key is correct
- Check account has credits
- System will fall back to rule-based responses if API fails

---

## Local Testing

Create `.env.local` file in project root:

```env
GOOGLE_SHEET_ID=1f1FoDZqAxOdsdm6fF9qcAkYD-SY7QZIOkBrMV-I1Hms
GOOGLE_SHEETS_CREDENTIALS={"type":"service_account",...}
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=pramana15.co@gmail.com
SMTP_PASSWORD=your_app_password
OWNER_EMAIL=pramana15.co@gmail.com
OPENAI_API_KEY=sk-proj-...
```

Then run:
```bash
npm run dev
```

