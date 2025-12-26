# 🚀 Complete Setup Guide - Step by Step

This guide will walk you through setting up **everything from scratch** for Google Sheets, Chatbot, and Email automation.

---

## 📋 What You'll Need

1. **Google Account** (for Google Sheets)
2. **OpenAI Account** (for Chatbot) - [Sign up at openai.com](https://platform.openai.com/signup)
3. **Gmail Account** (for sending emails) - You already have: `pramana15.co@gmail.com`

---

## Part 1: Google Sheets Setup 🔵

### Step 1.1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Click **"Blank"** to create a new spreadsheet
3. Name it something like **"Lead Capture - Pramana15"**
4. **IMPORTANT:** Leave the first row empty (we'll add headers automatically) OR add these headers in row 1:
   - `Name` | `Email` | `Phone` | `Service` | `Date` | `Timestamp`
5. **Copy the Sheet URL** from your browser address bar
   - Example: `https://docs.google.com/spreadsheets/d/1f1FoDZqAxOdsdm6fF9qcAkYD-SY7QZIOkBrMV-I1Hms/edit`
   - **Save this URL** - you'll need it later

### Step 1.2: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click **"Select a project"** → **"New Project"**
3. Enter project name: **"Pramana15 Lead Capture"**
4. Click **"Create"**
5. Wait for project to be created, then select it

### Step 1.3: Enable Google Sheets API

1. In Google Cloud Console, go to **"APIs & Services"** → **"Library"**
2. Search for **"Google Sheets API"**
3. Click on it and click **"Enable"**
4. Wait for it to enable (takes 10-30 seconds)

### Step 1.4: Create Service Account

1. In Google Cloud Console, go to **"APIs & Services"** → **"Credentials"**
2. Click **"+ CREATE CREDENTIALS"** → **"Service account"**
3. Fill in:
   - **Service account name:** `lead-capture-service`
   - **Service account ID:** (auto-filled, leave as is)
   - Click **"Create and Continue"**
4. Skip "Grant this service account access to project" (click **"Continue"**)
5. Skip "Grant users access" (click **"Done"**)

### Step 1.5: Create Service Account Key (JSON)

1. In **"Credentials"** page, find your service account (should be listed)
2. Click on the service account email (looks like: `lead-capture-service@your-project.iam.gserviceaccount.com`)
3. Go to **"Keys"** tab
4. Click **"Add Key"** → **"Create new key"**
5. Select **"JSON"** format
6. Click **"Create"**
7. **A JSON file will download automatically** - **SAVE THIS FILE SECURELY**
   - ⚠️ **DO NOT SHARE THIS FILE OR COMMIT IT TO GITHUB**
   - This file contains your credentials

### Step 1.6: Share Google Sheet with Service Account

1. Open your Google Sheet (from Step 1.1)
2. Click the **"Share"** button (top right)
3. In the "Add people and groups" field, paste the **service account email**
   - This is the `client_email` from the JSON file you downloaded
   - Example: `lead-capture-service@your-project-123456.iam.gserviceaccount.com`
4. Make sure permission is set to **"Editor"** (not Viewer)
5. **Uncheck** "Notify people" (service account doesn't need email)
6. Click **"Share"**
7. ✅ **Done!** The service account now has access to your sheet

### Step 1.7: Extract Sheet ID from URL

From your Google Sheet URL:
```
https://docs.google.com/spreadsheets/d/1f1FoDZqAxOdsdm6fF9qcAkYD-SY7QZIOkBrMV-I1Hms/edit
```

The **Sheet ID** is: `1f1FoDZqAxOdsdm6fF9qcAkYD-SY7QZIOkBrMV-I1Hms`

**Save this Sheet ID** - you'll need it later.

---

## Part 2: OpenAI Chatbot Setup 🤖

### Step 2.1: Create OpenAI Account

1. Go to [OpenAI Platform](https://platform.openai.com/signup)
2. Sign up with your email (or use existing account)
3. Verify your email address

### Step 2.2: Add Payment Method

1. Go to [OpenAI Billing](https://platform.openai.com/account/billing)
2. Click **"Add payment method"**
3. Add your credit/debit card
4. ⚠️ **Note:** OpenAI charges per API call (very cheap, ~$0.002 per conversation)

### Step 2.3: Create API Key

1. Go to [OpenAI API Keys](https://platform.openai.com/api-keys)
2. Click **"+ Create new secret key"**
3. Name it: **"Pramana15 Chatbot"**
4. Click **"Create secret key"**
5. **COPY THE API KEY IMMEDIATELY** - you won't see it again!
   - Example: `sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
6. **Save this API key securely** - you'll need it later

---

## Part 3: Gmail SMTP Setup 📧

### Step 3.1: Enable 2-Factor Authentication

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Under "Signing in to Google", click **"2-Step Verification"**
3. Follow the steps to enable 2FA (you'll need your phone)

### Step 3.2: Create App Password

1. Still in [Google Account Security](https://myaccount.google.com/security)
2. Under "Signing in to Google", click **"App passwords"**
   - (If you don't see this, make sure 2FA is enabled first)
3. Select app: **"Mail"**
4. Select device: **"Other (Custom name)"**
5. Enter name: **"Pramana15 Lead Capture"**
6. Click **"Generate"**
7. **COPY THE 16-CHARACTER PASSWORD** (spaces don't matter)
   - Example: `abcd efgh ijkl mnop`
8. **Save this password securely** - you'll need it later

---

## Part 4: Prepare Information for Me 📝

Now that you have everything, here's what I need from you:

### Information to Provide:

1. **Google Sheet ID:**
   ```
   GOOGLE_SHEET_ID=your-sheet-id-here
   ```
   (Just the ID, not the full URL)

2. **Google Sheets Credentials (JSON):**
   - Open the JSON file you downloaded in Step 1.5
   - Copy the **ENTIRE** JSON content
   - It should look like:
   ```json
   {
     "type": "service_account",
     "project_id": "your-project-id",
     "private_key_id": "xxx",
     "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
     "client_email": "lead-capture-service@your-project.iam.gserviceaccount.com",
     "client_id": "xxx",
     "auth_uri": "https://accounts.google.com/o/oauth2/auth",
     "token_uri": "https://oauth2.googleapis.com/token",
     "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
     "client_x509_cert_url": "xxx"
   }
   ```

3. **OpenAI API Key:**
   ```
   AI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

4. **Gmail App Password:**
   ```
   SMTP_PASS=your-16-character-app-password
   ```

5. **Your Email (for notifications):**
   ```
   OWNER_EMAIL=pramana15.co@gmail.com
   ```

---

## Part 5: How to Provide Me the Information 🔒

**IMPORTANT SECURITY NOTES:**
- ⚠️ **DO NOT** paste credentials in public chat or GitHub
- ⚠️ **DO NOT** commit credentials to Git
- ✅ I'll help you add them directly to Vercel environment variables

### Option 1: Provide in Chat (I'll help you add to Vercel)
Just paste the information here in this format:

```
GOOGLE_SHEET_ID=your-sheet-id
GOOGLE_SHEETS_CREDENTIALS={"type":"service_account",...}
AI_API_KEY=sk-proj-xxx
SMTP_PASS=your-app-password
OWNER_EMAIL=pramana15.co@gmail.com
```

I'll then guide you to add them securely to Vercel.

### Option 2: Add Directly to Vercel (Recommended)
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add each variable one by one (I'll provide exact instructions)

---

## ✅ Checklist Before Providing Information

- [ ] Google Sheet created and shared with service account
- [ ] Service account JSON file downloaded
- [ ] Sheet ID extracted from URL
- [ ] OpenAI API key created
- [ ] Gmail App Password generated
- [ ] All information ready to share

---

## 🆘 Troubleshooting

### Google Sheets Issues:
- **"Permission denied"** → Make sure sheet is shared with service account email
- **"Sheet not found"** → Check Sheet ID is correct
- **"Invalid credentials"** → Check JSON file is complete

### OpenAI Issues:
- **"Invalid API key"** → Make sure you copied the full key (starts with `sk-proj-`)
- **"Insufficient credits"** → Add payment method in OpenAI dashboard

### Gmail Issues:
- **"Authentication failed"** → Make sure you're using App Password, not regular password
- **"2FA not enabled"** → Enable 2FA first, then create App Password

---

## 📞 Next Steps

Once you've completed all steps above, provide me with the information and I'll:
1. ✅ Verify everything is correct
2. ✅ Help you add it to Vercel securely
3. ✅ Test the integration
4. ✅ Make sure everything works

**Ready? Start with Part 1 and work through each step!** 🚀
