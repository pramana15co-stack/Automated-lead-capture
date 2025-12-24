# Quick Deploy Guide - Your Credentials

## Your Configuration

Based on your credentials:

- **Google Sheet**: `1f1FoDZqAxOdsdm6fF9qcAkYD-SY7QZIOkBrMV-I1Hms`
- **Email**: `pramana15.co@gmail.com`
- **OpenAI API**: Configured

## Immediate Steps

### 1. Fix Gmail Password (CRITICAL)

Your current password `yashmathur14` won't work with SMTP. You need an **App Password**:

1. Go to: https://myaccount.google.com/apppasswords
2. Enable 2FA if not already enabled
3. Generate App Password for "Mail"
4. Use that 16-character password (not your regular password)

### 2. Set Up Google Sheets Service Account

You need service account credentials:

1. Go to: https://console.cloud.google.com/
2. Create project → Enable Google Sheets API
3. Create Service Account → Download JSON
4. Share your sheet with service account email
5. Copy JSON content

### 3. Add to Vercel

In Vercel Dashboard → Settings → Environment Variables:

```
GOOGLE_SHEET_ID=1f1FoDZqAxOdsdm6fF9qcAkYD-SY7QZIOkBrMV-I1Hms
GOOGLE_SHEETS_CREDENTIALS={paste full JSON here}
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=pramana15.co@gmail.com
SMTP_PASSWORD=your_app_password_here
# Note: Use Gmail App Password, not regular password
OWNER_EMAIL=pramana15.co@gmail.com
OPENAI_API_KEY=sk-proj-...your-api-key-here...
```

### 4. Redeploy

After adding variables, redeploy your project.

### 5. Test

1. Submit a test lead
2. Check Google Sheet
3. Check email
4. Test chatbot

---

## Security Alert

⚠️ You've shared sensitive credentials publicly. Please:

1. **Change Gmail password** immediately
2. **Regenerate OpenAI API key**
3. **Use App Password** for SMTP (not regular password)
4. **Never share credentials** in chat/email

