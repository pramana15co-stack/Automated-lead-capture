# GitHub Repository Setup Guide

Complete guide to push this project to GitHub and deploy it.

## 🚀 Quick Setup (5 minutes)

### Step 1: Initialize Git Repository

If you haven't already:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Lead Capture & Automation System"
```

### Step 2: Create GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the **+** icon → **New repository**
3. Repository name: `lead-capture-automation` (or your preferred name)
4. Description: `AI-assisted Lead Capture & Automation System for Service-Based Coaches`
5. Choose **Public** or **Private**
6. **DO NOT** initialize with README, .gitignore, or license (we already have these)
7. Click **Create repository**

### Step 3: Connect and Push

```bash
# Add GitHub remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/lead-capture-automation.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

**That's it!** Your code is now on GitHub. 🎉

---

## 📋 Pre-Push Checklist

Before pushing, make sure:

- [ ] `.env` file is in `.gitignore` (✅ already done)
- [ ] No sensitive data in code (API keys, passwords, etc.)
- [ ] All files are committed
- [ ] `env.example` file exists with placeholder values

---

## 🔐 Security: Environment Variables

**IMPORTANT**: Never commit your `.env` file!

The `.gitignore` file already excludes:
- `.env`
- `credentials.json`
- `service-account-key.json`

Your actual credentials should be:
- Stored in `.env` (local development)
- Set as environment variables in your hosting platform (production)

---

## 🚢 Deployment Options

Once your code is on GitHub, you can deploy to:

### Option 1: Railway (Recommended - Easiest)

1. Go to [Railway](https://railway.app)
2. Click **New Project** → **Deploy from GitHub**
3. Select your repository
4. Railway will auto-detect the setup
5. Add environment variables in Railway dashboard
6. Deploy!

**Railway automatically:**
- Detects Node.js project
- Runs `npm install`
- Starts with `node server/index.js`
- Provides HTTPS URL

### Option 2: Render

1. Go to [Render](https://render.com)
2. Click **New** → **Web Service**
3. Connect your GitHub repository
4. Settings:
   - **Build Command**: `npm install`
   - **Start Command**: `node server/index.js`
5. Add environment variables
6. Deploy!

### Option 3: Heroku

```bash
# Install Heroku CLI first
heroku login
heroku create your-app-name
git push heroku main
```

Then add environment variables in Heroku dashboard.

### Option 4: Vercel (Full Stack)

1. Go to [Vercel](https://vercel.com)
2. Import your GitHub repository
3. Vercel will auto-detect the setup
4. Add environment variables
5. Deploy!

---

## 🌐 Frontend Deployment

The frontend can be deployed separately:

### Vercel (Recommended for React)

1. Go to [Vercel](https://vercel.com)
2. Import repository
3. **Root Directory**: `client`
4. **Build Command**: `npm run build`
5. **Output Directory**: `build`
6. Add environment variable: `REACT_APP_API_URL=https://your-backend-url.com`
7. Deploy!

### Netlify

1. Go to [Netlify](https://netlify.com)
2. Connect GitHub repository
3. Settings:
   - **Base directory**: `client`
   - **Build command**: `npm run build`
   - **Publish directory**: `client/build`
4. Add environment variable: `REACT_APP_API_URL`
5. Deploy!

---

## 🔄 Continuous Deployment

### Automatic Deployments

Most platforms (Railway, Render, Vercel) automatically deploy when you push to `main` branch.

### Manual Deployment

```bash
# Make changes
git add .
git commit -m "Your changes"
git push origin main

# Platform will auto-deploy
```

---

## 📝 Environment Variables Setup

After deploying, add these environment variables in your hosting platform:

### Required:
```
NODE_ENV=production
PORT=5000 (or auto-set by platform)
GOOGLE_SHEETS_CREDENTIALS={"type":"service_account",...}
GOOGLE_SHEET_ID=your_sheet_id
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password
EMAIL_FROM_NAME=Your Business Name
OWNER_EMAIL=your_email@gmail.com
```

### For Frontend (if separate):
```
REACT_APP_API_URL=https://your-backend-url.com
```

---

## 🎯 Recommended Deployment Architecture

### Option A: Separate Frontend & Backend (Recommended)

- **Backend**: Railway or Render
- **Frontend**: Vercel or Netlify
- **Benefits**: 
  - Better performance
  - Independent scaling
  - CDN for frontend

### Option B: Full Stack on One Platform

- **Platform**: Railway or Render
- **Benefits**: 
  - Simpler setup
  - Single deployment
  - Easier to manage

---

## 🔍 Post-Deployment Checklist

After deploying:

- [ ] Test landing page loads
- [ ] Test form submission
- [ ] Verify lead appears in Google Sheets
- [ ] Check confirmation email received
- [ ] Check owner notification email
- [ ] Test chatbot responses
- [ ] Test admin dashboard
- [ ] Verify HTTPS is working
- [ ] Test on mobile device

---

## 🐛 Troubleshooting

### "Repository not found"
- Check repository name is correct
- Verify you have access to the repository
- Try using SSH instead: `git@github.com:USERNAME/REPO.git`

### "Permission denied"
- Make sure you're logged into GitHub
- Check SSH keys are set up (if using SSH)
- Use HTTPS with personal access token if needed

### Deployment fails
- Check build logs in hosting platform
- Verify all environment variables are set
- Ensure `package.json` has correct scripts
- Check Node.js version compatibility

### CORS errors
- Update CORS settings in `server/index.js`
- Add frontend URL to allowed origins
- Check environment variables are correct

---

## 📚 Additional Resources

- [GitHub Docs](https://docs.github.com)
- [Railway Docs](https://docs.railway.app)
- [Render Docs](https://render.com/docs)
- [Vercel Docs](https://vercel.com/docs)

---

## ✅ Next Steps

1. ✅ Push code to GitHub
2. ✅ Deploy backend to Railway/Render
3. ✅ Deploy frontend to Vercel/Netlify
4. ✅ Add environment variables
5. ✅ Test everything
6. ✅ Share your live URL!

---

**Your project is now ready for GitHub and deployment!** 🚀


