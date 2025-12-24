# Complete Environment Variables Guide

## 📋 All Required Environment Variables

This guide explains every environment variable needed for the Lead Capture & Automation System.

---

## 🔑 Required Variables

### 1. `GOOGLE_SHEET_ID`
**Purpose**: Identifies your Google Sheet where leads will be stored

**How to Get It**:
1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/1f1FoDZqAxOdsdm6fF9qcAkYD-SY7QZIOkBrMV-I1Hms/edit
2. Look at the URL: `https://docs.google.com/spreadsheets/d/[THIS_IS_YOUR_SHEET_ID]/edit`
3. Copy the ID between `/d/` and `/edit`

**Your Current Value**:
```
GOOGLE_SHEET_ID=1f1FoDZqAxOdsdm6fF9qcAkYD-SY7QZIOkBrMV-I1Hms
```

**Format**: String (no spaces, no quotes)

**Example**:
```env
GOOGLE_SHEET_ID=1f1FoDZqAxOdsdm6fF9qcAkYD-SY7QZIOkBrMV-I1Hms
```

---

### 2. `GOOGLE_SHEETS_CREDENTIALS`
**Purpose**: Service account JSON credentials to access Google Sheets API

**How to Get It**:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or select existing)
3. Enable **Google Sheets API**:
   - Go to "APIs & Services" → "Library"
   - Search "Google Sheets API"
   - Click "Enable"
4. Create Service Account:
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "Service Account"
   - Fill in name (e.g., "lead-capture-service")
   - Click "Create and Continue"
   - Skip optional steps, click "Done"
5. Create Key:
   - Click on the service account you just created
   - Go to "Keys" tab
   - Click "Add Key" → "Create new key"
   - Select "JSON"
   - Click "Create" (downloads JSON file)
6. Share Sheet with Service Account:
   - Open the downloaded JSON file
   - Find `"client_email"` (looks like: `xxx@xxx.iam.gserviceaccount.com`)
   - Open your Google Sheet
   - Click "Share" button
   - Paste the service account email
   - Give it "Editor" access
   - Click "Send"
7. Copy JSON Content:
   - Open the downloaded JSON file
   - Copy the entire content (all of it, including `{` and `}`)

**Format**: JSON string (entire JSON object as a string)

**Example**:
```env
GOOGLE_SHEETS_CREDENTIALS={"type":"service_account","project_id":"your-project","private_key_id":"xxx","private_key":"-----BEGIN PRIVATE KEY-----\nxxx\n-----END PRIVATE KEY-----\n","client_email":"xxx@xxx.iam.gserviceaccount.com","client_id":"xxx","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_x509_cert_url":"xxx"}
```

**⚠️ Important**: 
- Keep this JSON on ONE line (no line breaks)
- Or use a JSON file and reference it in code
- Never commit this to git!

---

### 3. `SMTP_HOST`
**Purpose**: SMTP server address for sending emails

**Value for Gmail**:
```
SMTP_HOST=smtp.gmail.com
```

**Other Providers**:
- Outlook: `smtp-mail.outlook.com`
- Yahoo: `smtp.mail.yahoo.com`
- Custom: Check your email provider's documentation

**Format**: String (hostname or IP address)

**Example**:
```env
SMTP_HOST=smtp.gmail.com
```

---

### 4. `SMTP_PORT`
**Purpose**: Port number for SMTP connection

**Value for Gmail**:
```
SMTP_PORT=587
```

**Common Ports**:
- 587: TLS/STARTTLS (recommended for Gmail)
- 465: SSL (alternative)
- 25: Plain (usually blocked)

**Format**: Number (as string)

**Example**:
```env
SMTP_PORT=587
```

---

### 5. `SMTP_USER`
**Purpose**: Your email address for SMTP authentication

**Your Current Value**:
```
SMTP_USER=pramana15.co@gmail.com
```

**Format**: Email address (string)

**Example**:
```env
SMTP_USER=pramana15.co@gmail.com
```

---

### 6. `SMTP_PASS` or `SMTP_PASSWORD`
**Purpose**: Password for SMTP authentication

