# 🚀 Quick Deployment Guide

## Push to GitHub (2 minutes)

```bash
# 1. Initialize (if needed)
git init

# 2. Add remote
git remote add origin https://github.com/YOUR_USERNAME/lead-capture-automation.git

# 3. Commit and push
git add .
git commit -m "Initial commit"
git branch -M main
git push -u origin main
```

**Or use the setup script:**
- **Windows**: `powershell scripts/setup-github.ps1`
- **Mac/Linux**: `bash scripts/setup-github.sh`

---

## Deploy Backend (5 minutes)

### Railway (Easiest) ⭐

1. Go to [railway.app](https://railway.app)
2. **New Project** → **Deploy from GitHub**
3. Select your repo
4. Add environment variables (see below)
5. Done! Get your backend URL

### Render

1. Go to [render.com](https://render.com)
2. **New Web Service** → Connect GitHub
3. **Build**: `npm install`
4. **Start**: `node server/index.js`
5. Add environment variables
6. Deploy!

---

## Deploy Frontend (5 minutes)

### Vercel ⭐

1. Go to [vercel.com](https://vercel.com)
2. **Import Project** → Select repo
3. **Root Directory**: `client`
4. **Build Command**: `npm run build`
5. **Output**: `build`
6. Add env var: `REACT_APP_API_URL=https://your-backend-url.com`
7. Deploy!

---

## Environment Variables

### Backend (Railway/Render)

```
NODE_ENV=production
GOOGLE_SHEETS_CREDENTIALS={"type":"service_account",...}
GOOGLE_SHEET_ID=your_sheet_id
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password
EMAIL_FROM_NAME=Your Business
OWNER_EMAIL=your_email@gmail.com
FRONTEND_URL=https://your-frontend-url.com
```

### Frontend (Vercel)

```
REACT_APP_API_URL=https://your-backend-url.com
```

---

## ✅ Test After Deployment

1. Visit frontend URL
2. Submit test form
3. Check Google Sheets
4. Check emails
5. Test chatbot
6. Visit `/admin` route

---

**Full guides**: See `GITHUB_SETUP.md` and `DEPLOYMENT.md`


