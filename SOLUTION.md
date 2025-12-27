# 🎯 Complete Solution - Make Everything Work

## 📋 What You Need

You need to set up 3 credentials:
1. **Google Sheets Service Account** (to store leads)
2. **Gmail App Password** (to send emails)
3. **OpenAI API Key** (for chatbot)

---

## ✅ STEP 1: Google Sheets Service Account (5 minutes)

### 1.1 Create Google Cloud Project
1. Go to: **https://console.cloud.google.com/**
2. Click **"Select a project"** → **"New Project"**
3. Project name: **"Lead Capture System"**
4. Click **"Create"**

### 1.2 Enable Google Sheets API
1. In Google Cloud Console, go to **"APIs & Services"** → **"Library"**
2. Search: **"Google Sheets API"**
3. Click on it → Click **"Enable"**

### 1.3 Create Service Account
1. Go to **"APIs & Services"** → **"Credentials"**
2. Click **"Create Credentials"** → **"Service Account"**
3. Service account name: **"lead-capture-service"**
4. Click **"Create and Continue"**
5. Skip optional steps, click **"Done"**

### 1.4 Create Service Account Key
1. Click on the service account you just created
2. Go to **"Keys"** tab
3. Click **"Add Key"** → **"Create new key"**
4. Select **"JSON"**
5. Click **"Create"** (this downloads a JSON file)
6. **SAVE THIS FILE** - you'll need it!

