# 🔧 Fix: Sheets Not Updating

## Quick Diagnostic Steps

### Step 1: Check Service Account Access
**This is the #1 reason sheets don't update!**

1. Open your Google Sheet
2. Click **"Share"** button
3. Check if you see the service account email in the list
   - It looks like: `xxx@xxx.iam.gserviceaccount.com`
   - Get it from: Vercel → Environment Variables → `GOOGLE_SHEETS_CREDENTIALS` → `client_email`
4. If **NOT there**, add it with **"Editor"** permission
5. If it's there but says "Viewer", change to **"Editor"**

### Step 2: Test the Save Function
Visit: `https://your-site.vercel.app/api/test-save` (POST request)

Or use this in browser console:
```javascript
fetch('/api/test-save', { method: 'POST' })
  .then(r => r.json())
  .then(console.log)
```

This will test saving a lead and show you the exact error.

### Step 3: Check Vercel Logs
1. Go to Vercel Dashboard → Your Project
2. Click **"Logs"** tab
3. Submit the form on your website
4. Look for errors in the logs
5. Check for messages like:
   - "Error saving lead to Google Sheets"
   - "Google Sheets access denied"
   - "Sheet not found"

### Step 4: Verify Sheet Tab Name
The code looks for:
- Tab named "Leads" OR
- Tab named "Sheet1" OR  
- First tab in the spreadsheet

Make sure your sheet has one of these tab names, or it will use the first tab.

---

## Common Issues & Fixes

### Issue 1: Sheet Not Shared
**Symptom:** No error shown, but data doesn't appear

**Fix:**
1. Share sheet with service account email
2. Give "Editor" permission
3. Wait 1-2 minutes

### Issue 2: Wrong Tab Name
**Symptom:** Code can't find the sheet tab

**Fix:**
- Rename your tab to "Leads" or "Sheet1"
- OR the code will use the first tab automatically

### Issue 3: Headers Don't Match
**Symptom:** Data saved but in wrong columns

**Fix:**
- Code now auto-detects headers
- Should work with your current headers
- If not, check Vercel logs for header detection errors

### Issue 4: Permission Denied
**Symptom:** Error message about access/permission

**Fix:**
- Service account needs "Editor" (not Viewer)
- Sheet must be shared (not just accessible via link)

---

## Step-by-Step Fix

1. **Get Service Account Email:**
   - Vercel → Settings → Environment Variables
   - Copy `GOOGLE_SHEETS_CREDENTIALS`
   - Find `"client_email"` in the JSON
   - Example: `pramana15@pramana15-lead-capture.iam.gserviceaccount.com`

2. **Share Sheet:**
   - Open Google Sheet
   - Click "Share"
   - Paste service account email
   - Set to "Editor"
   - Click "Share"

3. **Test:**
   - Visit `/api/test-save` (use POST)
   - Or submit form on website
   - Check sheet for new row

4. **Check Logs:**
   - Vercel → Logs
   - Look for any errors
   - Check for "Lead saved successfully" message

---

## Still Not Working?

1. **Check `/api/test-services`** - Shows if sheet is accessible
2. **Check Vercel logs** - Shows exact error
3. **Verify service account email** - Must match exactly
4. **Try test-save endpoint** - Tests saving directly

**Most likely issue: Sheet not shared with service account email!**


