# ✅ Quick Setup Checklist

Follow this checklist in order. Check off each item as you complete it.

---

## 🔵 Part 1: Google Sheets (15-20 minutes)

- [ ] **Step 1:** Create a new Google Sheet
  - [ ] Name it "Lead Capture - Pramana15"
  - [ ] Copy the Sheet URL
  - [ ] Extract Sheet ID from URL (the part between `/d/` and `/edit`)

- [ ] **Step 2:** Go to [Google Cloud Console](https://console.cloud.google.com/)
  - [ ] Create new project: "Pramana15 Lead Capture"
  - [ ] Enable "Google Sheets API"

- [ ] **Step 3:** Create Service Account
  - [ ] Go to "Credentials" → "Create Credentials" → "Service Account"
  - [ ] Name: "lead-capture-service"
  - [ ] Create JSON key and download it
  - [ ] **SAVE THE JSON FILE** (you'll need it)

- [ ] **Step 4:** Share Google Sheet
  - [ ] Open your Google Sheet
  - [ ] Click "Share" button
  - [ ] Add the service account email (from JSON file: `client_email`)
  - [ ] Give it "Editor" permission
  - [ ] Click "Share"

**✅ Google Sheets Setup Complete!**

---

## 🤖 Part 2: OpenAI Chatbot (5-10 minutes)

- [ ] **Step 1:** Go to [OpenAI Platform](https://platform.openai.com/signup)
  - [ ] Sign up or log in
  - [ ] Add payment method (required for API access)

- [ ] **Step 2:** Create API Key
  - [ ] Go to [API Keys](https://platform.openai.com/api-keys)
  - [ ] Click "Create new secret key"
  - [ ] Name it "Pramana15 Chatbot"
  - [ ] **COPY THE KEY IMMEDIATELY** (starts with `sk-proj-`)
  - [ ] Save it securely

**✅ OpenAI Setup Complete!**

---

## 📧 Part 3: Gmail SMTP (5 minutes)

- [ ] **Step 1:** Enable 2FA on Gmail
  - [ ] Go to [Google Account Security](https://myaccount.google.com/security)
  - [ ] Enable "2-Step Verification"

- [ ] **Step 2:** Create App Password
  - [ ] Go to [App Passwords](https://myaccount.google.com/apppasswords)
  - [ ] Select "Mail" → "Other (Custom name)"
  - [ ] Name: "Pramana15 Lead Capture"
  - [ ] **COPY THE 16-CHARACTER PASSWORD**
  - [ ] Save it securely

**✅ Gmail Setup Complete!**

---

## 📝 Part 4: Prepare Information for Me

Once you've completed all steps above, you'll have:

1. ✅ **Google Sheet ID** (from URL)
2. ✅ **Google Sheets JSON** (downloaded file)
3. ✅ **OpenAI API Key** (from OpenAI dashboard)
4. ✅ **Gmail App Password** (16 characters)
5. ✅ **Your Email** (pramana15.co@gmail.com)

---

## 🔒 How to Provide Me the Information

**Option 1: Paste Here (I'll help you add to Vercel)**
Just paste in this format:

```
GOOGLE_SHEET_ID=your-sheet-id-here
GOOGLE_SHEETS_CREDENTIALS={"type":"service_account",...paste entire JSON...}
AI_API_KEY=sk-proj-your-key-here
SMTP_PASS=your-16-char-app-password
OWNER_EMAIL=pramana15.co@gmail.com
```

⚠️ **IMPORTANT:** Never paste real credentials in this file! I'll guide you to add them securely to Vercel.

**Option 2: I'll Guide You to Add Directly to Vercel**
Tell me when you're ready, and I'll give you exact step-by-step instructions.

---

## ⚠️ Security Reminders

- ❌ **NEVER** commit credentials to GitHub
- ❌ **NEVER** share credentials publicly
- ✅ **ONLY** add to Vercel environment variables
- ✅ Keep JSON file and passwords secure

---

## 🆘 Need Help?

If you get stuck at any step:
1. Check the detailed guide: `COMPLETE_SETUP_GUIDE.md`
2. Let me know which step you're on
3. I'll help you troubleshoot

---

**Ready to start? Begin with Part 1!** 🚀