### 1.5 Share Google Sheet with Service Account
1. Open the downloaded JSON file
2. Find **`"client_email"`** (looks like: `xxx@xxx.iam.gserviceaccount.com`)
3. Copy that email address
4. Open your Google Sheet: **https://docs.google.com/spreadsheets/d/1f1FoDZqAxOdsdm6fF9qcAkYD-SY7QZIOkBrMV-I1Hms/edit**
5. Click **"Share"** button (top right)
6. Paste the service account email
7. Select **"Editor"** permission
8. **Uncheck "Notify people"** (service account doesn't need notifications)
9. Click **"Share"**

**✅ You now have**: Google Sheets JSON credentials file

---

## ✅ STEP 2: Gmail App Password (2 minutes)

### 2.1 Enable 2-Factor Authentication
1. Go to: **https://myaccount.google.com/security**
2. Under **"Signing in to Google"**, find **"2-Step Verification"**
3. If not enabled, click it and follow setup (you'll need your phone)

### 2.2 Generate App Password
1. Go to: **https://myaccount.google.com/apppasswords**
2. Select app: **"Mail"**
3. Select device: **"Other (Custom name)"**
4. Enter name: **"Lead Capture System"**
5. Click **"Generate"**
6. **Copy the 16-character password** (looks like: `abcd efgh ijkl mnop`)
7. **Remove spaces**: `abcdefghijklmnop`
8. **SAVE THIS PASSWORD** - you'll need it!

**✅ You now have**: Gmail App Password (16 characters, no spaces)

---

## ✅ STEP 3: OpenAI API Key (2 minutes)

### 3.1 Create OpenAI Account
1. Go to: **https://platform.openai.com/**
2. Sign up or log in
3. Add payment method (required for API access)

### 3.2 Generate API Key
1. Go to: **https://platform.openai.com/api-keys**
2. Click **"Create new secret key"**
3. Name: **"Lead Capture Chatbot"**
4. Click **"Create secret key"**
5. **Copy the key immediately** (starts with `sk-proj-` or `sk-`)
6. **SAVE THIS KEY** - you won't see it again!

**✅ You now have**: OpenAI API Key

---

## ✅ STEP 4: Create `.env.local` File

### 4.1 Create the File
In your project root (`C:\Users\Yash\OneDrive\Desktop\WORK\Freenlancing`), create a file named `.env.local`

**Windows PowerShell:**
```powershell
New-Item -Path ".env.local" -ItemType File
```

**Or just create it manually** in your code editor.

### 4.2 Add All Variables
Open `.env.local` and paste this:

```env
# Google Sheets Configuration
GOOGLE_SHEET_ID=1f1FoDZqAxOdsdm6fF9qcAkYD-SY7QZIOkBrMV-I1Hms
GOOGLE_SHEETS_CREDENTIALS={"type":"service_account","project_id":"YOUR_PROJECT_ID","private_key_id":"xxx","private_key":"-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY\n-----END PRIVATE KEY-----\n","client_email":"YOUR_SERVICE_ACCOUNT@YOUR_PROJECT.iam.gserviceaccount.com","client_id":"xxx","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_x509_cert_url":"xxx"}

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

### 4.3 Replace the Placeholders

**A. Replace `GOOGLE_SHEETS_CREDENTIALS`:**
1. Open the JSON file you downloaded in Step 1.4
2. Copy the **ENTIRE** content (everything, including `{` and `}`)
3. Paste it in `.env.local` replacing the placeholder
4. **Keep it as one line** (or properly formatted JSON)

**B. Replace `SMTP_PASS` and `SMTP_PASSWORD`:**
- Use the App Password from Step 2.2
- Remove spaces: `abcdefghijklmnop`

**C. Replace `AI_API_KEY` and `OPENAI_API_KEY`:**
- Use the API key from Step 3.2
- Should start with `sk-proj-` or `sk-`

---

## ✅ STEP 5: Install Dependencies

Open terminal in your project folder and run:

```bash
npm install
```

Wait for it to complete.

---

## ✅ STEP 6: Start the Server

```bash
npm run dev
```

You should see:
```
✓ Ready in X seconds
○ Local: http://localhost:3000
```

---

## ✅ STEP 7: Test Everything

### 7.1 Test API Health
1. Open browser: **http://localhost:3000/api/health**
2. Should see JSON: `{"status":"ok",...}`

### 7.2 Test Form Submission
1. Open: **http://localhost:3000**
2. Fill out the form:
   - **Name**: Test User
   - **Email**: your-email@example.com
   - **Phone**: 1234567890
   - **Service**: Business Coaching
3. Click **"Book a Free Consultation"**
4. **Check**:
   - ✅ Success message appears
   - ✅ Google Sheet has new row (check your sheet)
   - ✅ Email received (check pramana15.co@gmail.com inbox)

### 7.3 Test Chatbot
1. Click chatbot icon (bottom right)
2. Type: **"What services do you offer?"**
3. Should get a response

---

## ✅ STEP 8: Deploy to Vercel (Optional)

### 8.1 Push to GitHub
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### 8.2 Deploy to Vercel
1. Go to: **https://vercel.com/**
2. Sign up/Login with GitHub
3. Click **"Add New"** → **"Project"**
4. Import repository: `pramana15co-stack/Automated-lead-capture`
5. Click **"Deploy"**

### 8.3 Add Environment Variables in Vercel
1. In Vercel project, go to **Settings** → **Environment Variables**
2. Add each variable (same values as `.env.local`):

| Name | Value |
|------|-------|
| `GOOGLE_SHEET_ID` | `1f1FoDZqAxOdsdm6fF9qcAkYD-SY7QZIOkBrMV-I1Hms` |
| `GOOGLE_SHEETS_CREDENTIALS` | `{paste entire JSON}` |
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

3. Click **"Save"** for each variable

### 8.4 Redeploy
1. Go to **Deployments** tab
2. Click **"..."** on latest deployment → **"Redeploy"**
3. Wait for deployment to complete

---

## 🐛 Troubleshooting

### Issue: "Google Sheets credentials not configured"
**Solution**:
- Check `GOOGLE_SHEETS_CREDENTIALS` is set in `.env.local`
- Verify JSON is valid (no syntax errors)
- Make sure service account email has access to sheet
- Check sheet ID is correct

### Issue: "Email authentication failed"
**Solution**:
- **MUST use App Password** (not regular Gmail password)
- Verify 2FA is enabled on Gmail
- Check `SMTP_PASS` has no spaces
- Verify `SMTP_USER` is correct email

### Issue: "OpenAI API error"
**Solution**:
- Check API key is correct
- Verify OpenAI account has credits
- Check API key hasn't expired
- Make sure key starts with `sk-`

### Issue: "Form submission error"
**Solution**:
1. Open browser console (F12)
2. Check error message
3. Verify all environment variables are set
4. Check server terminal for errors
5. Test `/api/health` endpoint

### Issue: "Network error"
**Solution**:
- Verify dev server is running (`npm run dev`)
- Check API URL is correct
- Test `/api/health` endpoint
- Check firewall/antivirus isn't blocking

---

## ✅ Complete Checklist

- [ ] Google Cloud project created
- [ ] Google Sheets API enabled
- [ ] Service account created
- [ ] Service account JSON downloaded
- [ ] Google Sheet shared with service account email
- [ ] Gmail 2FA enabled
- [ ] Gmail App Password generated
- [ ] OpenAI account created
- [ ] OpenAI API key generated
- [ ] `.env.local` file created
- [ ] All variables added to `.env.local`
- [ ] `npm install` completed
- [ ] `npm run dev` runs successfully
- [ ] `/api/health` returns OK
- [ ] Form submission works
- [ ] Google Sheet receives data
- [ ] Confirmation email received
- [ ] Owner notification email received
- [ ] Chatbot responds
- [ ] Deployed to Vercel (optional)
- [ ] Production works (optional)

---

## 📝 Quick Reference

### Your Current Values (Already Set)
```env
GOOGLE_SHEET_ID=1f1FoDZqAxOdsdm6fF9qcAkYD-SY7QZIOkBrMV-I1Hms
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=pramana15.co@gmail.com
OWNER_EMAIL=pramana15.co@gmail.com
```

### What You Need to Get
1. ✅ Google Sheets JSON credentials (Step 1)
2. ✅ Gmail App Password (Step 2)
3. ✅ OpenAI API Key (Step 3)

---

## 🎯 Summary

1. **Get 3 credentials** (Google Sheets JSON, Gmail App Password, OpenAI Key)
2. **Create `.env.local`** file with all variables
3. **Run `npm install`** and `npm run dev`**
4. **Test everything** works
5. **Deploy to Vercel** (optional)

**That's it!** Follow these steps and everything will work! 🚀



