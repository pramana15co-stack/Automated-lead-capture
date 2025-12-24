# 🔑 API Key Update Instructions

## ✅ Local Development - Updated

Your new API key has been updated in `.env.local`:
- `AI_API_KEY` = Updated
- `OPENAI_API_KEY` = Updated

**Restart your dev server** to use the new key:
```bash
# Stop current server (Ctrl+C if running)
npm run dev
```

---

## 🚀 Vercel Deployment - Update Required

### Step 1: Go to Vercel Dashboard
1. Visit: https://vercel.com/dashboard
2. Select your project: `Automated-lead-capture`

### Step 2: Update Environment Variables
1. Go to **Settings** → **Environment Variables**
2. Find `AI_API_KEY` → Click **Edit**
3. Replace with your new API key (starts with `sk-proj-`)
4. Click **Save**
5. Find `OPENAI_API_KEY` → Click **Edit**
6. Replace with the same new API key
7. Click **Save**

### Step 3: Redeploy
1. Go to **Deployments** tab
2. Click **"..."** on latest deployment
3. Click **"Redeploy"**
4. Wait for deployment (2-3 minutes)

---

## ✅ Verification

After updating:
1. **Local**: Test chatbot at http://localhost:3000
2. **Production**: Test chatbot on your Vercel URL

Both should work with the new API key!

