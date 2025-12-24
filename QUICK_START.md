# ⚡ Quick Start - Get Running in 10 Minutes

## Fastest Way to Get Everything Working

### 1. Install Dependencies (1 min)
```bash
npm install
```

### 2. Get Your Credentials (5 min)

#### A. Google Sheets Service Account
1. Go to: https://console.cloud.google.com/
2. Create project → Enable Google Sheets API
3. Create Service Account → Download JSON
4. Share your sheet with service account email

#### B. Gmail App Password
1. Go to: https://myaccount.google.com/apppasswords
2. Generate App Password for "Mail"
3. Copy 16-character password (remove spaces)

#### C. OpenAI API Key
1. Go to: https://platform.openai.com/api-keys
2. Create new secret key
3. Copy the key

### 3. Create `.env.local` File (2 min)

Create file `.env.local` in project root:

```env
GOOGLE_SHEET_ID=1f1FoDZqAxOdsdm6fF9qcAkYD-SY7QZIOkBrMV-I1Hms
GOOGLE_SHEETS_CREDENTIALS={paste your JSON here}
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=pramana15.co@gmail.com
SMTP_PASS=your_app_password_here
SMTP_PASSWORD=your_app_password_here
OWNER_EMAIL=pramana15.co@gmail.com
AI_API_KEY=your_openai_key_here
OPENAI_API_KEY=your_openai_key_here
OPENAI_MODEL=gpt-3.5-turbo
```

### 4. Start Server (1 min)
```bash
npm run dev
```

### 5. Test (1 min)
1. Open: http://localhost:3000
2. Submit test form
3. Check Google Sheet - should see new row
4. Check email - should receive confirmation

### 6. Deploy to Vercel (5 min)
1. Push to GitHub
2. Import in Vercel
3. Add same environment variables
4. Deploy!

---

## ✅ Done!

Your system is now live and capturing leads!
