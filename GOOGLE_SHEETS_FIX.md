# 🔧 Google Sheets Not Saving - Fix Guide

## ✅ Environment Variables Status
Your health check shows:
- ✅ Google Sheets: Configured
- ✅ Email: Configured  
- ✅ Chatbot: Configured

But form submissions aren't saving. Here's how to fix it:

---

## 🔍 Common Issues & Solutions

### Issue 1: Service Account Doesn't Have Access

**Most Common Problem!**

1. **Get Service Account Email**:
   - Open your `vercel-env.txt` file
   - Find `GOOGLE_SHEETS_CREDENTIALS`
   - Look for `"client_email"` - it looks like: `xxx@xxx.iam.gserviceaccount.com`
   - Copy that email

2. **Share Google Sheet**:
   - Open your Google Sheet: https://docs.google.com/spreadsheets/d/1f1FoDZqAxOdsdm6fF9qcAkYD-SY7QZIOkBrMV-I1Hms/edit
   - Click **"Share"** button (top right)
   - Paste the service account email
   - Give it **"Editor"** permission
   - **Uncheck "Notify people"**
   - Click **"Share"**

### Issue 2: JSON Format in Vercel

**Check Vercel Environment Variables**:

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Find `GOOGLE_SHEETS_CREDENTIALS`
3. Make sure it's:
   - Valid JSON (test with JSON validator)
   - On ONE line (or properly formatted)
   - No extra quotes or escaping

### Issue 3: Sheet Doesn't Have Headers

**Your sheet needs these column headers in Row 1**:
- `Name`
- `Email`
- `Phone`
- `Service`
- `Date`
- `Timestamp`

If your sheet is empty or has different headers:
1. Add these headers in Row 1
2. Or the code will create a "Leads" sheet automatically

### Issue 4: Check Vercel Function Logs

1. Go to Vercel Dashboard
2. Your Project → Deployments → Latest
3. Click **"Functions"** tab
4. Click on `/api/lead`
5. Check **"Logs"** for errors

Look for:
- Permission errors
- JSON parse errors
- Authentication errors

---

## 🛠️ Step-by-Step Fix

### Step 1: Verify Service Account Access
1. Get service account email from credentials
2. Share Google Sheet with that email
3. Give Editor permission

### Step 2: Check Vercel Environment Variables
1. Go to Vercel → Settings → Environment Variables
2. Verify `GOOGLE_SHEET_ID` is: `1f1FoDZqAxOdsdm6fF9qcAkYD-SY7QZIOkBrMV-I1Hms`
3. Verify `GOOGLE_SHEETS_CREDENTIALS` is valid JSON

### Step 3: Test Form Submission
1. Submit a test form
2. Check Vercel Function logs immediately
3. Look for error messages

### Step 4: Check Google Sheet
1. Open your sheet
2. Check if "Leads" sheet exists (or first sheet)
3. Check if headers are correct

---

## 🐛 Debugging

### Check Vercel Logs
```bash
# In Vercel Dashboard:
# Deployments → Latest → Functions → /api/lead → Logs
```

### Test API Directly
Visit: `https://automated-lead-capture.vercel.app/api/health`

Should show:
```json
{
  "services": {
    "googleSheets": true
  }
}
```

### Common Error Messages

**"Permission denied"**:
- Service account doesn't have access
- Share sheet with service account email

**"Invalid credentials"**:
- JSON format is wrong
- Check Vercel environment variable

**"Sheet not found"**:
- Sheet ID is wrong
- Check `GOOGLE_SHEET_ID` in Vercel

---

## ✅ Quick Checklist

- [ ] Service account email has access to Google Sheet
- [ ] Sheet shared with Editor permission
- [ ] `GOOGLE_SHEET_ID` is correct in Vercel
- [ ] `GOOGLE_SHEETS_CREDENTIALS` is valid JSON in Vercel
- [ ] Sheet has headers: Name, Email, Phone, Service, Date, Timestamp
- [ ] Redeployed after adding/changing environment variables
- [ ] Checked Vercel Function logs for errors

---

## 🚀 After Fixing

1. **Redeploy** in Vercel
2. **Test form submission**
3. **Check Google Sheet** - should see new row
4. **Check Vercel logs** - should see success message

---

**Most likely issue**: Service account doesn't have access to the sheet. Share it with the service account email!


