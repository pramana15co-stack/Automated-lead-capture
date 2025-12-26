# 🔒 Secure Vercel Credentials Setup Guide

**IMPORTANT:** Your credentials are sensitive. Follow these steps carefully to add them securely to Vercel.

---

## ✅ Your Credentials (Keep These Secure!)

⚠️ **IMPORTANT:** Replace the placeholder values below with your actual credentials from the setup process.

**You should have these values ready:**
- Google Sheet ID (from your Google Sheet URL)
- Google Sheets Credentials JSON (from downloaded service account file)
- OpenAI API Key (from OpenAI dashboard)
- Gmail App Password (16 characters from Google Account)
- Your email address

---

## 📝 Step-by-Step: Add to Vercel

### Step 1: Go to Vercel Dashboard
1. Visit: https://vercel.com/dashboard
2. Log in to your account
3. Find and click on your project: **"Automated-lead-capture"** (or your project name)

### Step 2: Navigate to Environment Variables
1. Click on **"Settings"** (top navigation)
2. Click on **"Environment Variables"** (left sidebar)

### Step 3: Add Each Variable

Add these variables **one by one** for **Production** environment:

#### Variable 1: GOOGLE_SHEET_ID
- **Name:** `GOOGLE_SHEET_ID`
- **Value:** `YOUR_SHEET_ID_HERE` (replace with your actual Sheet ID)
- **Environment:** Select **Production** (and Preview/Development if you want)
- Click **"Save"**

#### Variable 2: GOOGLE_SHEETS_CREDENTIALS
- **Name:** `GOOGLE_SHEETS_CREDENTIALS`
- **Value:** Paste your ENTIRE JSON from the downloaded service account file (all on one line, no line breaks)
- **Environment:** Select **Production**
- Click **"Save"**

#### Variable 3: AI_API_KEY
- **Name:** `AI_API_KEY`
- **Value:** `YOUR_OPENAI_API_KEY_HERE` (replace with your actual API key starting with `sk-proj-`)
- **Environment:** Select **Production**
- Click **"Save"**

#### Variable 4: OPENAI_API_KEY (duplicate for compatibility)
- **Name:** `OPENAI_API_KEY`
- **Value:** Same as AI_API_KEY above
- **Environment:** Select **Production**
- Click **"Save"**

#### Variable 5: SMTP_HOST
- **Name:** `SMTP_HOST`
- **Value:** `smtp.gmail.com`
- **Environment:** Select **Production**
- Click **"Save"**

#### Variable 6: SMTP_PORT
- **Name:** `SMTP_PORT`
- **Value:** `587`
- **Environment:** Select **Production**
- Click **"Save"**

#### Variable 7: SMTP_SECURE
- **Name:** `SMTP_SECURE`
- **Value:** `false`
- **Environment:** Select **Production**
- Click **"Save"**

#### Variable 8: SMTP_USER
- **Name:** `SMTP_USER`
- **Value:** `pramana15.co@gmail.com`
- **Environment:** Select **Production**
- Click **"Save"**

#### Variable 9: SMTP_PASS
- **Name:** `SMTP_PASS`
- **Value:** `YOUR_16_CHAR_APP_PASSWORD_HERE` (replace with your full 16-character Gmail App Password)
- **Environment:** Select **Production**
- Click **"Save"**

#### Variable 10: SMTP_PASSWORD (duplicate for compatibility)
- **Name:** `SMTP_PASSWORD`
- **Value:** `ioqybxcurmyiadlh` (same as SMTP_PASS)
- **Environment:** Select **Production**
- Click **"Save"**

#### Variable 11: OWNER_EMAIL
- **Name:** `OWNER_EMAIL`
- **Value:** `pramana15.co@gmail.com`
- **Environment:** Select **Production**
- Click **"Save"**

#### Variable 12: EMAIL_FROM_NAME (optional)
- **Name:** `EMAIL_FROM_NAME`
- **Value:** `Pramana15`
- **Environment:** Select **Production**
- Click **"Save"**

#### Variable 13: OPENAI_MODEL (optional)
- **Name:** `OPENAI_MODEL`
- **Value:** `gpt-3.5-turbo`
- **Environment:** Select **Production**
- Click **"Save"**

### Step 4: Redeploy Your Project
1. Go to **"Deployments"** tab
2. Click the **"..."** menu on the latest deployment
3. Click **"Redeploy"**
4. Wait for deployment to complete (2-3 minutes)

---

## ✅ Verification

After redeploying, test your setup:

1. **Check Health Endpoint:**
   - Visit: `https://your-site.vercel.app/api/health`
   - Should show all services as `true`

2. **Test Form Submission:**
   - Fill out the lead form on your site
   - Submit it
   - Check your Google Sheet - should see the new lead

3. **Test Chatbot:**
   - Open the chatbot on your site
   - Ask a question
   - Should get an AI response

---

## ⚠️ Important Security Notes

1. ✅ **Credentials are now secure** - They're only in Vercel, not in your code
2. ✅ **Never commit credentials** - They're in `.gitignore`
3. ✅ **Regenerate if exposed** - If any key was exposed, regenerate it
4. ✅ **Keep this file private** - Don't share this file publicly

---

## 🆘 Troubleshooting

If something doesn't work:
1. Check Vercel logs for errors
2. Verify all variables are set correctly
3. Make sure you redeployed after adding variables
4. Check that Google Sheet is shared with service account email

---

**Done! Your credentials are now securely configured in Vercel.** 🎉

