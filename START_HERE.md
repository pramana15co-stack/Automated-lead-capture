# 🎯 START HERE - Complete Solution to Make Everything Work

## 📝 Quick Summary

You need to set up 3 things:
1. **Google Sheets Service Account** (for storing leads)
2. **Gmail App Password** (for sending emails)
3. **OpenAI API Key** (for chatbot)

Then create `.env.local` file with all credentials.

---

## 🚀 Step-by-Step Solution

### STEP 1: Google Sheets Setup (5 minutes)

1. **Go to Google Cloud Console**: https://console.cloud.google.com/
2. **Create Project**: Click "New Project" → Name: "Lead Capture" → Create
3. **Enable API**: 
   - Go to "APIs & Services" → "Library"
   - Search "Google Sheets API" → Enable
4. **Create Service Account**:
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "Service Account"
   - Name: "lead-capture" → Create
5. **Download JSON Key**:
   - Click on service account → "Keys" tab
   - "Add Key" → "Create new key" → JSON → Create
   - **Save the downloaded JSON file**
6. **Share Your Sheet**:
   - Open JSON file, find `"client_email"` (looks like: `xxx@xxx.iam.gserviceaccount.com`)
   - Open your Google Sheet: https://docs.google.com/spreadsheets/d/1f1FoDZqAxOdsdm6fF9qcAkYD-SY7QZIOkBrMV-I1Hms/edit
   - Click "Share" → Paste service account email → Give "Editor" access → Share

**✅ You now have**: Google Sheets JSON credentials

---

### STEP 2: Gmail App Password (2 minutes)

1. **Enable 2FA**: https://myaccount.google.com/security
   - Enable "2-Step Verification"
2. **Generate App Password**: https://myaccount.google.com/apppasswords
   - App: "Mail"
   - Device: "Other (Custom name)" → "Lead Capture"
   - Generate → **Copy the 16-character password**
   - Remove spaces (e.g., `abcdefghijklmnop`)

**✅ You now have**: Gmail App Password

---

### STEP 3: OpenAI API Key (2 minutes)

1. **Go to**: https://platform.openai.com/api-keys
2. **Create Key**: "Create new secret key"
3. **Name**: "Lead Capture Chatbot"
4. **Copy the key** (starts with `sk-proj-` or `sk-`)

**✅ You now have**: OpenAI API Key

---

### STEP 4: Create `.env.local` File (2 minutes)

In your project root (`C:\Users\Yash\OneDrive\Desktop\WORK\Freenlancing`), create file `.env.local`:

```env
# Google Sheets
GOOGLE_SHEET_ID=1f1FoDZqAxOdsdm6fF9qcAkYD-SY7QZIOkBrMV-I1Hms
GOOGLE_SHEETS_CREDENTIALS={"type":"service_account","project_id":"YOUR_PROJECT_ID","private_key_id":"xxx","private_key":"-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY\n-----END PRIVATE KEY-----\n","client_email":"YOUR_SERVICE_ACCOUNT@YOUR_PROJECT.iam.gserviceaccount.com","client_id":"xxx","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_x509_cert_url":"xxx"}

# Email (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=pramana15.co@gmail.com
SMTP_PASS=YOUR_GMAIL_APP_PASSWORD
SMTP_PASSWORD=YOUR_GMAIL_APP_PASSWORD
EMAIL_FROM_NAME=Pramana15
OWNER_EMAIL=pramana15.co@gmail.com

# OpenAI
AI_API_KEY=YOUR_OPENAI_API_KEY
OPENAI_API_KEY=YOUR_OPENAI_API_KEY
OPENAI_MODEL=gpt-3.5-turbo
```

**Replace**:
- `GOOGLE_SHEETS_CREDENTIALS`: Paste entire JSON from Step 1 (the downloaded file)
- `SMTP_PASS` and `SMTP_PASSWORD`: Your Gmail App Password from Step 2
- `AI_API_KEY` and `OPENAI_API_KEY`: Your OpenAI key from Step 3

---

### STEP 5: Install & Run (1 minute)

```bash
# Install dependencies
npm install

# Start server
npm run dev
```

Open: http://localhost:3000

---

### STEP 6: Test Everything

1. **Test Form**:
   - Fill out the form
   - Submit
   - ✅ Should show success message

2. **Check Google Sheet**:
   - Open your sheet
   - ✅ Should see new row with your data

3. **Check Email**:
   - Check inbox (pramana15.co@gmail.com)
   - ✅ Should receive confirmation email

4. **Test Chatbot**:
   - Click chatbot icon
   - Type: "What services do you offer?"
   - ✅ Should get response

---

### STEP 7: Deploy to Vercel

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Deploy to Vercel**:
   - Go to: https://vercel.com/
   - Import your GitHub repo
   - Add all environment variables (same as `.env.local`)
   - Deploy!

---

## ✅ Complete Checklist

- [ ] Google Sheets Service Account created
- [ ] JSON credentials downloaded
- [ ] Sheet shared with service account
- [ ] Gmail 2FA enabled
- [ ] Gmail App Password generated
- [ ] OpenAI API key created
- [ ] `.env.local` file created with all variables
- [ ] `npm install` completed
- [ ] `npm run dev` runs successfully
- [ ] Form submission works
- [ ] Google Sheet receives data
- [ ] Emails are sent
- [ ] Chatbot responds
- [ ] Deployed to Vercel
- [ ] Production works

---

## 🐛 If Something Doesn't Work

### Form Shows Error
1. Open browser console (F12)
2. Check error message
3. Verify all environment variables are set
4. Check server logs

### Google Sheets Not Working
- Verify service account email has access to sheet
- Check JSON credentials are correct
- Make sure sheet has headers: Name, Email, Phone, Service, Date, Status

### Email Not Sending
- **MUST use App Password** (not regular password)
- Verify 2FA is enabled
- Check `SMTP_PASS` has no spaces
- Verify email address is correct

### Chatbot Not Working
- Check API key is correct
- Verify OpenAI account has credits
- Check API key hasn't expired

---

## 📚 Detailed Guides

- **Complete Setup**: `COMPLETE_SETUP_GUIDE.md`
- **Environment Variables**: `ENVIRONMENT_VARIABLES_GUIDE.md`
- **Troubleshooting**: `TROUBLESHOOTING.md`
- **Quick Start**: `QUICK_START.md`

---

## 🎯 Your Current Values (Already Set)

```env
GOOGLE_SHEET_ID=1f1FoDZqAxOdsdm6fF9qcAkYD-SY7QZIOkBrMV-I1Hms
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=pramana15.co@gmail.com
OWNER_EMAIL=pramana15.co@gmail.com
```

**You only need to add**:
1. Google Sheets JSON credentials
2. Gmail App Password
3. OpenAI API Key

---

## ✨ That's It!

Follow these steps and everything will work! 🚀