**⚠️ CRITICAL FOR GMAIL**: You CANNOT use your regular Gmail password!

**You MUST use a Gmail App Password**:

**How to Get Gmail App Password**:
1. Enable 2-Factor Authentication:
   - Go to: https://myaccount.google.com/security
   - Enable "2-Step Verification" if not already enabled
2. Generate App Password:
   - Go to: https://myaccount.google.com/apppasswords
   - Select "Mail" as app
   - Select "Other (Custom name)" as device
   - Enter name: "Lead Capture System"
   - Click "Generate"
   - Copy the 16-character password (looks like: `abcd efgh ijkl mnop`)
   - Remove spaces: `abcdefghijklmnop`

**Format**: String (16 characters for Gmail App Password, no spaces)

**Example**:
```env
SMTP_PASS=abcdefghijklmnop
# OR
SMTP_PASSWORD=abcdefghijklmnop
```

**⚠️ Important**:
- Use App Password, NOT your regular password
- App Password is 16 characters
- Remove spaces from the generated password
- If you use regular password, authentication will fail

---

### 7. `SMTP_SECURE`
**Purpose**: Whether to use SSL/TLS encryption

**Value**:
```
SMTP_SECURE=false
```

**Options**:
- `false`: Use STARTTLS (recommended for port 587)
- `true`: Use SSL (for port 465)

**Format**: String ("true" or "false")

**Example**:
```env
SMTP_SECURE=false
```

---

### 8. `AI_API_KEY` or `OPENAI_API_KEY`
**Purpose**: OpenAI API key for AI chatbot functionality

**Your Current Value**:
```
AI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```
**⚠️ Note**: Your actual API key was exposed - regenerate it at https://platform.openai.com/api-keys

