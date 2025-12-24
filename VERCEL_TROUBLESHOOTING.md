# 🔧 Vercel Deployment Troubleshooting Guide

## ❓ What's Not Working?

Please check which of these applies:

### 1. Build Failed
**Symptoms**: Deployment shows "Build Failed" in Vercel

**Solutions**:
- Check **Build Logs** in Vercel → Deployments → Click on failed deployment → View logs
- Common issues:
  - Missing dependencies
  - Syntax errors
  - Environment variables missing during build

### 2. Form Submission Not Working
**Symptoms**: Form submits but shows error or nothing happens

**Check**:
1. Open browser console (F12) on your Vercel site
2. Submit form
3. Check for errors in console
4. Check Network tab → Look for `/api/lead` request → Check response

**Common Issues**:
- **500 Error**: Check Vercel Function logs
- **CORS Error**: Shouldn't happen (same domain)
- **Network Error**: API route not found

**Solutions**:
- Go to Vercel → Your Project → Functions tab
- Check `/api/lead` function logs
- Look for error messages

### 3. Google Sheets Not Saving
**Symptoms**: Form submits successfully but no data in Google Sheet

**Check**:
1. Verify `GOOGLE_SHEETS_CREDENTIALS` is valid JSON
2. Check service account email has access to sheet
3. Check Vercel Function logs for Google Sheets errors

**Solutions**:
- Make sure JSON is on ONE line in Vercel (or properly formatted)
- Verify service account email has "Editor" access to sheet
- Check sheet ID is correct: `1f1FoDZqAxOdsdm6fF9qcAkYD-SY7QZIOkBrMV-I1Hms`

### 4. Email Not Sending
**Symptoms**: Form works but no emails received

**Check**:
- Verify Gmail App Password is used (not regular password)
- Check `SMTP_PASS` has no spaces
- Check Vercel Function logs for email errors

**Solutions**:
- Use App Password: `augkuougdzpjpfyq`
- Verify 2FA is enabled on Gmail
- Check email in spam folder

### 5. Chatbot Not Working
**Symptoms**: Chatbot doesn't respond

**Check**:
- Verify `AI_API_KEY` is correct in Vercel
- Check OpenAI account has credits
- Check Vercel Function logs for `/api/chat`

**Solutions**:
- Verify API key: `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`
- Check OpenAI dashboard for credits
- Test API key directly

---

## 🔍 Step-by-Step Debugging

### Step 1: Check Build Status
1. Go to Vercel Dashboard
2. Click on your project
3. Go to **Deployments** tab
4. Check latest deployment status:
   - ✅ **Ready**: Build successful
   - ❌ **Error**: Click to see build logs

### Step 2: Check Environment Variables
1. Go to **Settings** → **Environment Variables**
2. Verify all 13 variables are there:
   - `GOOGLE_SHEET_ID`
   - `GOOGLE_SHEETS_CREDENTIALS`
   - `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`
   - `SMTP_USER`, `SMTP_PASS`, `SMTP_PASSWORD`
   - `EMAIL_FROM_NAME`, `OWNER_EMAIL`
   - `AI_API_KEY`, `OPENAI_API_KEY`, `OPENAI_MODEL`
3. Check each variable has a value (not empty)

### Step 3: Check Function Logs
1. Go to **Deployments** → Click latest deployment
2. Go to **Functions** tab
3. Click on `/api/lead` or `/api/chat`
4. Check **Logs** for errors

### Step 4: Test API Endpoints
1. Visit: `https://your-project.vercel.app/api/health`
2. Should return: `{"status":"ok",...}`
3. If error, check build/deployment

### Step 5: Test Form Submission
1. Open your Vercel site
2. Open browser console (F12)
3. Submit form
4. Check console for errors
5. Check Network tab → `/api/lead` → Response

---

## 🐛 Common Issues & Fixes

### Issue 1: "Google Sheets credentials not configured"
**Fix**:
- Check `GOOGLE_SHEETS_CREDENTIALS` exists in Vercel
- Verify JSON is valid (test by copying to JSON validator)
- Make sure it's on one line or properly formatted

### Issue 2: "Email authentication failed"
**Fix**:
- Use App Password: `augkuougdzpjpfyq`
- Not regular Gmail password
- Verify 2FA is enabled

### Issue 3: "OpenAI API error"
**Fix**:
- Check API key is correct
- Verify account has credits
- Check key hasn't expired

### Issue 4: "Function timeout"
**Fix**:
- Google Sheets might be slow
- Check Vercel Function timeout settings
- Increase timeout if needed

### Issue 5: "Module not found"
**Fix**:
- Check `package.json` has all dependencies
- Rebuild deployment
- Check build logs

---

## ✅ Quick Checklist

- [ ] Build successful in Vercel
- [ ] All 13 environment variables added
- [ ] Environment variables have values (not empty)
- [ ] `GOOGLE_SHEETS_CREDENTIALS` is valid JSON
- [ ] Service account has access to Google Sheet
- [ ] Gmail App Password is used (not regular password)
- [ ] OpenAI API key is correct
- [ ] `/api/health` returns OK
- [ ] No errors in Vercel Function logs
- [ ] No errors in browser console

---

## 📞 What to Share for Help

If still not working, share:
1. **Your Vercel URL**
2. **What's not working** (form, chatbot, build?)
3. **Error message** (from browser console or Vercel logs)
4. **Vercel Function logs** (from Functions tab)
5. **Build logs** (if build failed)

---

## 🚀 Quick Fixes to Try

1. **Redeploy**:
   - Go to Deployments → Click "..." → Redeploy

2. **Clear Cache**:
   - Redeploy with "Clear cache and deploy" option

3. **Check Environment Variables**:
   - Make sure all are set for **Production** environment

4. **Verify JSON Format**:
   - Test `GOOGLE_SHEETS_CREDENTIALS` in JSON validator

5. **Test Locally First**:
   - Make sure it works locally with `npm run dev`
   - Then deploy to Vercel

