# 🚀 Complete Setup Guide - Make Everything Work

This guide will help you set up the entire Lead Capture & Automation System from scratch.

---

## 📋 Prerequisites

- Node.js 18+ installed
- A Google account
- A Gmail account (for email)
- An OpenAI account (for chatbot)

---

## Step 1: Install Dependencies

```bash
# Navigate to project directory
cd "C:\Users\Yash\OneDrive\Desktop\WORK\Freenlancing"

# Install all dependencies
npm install
```

---

## Step 2: Set Up Google Sheets

### 2.1 Create Google Cloud Project

1. Go to: https://console.cloud.google.com/
2. Click "Select a project" → "New Project"
3. Name: "Lead Capture System"
4. Click "Create"

### 2.2 Enable Google Sheets API

1. In Google Cloud Console, go to "APIs & Services" → "Library"
2. Search: "Google Sheets API"
3. Click on it → Click "Enable"

### 2.3 Create Service Account

1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "Service Account"
3. Name: "lead-capture-service"
4. Click "Create and Continue"
5. Skip optional steps, click "Done"

### 2.4 Create Service Account Key

1. Click on the service account you just created
2. Go to "Keys" tab
3. Click "Add Key" → "Create new key"
4. Select "JSON"
5. Click "Create" (downloads JSON file)
6. **Save this file securely** - you'll need it!

### 2.5 Share Google Sheet with Service Account

