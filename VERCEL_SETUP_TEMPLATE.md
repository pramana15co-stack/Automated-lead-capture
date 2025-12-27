# 🔒 Vercel Environment Variables Setup Template

**IMPORTANT:** This is a template. Replace all placeholder values with your actual credentials.

---

## 📝 Step-by-Step: Add to Vercel

### Step 1: Go to Vercel Dashboard
1. Visit: https://vercel.com/dashboard
2. Log in to your account
3. Find and click on your project

### Step 2: Navigate to Environment Variables
1. Click on **"Settings"** (top navigation)
2. Click on **"Environment Variables"** (left sidebar)

### Step 3: Add Each Variable

Add these variables **one by one** for **Production** environment:

#### Variable 1: GOOGLE_SHEET_ID
- **Name:** `GOOGLE_SHEET_ID`
- **Value:** `YOUR_SHEET_ID_HERE`
- **Environment:** Select **Production**
- Click **"Save"**

#### Variable 2: GOOGLE_SHEETS_CREDENTIALS
- **Name:** `GOOGLE_SHEETS_CREDENTIALS`
- **Value:** `YOUR_COMPLETE_JSON_HERE` (paste entire JSON as single line)
- **Environment:** Select **Production**
- Click **"Save"**

#### Variable 3: AI_API_KEY
- **Name:** `AI_API_KEY`
- **Value:** `YOUR_OPENAI_API_KEY_HERE`
- **Environment:** Select **Production**
- Click **"Save"**

#### Variable 4: OPENAI_API_KEY
- **Name:** `OPENAI_API_KEY`
- **Value:** Same as AI_API_KEY
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
- **Value:** `your-email@gmail.com`
- **Environment:** Select **Production**
- Click **"Save"**

#### Variable 9: SMTP_PASS
- **Name:** `SMTP_PASS`
- **Value:** `YOUR_16_CHAR_APP_PASSWORD`
- **Environment:** Select **Production**
- Click **"Save"**

#### Variable 10: SMTP_PASSWORD
- **Name:** `SMTP_PASSWORD`
- **Value:** Same as SMTP_PASS
- **Environment:** Select **Production**
- Click **"Save"**

#### Variable 11: OWNER_EMAIL
- **Name:** `OWNER_EMAIL`
- **Value:** `your-email@gmail.com`
- **Environment:** Select **Production**
- Click **"Save"**

#### Variable 12: EMAIL_FROM_NAME (optional)
- **Name:** `EMAIL_FROM_NAME`
- **Value:** `Your Company Name`
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
4. Wait for deployment to complete

---

## ✅ Verification

After redeploying, test your setup:
1. Visit: `https://your-site.vercel.app/api/health`
2. Should show all services as `true`
3. Test form submission and chatbot

---

**⚠️ Keep your actual credentials secure and never commit them to Git!**


