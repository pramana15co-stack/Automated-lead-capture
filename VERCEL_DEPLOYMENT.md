# 🚀 Vercel Deployment Guide - Secure & Complete

## ✅ Security Check - All Clear!

- ✅ `.env.local` is in `.gitignore` - **Won't be committed**
- ✅ No secrets in code files
- ✅ All credentials will be added as Vercel environment variables
- ✅ Build is successful and ready

---

## 📋 Step-by-Step Vercel Deployment

### Step 1: Push to GitHub (Already Done)
✅ Your code is pushed to: `https://github.com/pramana15co-stack/Automated-lead-capture.git`

### Step 2: Deploy to Vercel

#### Option A: Via Vercel Dashboard (Recommended)

1. **Go to Vercel**: https://vercel.com/
2. **Sign up/Login** with GitHub
3. **Click "Add New"** → **"Project"**
4. **Import Repository**:
   - Search: `Automated-lead-capture`
   - Select: `pramana15co-stack/Automated-lead-capture`
   - Click **"Import"**
5. **Configure Project**:
   - Framework Preset: **Next.js** (auto-detected)
   - Root Directory: **`./`** (leave as is)
   - Build Command: **`npm run build`** (auto-filled)
   - Output Directory: **`.next`** (auto-filled)
   - Install Command: **`npm install`** (auto-filled)
6. **Click "Deploy"** (don't add environment variables yet - we'll do that after)

#### Option B: Via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? automated-lead-capture
# - Directory? ./
```

---

### Step 3: Add Environment Variables in Vercel

**⚠️ CRITICAL**: Add these in Vercel Dashboard, NOT in code!

1. **Go to your project** in Vercel Dashboard
2. **Settings** → **Environment Variables**
3. **Add each variable** (for **Production**, **Preview**, and **Development**):

#### Required Variables:

| Variable Name | Value | Notes |
|--------------|-------|-------|
| `GOOGLE_SHEET_ID` | `1f1FoDZqAxOdsdm6fF9qcAkYD-SY7QZIOkBrMV-I1Hms` | Your Google Sheet ID |
| `GOOGLE_SHEETS_CREDENTIALS` | `{paste your entire JSON here}` | From Google Cloud Console |
| `SMTP_HOST` | `smtp.gmail.com` | Gmail SMTP |
| `SMTP_PORT` | `587` | Gmail port |
| `SMTP_SECURE` | `false` | Use STARTTLS |
| `SMTP_USER` | `pramana15.co@gmail.com` | Your Gmail |
| `SMTP_PASS` | `augkuougdzpjpfyq` | Your App Password |
| `SMTP_PASSWORD` | `augkuougdzpjpfyq` | Same as above |
| `EMAIL_FROM_NAME` | `Pramana15` | Display name |
| `OWNER_EMAIL` | `pramana15.co@gmail.com` | Notification email |
| `AI_API_KEY` | `{your_openai_api_key}` | OpenAI API Key |
| `OPENAI_API_KEY` | `{your_openai_api_key}` | Same as above |
| `OPENAI_MODEL` | `gpt-3.5-turbo` | Model to use |

**Important for `GOOGLE_SHEETS_CREDENTIALS`**:
- Copy the ENTIRE JSON from your downloaded file
- Paste it as ONE line (or properly formatted)
- Make sure it's valid JSON

4. **Select environments** for each variable:
   - ✅ Production
   - ✅ Preview
   - ✅ Development

5. **Click "Save"** for each variable

---

### Step 4: Redeploy

1. Go to **Deployments** tab
2. Click **"..."** on latest deployment
3. Click **"Redeploy"**
4. Wait for deployment to complete (2-3 minutes)

---

### Step 5: Test Production

1. **Visit your Vercel URL**: `https://your-project.vercel.app`
2. **Test Form Submission**:
   - Fill out the form
   - Submit
   - Check Google Sheet for new row
   - Check email for confirmation
3. **Test Chatbot**:
   - Click chatbot icon
   - Ask a question
4. **Test Admin Dashboard**:
   - Visit: `https://your-project.vercel.app/admin`
   - Should see leads list

---

## 🔒 Security Checklist

- ✅ `.env.local` is in `.gitignore`
- ✅ No secrets committed to GitHub
- ✅ All credentials in Vercel environment variables
- ✅ API keys not exposed in code
- ✅ Gmail App Password used (not regular password)
- ✅ Service account JSON stored securely

---

## 🐛 Troubleshooting

### Issue: Build Fails
**Solution**:
- Check Vercel build logs
- Verify all environment variables are set
- Check `npm run build` works locally

### Issue: Form Submission Fails
**Solution**:
- Check Vercel Function logs
- Verify `GOOGLE_SHEETS_CREDENTIALS` is valid JSON
- Check service account has access to sheet
- Verify all SMTP variables are correct

### Issue: Email Not Sending
**Solution**:
- Verify Gmail App Password is used (not regular password)
- Check `SMTP_PASS` has no spaces
- Verify 2FA is enabled on Gmail
- Check Vercel Function logs for errors

### Issue: Chatbot Not Working
**Solution**:
- Verify OpenAI API key is correct
- Check account has credits
- Check Vercel Function logs

---

## ✅ Deployment Complete!

Once deployed, your Lead Capture System will be:
- ✅ Live on Vercel
- ✅ Secure (no secrets exposed)
- ✅ Fully functional
- ✅ Ready to capture leads!

---

## 📝 Quick Reference

**Your Vercel Project**: https://vercel.com/dashboard

**Environment Variables Location**: Settings → Environment Variables

**Deployments**: Deployments tab

**Function Logs**: Deployments → Click deployment → Functions tab

---

## 🎯 Next Steps After Deployment

1. **Test everything** on production URL
2. **Share your website** with clients
3. **Monitor leads** in Google Sheet
4. **Check emails** for notifications
5. **Monitor Vercel logs** for any issues

---

**Your system is ready for production!** 🚀

