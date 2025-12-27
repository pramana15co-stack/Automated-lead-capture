# 🔧 Complete Troubleshooting Guide

## Issue 1: Google Sheets Not Working

### Quick Diagnostic
Visit: `https://your-site.vercel.app/api/test-services`

This will show you exactly what's wrong.

### Common Causes & Fixes

#### ❌ Error: "Google Sheets credentials not configured"
**Fix:**
1. Go to Vercel → Settings → Environment Variables
2. Verify `GOOGLE_SHEET_ID` exists
3. Verify `GOOGLE_SHEETS_CREDENTIALS` exists
4. Redeploy after adding

#### ❌ Error: "Invalid Google Sheets credentials JSON format"
**Fix:**
1. Ensure JSON is **all on ONE line** (no line breaks)
2. Validate JSON at jsonlint.com
3. Check for missing quotes or commas
4. Make sure it starts with `{` and ends with `}`

#### ❌ Error: "Google Sheets access denied" or "403 Forbidden"
**Fix:**
1. Open your Google Sheet
2. Click **"Share"** button
3. Find `"client_email"` in your `GOOGLE_SHEETS_CREDENTIALS` JSON
   - Example: `pramana15@pramana15-lead-capture.iam.gserviceaccount.com`
4. Paste that email in "Add people"
5. Set permission to **"Editor"** (NOT Viewer)
6. **Uncheck** "Notify people"
7. Click **"Share"**
8. Wait 1-2 minutes for permissions to propagate

#### ❌ Error: "Google Sheet not found" or "404"
**Fix:**
1. Verify `GOOGLE_SHEET_ID` is correct
2. Extract ID from URL: `https://docs.google.com/spreadsheets/d/YOUR_ID_HERE/edit`
3. Use ONLY the ID part, not the full URL
4. Ensure sheet exists and isn't deleted

#### ❌ Error: "Authentication failed" or "401"
**Fix:**
1. Verify service account JSON is complete
2. Check `private_key` has proper format
3. Ensure service account key hasn't been deleted in Google Cloud
4. Regenerate service account key if needed

---

## Issue 2: Email Not Sending

### Quick Diagnostic
Visit: `https://your-site.vercel.app/api/test-services`

Check the `email.test` section.

### Common Causes & Fixes

#### ❌ Error: "Email service not configured"
**Fix:**
1. Go to Vercel → Settings → Environment Variables
2. Verify these exist:
   - `SMTP_HOST` = `smtp.gmail.com`
   - `SMTP_PORT` = `587`
   - `SMTP_SECURE` = `false`
   - `SMTP_USER` = `pramana15.co@gmail.com`
   - `SMTP_PASS` = Your 16-character App Password
   - `SMTP_PASSWORD` = Same as SMTP_PASS
3. Redeploy after adding

#### ❌ Error: "Invalid login" or "Authentication failed"
**Fix:**
1. **CRITICAL:** You MUST use Gmail App Password, NOT your regular password
2. Generate App Password:
   - Go to: https://myaccount.google.com/apppasswords
   - Enable 2FA first if not enabled
   - Select "Mail" → "Other (Custom name)"
   - Name: "Pramana15 Lead Capture"
   - Copy the 16-character password
3. Update `SMTP_PASS` in Vercel with the new App Password
4. Redeploy

#### ❌ Error: "Connection timeout" or "Connection refused"
**Fix:**
1. Verify `SMTP_HOST` = `smtp.gmail.com`
2. Verify `SMTP_PORT` = `587`
3. Verify `SMTP_SECURE` = `false`
4. Check firewall isn't blocking port 587

#### ❌ Error: "Message not sent" (no error shown)
**Fix:**
1. Check Vercel logs for detailed error
2. Verify email address is valid
3. Check spam folder
4. Verify `OWNER_EMAIL` is set correctly

---

## Issue 3: Chatbot Not Answering Yes/No

### Already Fixed! ✅
The chatbot now handles yes/no questions properly. If it's still not working:

1. **Redeploy** your Vercel project
2. **Clear browser cache**
3. **Test again**

The chatbot should now respond to:
- "Yes" → Encourages next steps
- "No" → Offers alternatives  
- "Maybe" → Provides more info
- Simple yes/no questions → Direct answers

---

## 🔍 Step-by-Step Diagnostic Process

### Step 1: Test Services Endpoint
Visit: `https://your-site.vercel.app/api/test-services`

This will show:
- ✅ What's configured
- ✅ What's working
- ❌ What's broken
- 🔧 Specific error messages

### Step 2: Check Vercel Logs
1. Go to Vercel Dashboard → Your Project
2. Click **"Logs"** tab
3. Look for errors related to:
   - Google Sheets
   - Email/SMTP
   - API calls

### Step 3: Verify Environment Variables
1. Go to Vercel → Settings → Environment Variables
2. Check all required variables exist
3. Verify values are correct (no extra spaces, correct format)

### Step 4: Test Each Service Individually

**Test Google Sheets:**
1. Submit the form on your website
2. Check your Google Sheet for new row
3. If not there, check Vercel logs

**Test Email:**
1. Submit the form
2. Check your email inbox (and spam)
3. Check owner email inbox
4. If not received, check Vercel logs

---

## ✅ Quick Fix Checklist

### Google Sheets
- [ ] `GOOGLE_SHEET_ID` set in Vercel
- [ ] `GOOGLE_SHEETS_CREDENTIALS` set in Vercel (one-line JSON)
- [ ] Sheet shared with service account email
- [ ] Service account has "Editor" permission
- [ ] Redeployed after adding variables

### Email
- [ ] `SMTP_HOST` = `smtp.gmail.com`
- [ ] `SMTP_PORT` = `587`
- [ ] `SMTP_SECURE` = `false`
- [ ] `SMTP_USER` = `pramana15.co@gmail.com`
- [ ] `SMTP_PASS` = 16-character App Password (NOT regular password)
- [ ] 2FA enabled on Gmail
- [ ] App Password generated
- [ ] Redeployed after adding variables

---

## 🆘 Still Not Working?

1. **Visit `/api/test-services`** - This will tell you exactly what's wrong
2. **Check Vercel logs** - Look for specific error messages
3. **Verify all environment variables** - Make sure nothing is missing
4. **Redeploy** - Always redeploy after changing environment variables
5. **Wait 2-3 minutes** - Sometimes it takes time for changes to propagate

---

## 📞 Most Common Issues

**90% of issues are:**
1. Sheet not shared with service account email
2. Using regular Gmail password instead of App Password
3. Environment variables not set in Vercel
4. Not redeploying after adding variables

**Fix these first!**