**How to Get It**:
1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in
3. Go to [API Keys](https://platform.openai.com/api-keys)
4. Click "Create new secret key"
5. Name it (e.g., "Lead Capture Chatbot")
6. Copy the key (starts with `sk-proj-` or `sk-`)
7. ⚠️ Save it immediately - you won't see it again!

**Format**: String (starts with `sk-`)

**Example**:
```env
AI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
# OR
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**⚠️ Security Note**: 
- This key was exposed in chat - regenerate it!
- Go to OpenAI → API Keys → Delete old key → Create new one

---

### 9. `OWNER_EMAIL`
**Purpose**: Email address where new lead notifications will be sent

**Your Current Value**:
```
OWNER_EMAIL=pramana15.co@gmail.com
```

**Format**: Email address (string)

**Example**:
```env
OWNER_EMAIL=pramana15.co@gmail.com
```

---

### 10. `EMAIL_FROM_NAME` (Optional)
**Purpose**: Display name for sent emails

**Format**: String

**Example**:
```env
EMAIL_FROM_NAME=Pramana15
```

---

### 11. `OPENAI_MODEL` (Optional)
**Purpose**: OpenAI model to use for chatbot

**Default Value**:
```
OPENAI_MODEL=gpt-3.5-turbo
```

**Other Options**:
- `gpt-3.5-turbo`: Fast, cheaper (recommended)
- `gpt-4`: More capable, more expensive
- `gpt-4-turbo`: Latest GPT-4

**Format**: String

**Example**:
```env
OPENAI_MODEL=gpt-3.5-turbo
```

---

## 📝 Complete `.env.local` File Example

Create a file named `.env.local` in your project root:

```env
# Google Sheets Configuration
GOOGLE_SHEET_ID=1f1FoDZqAxOdsdm6fF9qcAkYD-SY7QZIOkBrMV-I1Hms
GOOGLE_SHEETS_CREDENTIALS={"type":"service_account","project_id":"your-project","private_key_id":"xxx","private_key":"-----BEGIN PRIVATE KEY-----\nxxx\n-----END PRIVATE KEY-----\n","client_email":"xxx@xxx.iam.gserviceaccount.com","client_id":"xxx","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_x509_cert_url":"xxx"}

# Email Configuration (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=pramana15.co@gmail.com
SMTP_PASS=your_gmail_app_password_here
SMTP_PASSWORD=your_gmail_app_password_here
EMAIL_FROM_NAME=Pramana15
OWNER_EMAIL=pramana15.co@gmail.com

# OpenAI API Configuration
AI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
OPENAI_MODEL=gpt-3.5-turbo
```

---

## 🚀 Setting Up in Vercel

### Step 1: Go to Vercel Dashboard
1. Visit: https://vercel.com/dashboard
2. Select your project

### Step 2: Add Environment Variables
1. Go to **Settings** → **Environment Variables**
2. Click **Add New**
3. Add each variable:

**For Production Environment**:

| Name | Value |
|------|-------|
| `GOOGLE_SHEET_ID` | `1f1FoDZqAxOdsdm6fF9qcAkYD-SY7QZIOkBrMV-I1Hms` |
| `GOOGLE_SHEETS_CREDENTIALS` | `{paste entire JSON here}` |
| `SMTP_HOST` | `smtp.gmail.com` |
| `SMTP_PORT` | `587` |
| `SMTP_SECURE` | `false` |
| `SMTP_USER` | `pramana15.co@gmail.com` |
| `SMTP_PASS` | `{your_gmail_app_password}` |
| `SMTP_PASSWORD` | `{your_gmail_app_password}` |
| `OWNER_EMAIL` | `pramana15.co@gmail.com` |
| `EMAIL_FROM_NAME` | `Pramana15` |
| `AI_API_KEY` | `{your_openai_api_key}` |
| `OPENAI_API_KEY` | `{your_openai_api_key}` |
| `OPENAI_MODEL` | `gpt-3.5-turbo` |

### Step 3: Redeploy
1. Go to **Deployments** tab
2. Click **Redeploy** on latest deployment
3. Wait for deployment to complete

---

## ✅ Verification Checklist

After setting up, verify each service:

### 1. Google Sheets
- [ ] Service account created
- [ ] JSON credentials downloaded
- [ ] Sheet shared with service account email
- [ ] `GOOGLE_SHEET_ID` is correct
- [ ] `GOOGLE_SHEETS_CREDENTIALS` is valid JSON

### 2. Email (SMTP)
- [ ] 2FA enabled on Gmail account
- [ ] App Password generated
- [ ] `SMTP_PASS` uses App Password (not regular password)
- [ ] `SMTP_USER` is correct email
- [ ] `SMTP_HOST` and `SMTP_PORT` are correct

### 3. OpenAI
- [ ] API key created
- [ ] API key has credits
- [ ] `AI_API_KEY` or `OPENAI_API_KEY` is set
- [ ] Key starts with `sk-`

### 4. Owner Email
- [ ] `OWNER_EMAIL` is correct
- [ ] Email can receive notifications

---

## 🔒 Security Best Practices

1. **Never commit `.env.local` to git**
   - Already in `.gitignore`
   - Double-check before committing

2. **Use App Passwords for Gmail**
   - Never use regular password
   - Regenerate if exposed

3. **Rotate API Keys Regularly**
   - Regenerate OpenAI key if exposed
   - Update in Vercel after regenerating

4. **Keep Service Account Secure**
   - Don't share JSON file
   - Limit service account permissions
   - Only share sheet with service account email

5. **Use Environment Variables**
   - Never hardcode credentials
   - Use `.env.local` for local development
   - Use Vercel environment variables for production

---

## 🐛 Troubleshooting

### Google Sheets Not Working
- Check service account email has access to sheet
- Verify JSON credentials are correct
- Check sheet ID is correct

### Email Not Sending
- Verify App Password is used (not regular password)
- Check SMTP settings are correct
- Verify 2FA is enabled on Gmail

### OpenAI Chatbot Not Working
- Check API key is valid
- Verify account has credits
- Check API key hasn't expired

---

## 📞 Need Help?

If you encounter issues:
1. Check browser console for errors
2. Check server logs for detailed errors
3. Verify all environment variables are set
4. Test each service individually
5. Refer to `TROUBLESHOOTING.md` for more help

