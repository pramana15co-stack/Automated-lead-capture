# 🔒 Secure Vercel Credentials Setup

**IMPORTANT:** Follow these steps to securely add your credentials to Vercel. Never commit credentials to Git.

---

## 📋 Your Credentials Checklist

Before starting, make sure you have:
- ✅ Google Sheet ID
- ✅ Google Sheets Service Account JSON
- ✅ OpenAI API Key
- ✅ Gmail App Password (16 characters)
- ✅ Your email address

---

## 🚀 Step-by-Step Setup

### Step 1: Go to Vercel Dashboard
1. Visit: https://vercel.com/dashboard
2. Log in to your account
3. Click on your project: **"Automated-lead-capture"**

### Step 2: Navigate to Environment Variables
1. Click **"Settings"** (top navigation)
2. Click **"Environment Variables"** (left sidebar)

### Step 3: Add All Variables

Add each variable **one by one** for **Production** environment:

#### 1. GOOGLE_SHEET_ID
- **Name:** `GOOGLE_SHEET_ID`
- **Value:** Your Google Sheet ID (from the URL)
- **Environment:** ✅ Production
- Click **"Save"**

#### 2. GOOGLE_SHEETS_CREDENTIALS
- **Name:** `GOOGLE_SHEETS_CREDENTIALS`
- **Value:** Paste your ENTIRE JSON from the service account file (all on one line, no line breaks)
- **Environment:** ✅ Production
- Click **"Save"**

#### 3. AI_API_KEY
- **Name:** `AI_API_KEY`
- **Value:** Your OpenAI API key (starts with `sk-proj-`)
- **Environment:** ✅ Production
- Click **"Save"**

#### 4. OPENAI_API_KEY
- **Name:** `OPENAI_API_KEY`
- **Value:** Same as AI_API_KEY above
- **Environment:** ✅ Production
- Click **"Save"**

#### 5. SMTP_HOST
- **Name:** `SMTP_HOST`
- **Value:** `smtp.gmail.com`
- **Environment:** ✅ Production
- Click **"Save"**

#### 6. SMTP_PORT
- **Name:** `SMTP_PORT`
- **Value:** `587`
- **Environment:** ✅ Production
- Click **"Save"**

#### 7. SMTP_SECURE
- **Name:** `SMTP_SECURE`
- **Value:** `false`
- **Environment:** ✅ Production
- Click **"Save"**

#### 8. SMTP_USER
- **Name:** `SMTP_USER`
- **Value:** `pramana15.co@gmail.com`
- **Environment:** ✅ Production
- Click **"Save"**

#### 9. SMTP_PASS
- **Name:** `SMTP_PASS`
- **Value:** Your 16-character Gmail App Password
- **Environment:** ✅ Production
- Click **"Save"**

#### 10. SMTP_PASSWORD
- **Name:** `SMTP_PASSWORD`
- **Value:** Same as SMTP_PASS
- **Environment:** ✅ Production
- Click **"Save"**

#### 11. OWNER_EMAIL
- **Name:** `OWNER_EMAIL`
- **Value:** `pramana15.co@gmail.com`
- **Environment:** ✅ Production
- Click **"Save"**

#### 12. EMAIL_FROM_NAME (Optional)
- **Name:** `EMAIL_FROM_NAME`
- **Value:** `Pramana15`
- **Environment:** ✅ Production
- Click **"Save"**

#### 13. OPENAI_MODEL (Optional)
- **Name:** `OPENAI_MODEL`
- **Value:** `gpt-3.5-turbo`
- **Environment:** ✅ Production
- Click **"Save"**

### Step 4: Redeploy
1. Go to **"Deployments"** tab
2. Click **"..."** menu on latest deployment
3. Click **"Redeploy"**
4. Wait 2-3 minutes for deployment

---

## ✅ Verification

After redeploying:

1. **Check Health:**
   - Visit: `https://your-site.vercel.app/api/health`
   - All services should show `true`

2. **Test Form:**
   - Fill out the lead form
   - Submit it
   - Check your Google Sheet for the new lead

3. **Test Chatbot:**
   - Open chatbot on your site
   - Ask a question
   - Should get an AI response

---

## 🔒 Security Best Practices

✅ **DO:**
- Add credentials only to Vercel environment variables
- Keep credentials secure and private
- Regenerate keys if exposed
- Use different keys for development and production

❌ **DON'T:**
- Commit credentials to Git
- Share credentials publicly
- Use production keys in development
- Store credentials in code files

---

## 🆘 Troubleshooting

**If services show `false` in health check:**
1. Verify all variables are set correctly
2. Check for typos in variable names
3. Ensure JSON is on one line (no line breaks)
4. Redeploy after adding variables

**If form doesn't save to Google Sheets:**
1. Verify service account email is shared with the sheet
2. Check Sheet ID is correct
3. Ensure service account has "Editor" permission

**If chatbot doesn't work:**
1. Verify OpenAI API key is correct
2. Check account has credits
3. Ensure key hasn't expired

---

**Your credentials are now securely configured!** 🎉