1. Open the downloaded JSON file
2. Find `"client_email"` (looks like: `xxx@xxx.iam.gserviceaccount.com`)
3. Copy that email address
4. Open your Google Sheet: https://docs.google.com/spreadsheets/d/1f1FoDZqAxOdsdm6fF9qcAkYD-SY7QZIOkBrMV-I1Hms/edit
5. Click "Share" button (top right)
6. Paste the service account email
7. Select "Editor" permission
8. **Uncheck "Notify people"** (service account doesn't need notifications)
9. Click "Share"

### 2.6 Prepare Sheet Headers

1. In your Google Sheet, make sure Row 1 has these headers:
   - `Name` | `Email` | `Phone` | `Service` | `Date` | `Status`
2. If the sheet is empty, add these headers in Row 1

---

## Step 3: Set Up Gmail App Password

### 3.1 Enable 2-Factor Authentication

1. Go to: https://myaccount.google.com/security
2. Under "Signing in to Google", find "2-Step Verification"
3. If not enabled, click it and follow the setup
4. You'll need your phone for verification

### 3.2 Generate App Password

1. Go to: https://myaccount.google.com/apppasswords
2. Select app: "Mail"
3. Select device: "Other (Custom name)"
4. Enter name: "Lead Capture System"
5. Click "Generate"
6. **Copy the 16-character password** (looks like: `abcd efgh ijkl mnop`)
7. Remove spaces: `abcdefghijklmnop`
8. **Save this password** - you'll need it!

---

## Step 4: Set Up OpenAI API Key

### 4.1 Create OpenAI Account

1. Go to: https://platform.openai.com/
2. Sign up or log in
3. Add payment method (required for API access)

### 4.2 Generate API Key

1. Go to: https://platform.openai.com/api-keys
2. Click "Create new secret key"
3. Name: "Lead Capture Chatbot"
4. Click "Create secret key"
5. **Copy the key immediately** (starts with `sk-proj-` or `sk-`)
6. **Save this key** - you won't see it again!

---

## Step 5: Create Environment Variables File

### 5.1 Create `.env.local` File

In your project root, create a file named `.env.local`:

```bash
# Windows PowerShell
New-Item -Path ".env.local" -ItemType File
```

### 5.2 Add All Variables

Open `.env.local` and add:

```env
# Google Sheets Configuration
GOOGLE_SHEET_ID=1f1FoDZqAxOdsdm6fF9qcAkYD-SY7QZIOkBrMV-I1Hms

# IMPORTANT: Replace with your actual JSON from Step 2.4
# Copy the ENTIRE JSON content (all on one line, or properly formatted)
GOOGLE_SHEETS_CREDENTIALS={"type":"service_account","project_id":"your-project-id","private_key_id":"xxx","private_key":"-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n","client_email":"your-service-account@your-project.iam.gserviceaccount.com","client_id":"xxx","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_x509_cert_url":"xxx"}

# Email Configuration (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=pramana15.co@gmail.com
SMTP_PASS=YOUR_GMAIL_APP_PASSWORD_HERE
SMTP_PASSWORD=YOUR_GMAIL_APP_PASSWORD_HERE
EMAIL_FROM_NAME=Pramana15
OWNER_EMAIL=pramana15.co@gmail.com

# OpenAI API Configuration
AI_API_KEY=YOUR_OPENAI_API_KEY_HERE
OPENAI_API_KEY=YOUR_OPENAI_API_KEY_HERE
OPENAI_MODEL=gpt-3.5-turbo
```

### 5.3 Replace Placeholders

**Replace these values:**

1. **`GOOGLE_SHEETS_CREDENTIALS`**:
   - Open the JSON file you downloaded in Step 2.4
   - Copy the ENTIRE content
   - Paste it here (keep it as valid JSON)

2. **`SMTP_PASS` and `SMTP_PASSWORD`**:
   - Use the App Password from Step 3.2
   - Remove spaces: `abcdefghijklmnop`

3. **`AI_API_KEY` and `OPENAI_API_KEY`**:
   - Use the API key from Step 4.2
   - Should start with `sk-proj-` or `sk-`

---

## Step 6: Test Locally

### 6.1 Start Development Server

```bash
npm run dev
```

You should see:
```
✓ Ready in X seconds
○ Local: http://localhost:3000
```

### 6.2 Test API Health

1. Open browser: http://localhost:3000/api/health
2. Should see JSON response with status: "ok"

### 6.3 Test Form Submission

1. Open: http://localhost:3000
2. Fill out the form:
   - Name: Test User
   - Email: your-email@example.com
   - Phone: 1234567890
   - Service: Business Coaching
3. Click "Book a Free Consultation"
4. Check:
   - ✅ Success message appears
   - ✅ Google Sheet has new row
   - ✅ Email received (check inbox)

### 6.4 Test Chatbot

1. Click chatbot icon (bottom right)
2. Type: "What services do you offer?"
3. Should get a response

---

## Step 7: Deploy to Vercel

### 7.1 Push to GitHub

```bash
git add .
git commit -m "Complete setup ready for deployment"
git push origin main
```

### 7.2 Deploy to Vercel

1. Go to: https://vercel.com/
2. Sign up/Login with GitHub
3. Click "Add New" → "Project"
4. Import your repository: `pramana15co-stack/Automated-lead-capture`
5. Click "Deploy"

### 7.3 Add Environment Variables in Vercel

1. In Vercel project, go to **Settings** → **Environment Variables**
2. Add each variable (same as `.env.local`):

**For Production Environment:**

| Name | Value |
|------|-------|
| `GOOGLE_SHEET_ID` | `1f1FoDZqAxOdsdm6fF9qcAkYD-SY7QZIOkBrMV-I1Hms` |
| `GOOGLE_SHEETS_CREDENTIALS` | `{paste entire JSON from Step 2.4}` |
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

3. Click "Save" for each variable

### 7.4 Redeploy

1. Go to **Deployments** tab
2. Click "..." on latest deployment → "Redeploy"
3. Wait for deployment to complete

### 7.5 Test Production

1. Visit your Vercel URL
2. Test form submission
3. Check Google Sheet for new lead
4. Check email inbox

---

## ✅ Verification Checklist

### Local Development
- [ ] `npm install` completed successfully
- [ ] `npm run dev` starts without errors
- [ ] `/api/health` returns `{"status":"ok"}`
- [ ] Form submission works
- [ ] Google Sheet receives data
- [ ] Confirmation email received
- [ ] Owner notification email received
- [ ] Chatbot responds

### Production (Vercel)
- [ ] All environment variables added
- [ ] Deployment successful
- [ ] Production URL works
- [ ] Form submission works
- [ ] Google Sheet receives data
- [ ] Emails are sent
- [ ] Chatbot works

---

## 🐛 Common Issues & Solutions

### Issue 1: "Google Sheets credentials not configured"
**Solution**: 
- Check `GOOGLE_SHEETS_CREDENTIALS` is set
- Verify JSON is valid (no line breaks in middle)
- Check service account email has access to sheet

### Issue 2: "Email authentication failed"
**Solution**:
- Use App Password, not regular password
- Verify 2FA is enabled
- Check `SMTP_PASS` has no spaces
- Verify `SMTP_USER` is correct

### Issue 3: "OpenAI API error"
**Solution**:
- Check API key is correct
- Verify account has credits
- Check API key hasn't expired

### Issue 4: "Form submission error"
**Solution**:
- Check browser console (F12)
- Check server logs
- Verify API route exists: `/api/lead`
- Check all environment variables are set

### Issue 5: "Network error"
**Solution**:
- Verify dev server is running (`npm run dev`)
- Check API URL is correct
- Test `/api/health` endpoint

---

## 📞 Quick Reference

### Your Current Values

```env
GOOGLE_SHEET_ID=1f1FoDZqAxOdsdm6fF9qcAkYD-SY7QZIOkBrMV-I1Hms
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=pramana15.co@gmail.com
OWNER_EMAIL=pramana15.co@gmail.com
```

### What You Need to Get

1. ✅ Google Sheets Service Account JSON (Step 2.4)
2. ✅ Gmail App Password (Step 3.2)
3. ✅ OpenAI API Key (Step 4.2)

---

## 🎯 Final Steps

1. **Complete all steps above**
2. **Test locally** - Make sure everything works
3. **Deploy to Vercel** - Add environment variables
4. **Test production** - Verify everything works
5. **Share your website** - Start capturing leads!

---

## 📚 Additional Resources

- **Environment Variables Guide**: `ENVIRONMENT_VARIABLES_GUIDE.md`
- **Troubleshooting**: `TROUBLESHOOTING.md`
- **Setup Instructions**: `SETUP_INSTRUCTIONS.md`

---

## ✨ You're All Set!

Once you complete these steps, your Lead Capture & Automation System will be fully functional and ready to capture leads, send automated emails, and engage visitors with the AI chatbot!

