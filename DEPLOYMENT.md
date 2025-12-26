# Deployment Guide

This guide covers deploying the Lead Capture & Automation System to various platforms.

## Pre-Deployment Checklist

- [ ] All environment variables configured
- [ ] Google Sheets integration tested
- [ ] Email sending tested
- [ ] Frontend builds successfully
- [ ] API endpoints tested

## Option 1: Deploy to Heroku

### Backend Deployment

1. **Install Heroku CLI**:
   ```bash
   # macOS
   brew tap heroku/brew && brew install heroku
   
   # Windows
   # Download from https://devcenter.heroku.com/articles/heroku-cli
   ```

2. **Login to Heroku**:
   ```bash
   heroku login
   ```

3. **Create Heroku App**:
   ```bash
   heroku create your-app-name
   ```

4. **Set Environment Variables**:
   ```bash
   heroku config:set PORT=5000
   heroku config:set NODE_ENV=production
   heroku config:set GOOGLE_SHEETS_CREDENTIALS='{"type":"service_account",...}'
   heroku config:set GOOGLE_SHEET_ID=your_sheet_id
   heroku config:set SMTP_HOST=smtp.gmail.com
   heroku config:set SMTP_PORT=587
   heroku config:set SMTP_SECURE=false
   heroku config:set SMTP_USER=your_email@gmail.com
   heroku config:set SMTP_PASSWORD=your_app_password
   heroku config:set EMAIL_FROM_NAME="Your Business"
   heroku config:set OWNER_EMAIL=your_email@gmail.com
   ```

5. **Update package.json** (add start script):
   ```json
   "scripts": {
     "start": "node server/index.js"
   }
   ```

6. **Deploy**:
   ```bash
   git push heroku main
   ```

### Frontend Deployment (Vercel)

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Build and Deploy**:
   ```bash
   cd client
   npm run build
   vercel
   ```

3. **Update API URLs**:
   - In `client/src/components/LeadCaptureForm.js`
   - Change `/api/leads` to `https://your-heroku-app.herokuapp.com/api/leads`
   - Same for Chatbot and AdminDashboard

---

## Option 2: Deploy to Railway

### Backend

1. **Connect GitHub** to Railway
2. **Create New Project** from GitHub repo
3. **Add Environment Variables** in Railway dashboard
4. **Set Root Directory** to `/` (or create `railway.json`)
5. **Deploy** automatically on push

### Frontend

1. Deploy to **Vercel** or **Netlify** (see below)
2. Update API URLs to Railway backend URL

---

## Option 3: Deploy to Render

### Backend

1. **Create New Web Service** on Render
2. **Connect GitHub** repository
3. **Build Command**: `npm install`
4. **Start Command**: `node server/index.js`
5. **Add Environment Variables** in dashboard
6. **Deploy**

### Frontend

Deploy separately to Vercel/Netlify

---

## Frontend Deployment: Vercel

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Navigate to client directory**:
   ```bash
   cd client
   ```

3. **Deploy**:
   ```bash
   vercel
   ```

4. **Configure**:
   - Build Command: `npm run build`
   - Output Directory: `build`
   - Install Command: `npm install`

5. **Update API URLs**:
   - Create `client/.env.production`:
     ```env
     REACT_APP_API_URL=https://your-backend-url.com
     ```
   - Update axios calls to use `process.env.REACT_APP_API_URL`

---

## Frontend Deployment: Netlify

1. **Install Netlify CLI**:
   ```bash
   npm i -g netlify-cli
   ```

2. **Build**:
   ```bash
   cd client
   npm run build
   ```

3. **Deploy**:
   ```bash
   netlify deploy --prod --dir=build
   ```

4. **Or use Netlify Dashboard**:
   - Connect GitHub
   - Build command: `cd client && npm install && npm run build`
   - Publish directory: `client/build`

---

## Updating API URLs for Production

### Method 1: Environment Variables

1. Create `client/.env.production`:
   ```env
   REACT_APP_API_URL=https://your-backend.herokuapp.com
   ```

2. Update API calls in components:
   ```javascript
   const API_URL = process.env.REACT_APP_API_URL || '';
   axios.post(`${API_URL}/api/leads`, formData)
   ```

### Method 2: Direct URL Replacement

Update these files:
- `client/src/components/LeadCaptureForm.js`
- `client/src/components/Chatbot.js`
- `client/src/components/AdminDashboard.js`

Change:
```javascript
axios.post('/api/leads', ...)
```

To:
```javascript
axios.post('https://your-backend-url.com/api/leads', ...)
```

---

## CORS Configuration

If frontend and backend are on different domains, update CORS in `server/index.js`:

```javascript
app.use(cors({
  origin: ['https://your-frontend-domain.com', 'http://localhost:3000'],
  credentials: true
}));
```

---

## Environment Variables for Production

Set these in your hosting platform:

### Required:
- `PORT` (usually auto-set by platform)
- `NODE_ENV=production`
- `GOOGLE_SHEETS_CREDENTIALS`
- `GOOGLE_SHEET_ID`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_SECURE`
- `SMTP_USER`
- `SMTP_PASSWORD`
- `EMAIL_FROM_NAME`
- `OWNER_EMAIL`

### Optional:
- `OPENAI_API_KEY` (if using OpenAI chatbot)

---

## Post-Deployment Testing

1. **Test Landing Page**: Visit frontend URL
2. **Test Form Submission**: Submit a test lead
3. **Check Google Sheets**: Verify lead appears
4. **Check Emails**: Verify confirmation and notification emails
5. **Test Chatbot**: Ask a question
6. **Test Admin Dashboard**: Visit `/admin` route

---

## Monitoring & Logs

### Heroku:
```bash
heroku logs --tail
```

### Railway:
- View logs in dashboard

### Render:
- View logs in dashboard

---

## SSL/HTTPS

Most platforms (Heroku, Vercel, Netlify, Railway) provide SSL automatically.

For custom domains:
- **Heroku**: Add domain in dashboard
- **Vercel**: Add domain in project settings
- **Netlify**: Add domain in site settings

---

## Troubleshooting

### "Cannot find module"
- Ensure all dependencies are in `package.json`
- Run `npm install` before deploying

### "Port already in use"
- Remove hardcoded port, use `process.env.PORT`

### "CORS error"
- Update CORS settings in `server/index.js`
- Add frontend URL to allowed origins

### "Environment variable not found"
- Check variable names match exactly
- Verify variables are set in hosting platform
- Restart app after adding variables

---

## Quick Deploy Scripts

### Heroku Quick Deploy:
```bash
#!/bin/bash
heroku create your-app-name
heroku config:set NODE_ENV=production
# Add other config vars...
git push heroku main
```

### Vercel Quick Deploy:
```bash
cd client
vercel --prod
```

---

## Cost Estimates

- **Heroku**: Free tier available (with limitations)
- **Railway**: $5/month starter plan
- **Render**: Free tier available
- **Vercel**: Free tier for frontend
- **Netlify**: Free tier for frontend

---

## Recommended Setup

**For Production**:
- Backend: Railway or Render (better free tier)
- Frontend: Vercel (excellent for React)
- Database: Google Sheets (free) or upgrade to Airtable/Notion

**For Development**:
- Local development with `npm run dev`


