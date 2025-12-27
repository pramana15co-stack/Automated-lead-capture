# 🔍 Why "Google Sheets is not properly configured" Error Happens

## Root Causes

This error appears when **ONE of these conditions is true:**

### 1. ❌ Environment Variables Not Set in Vercel (Most Common)
- `GOOGLE_SHEET_ID` is missing or empty
- `GOOGLE_SHEETS_CREDENTIALS` is missing or empty

**Why:** The code checks for these variables first. If they don't exist, it throws "credentials not configured" error.

### 2. ❌ Google Sheet Not Shared with Service Account
- Service account email doesn't have access to the sheet
- Service account has "Viewer" instead of "Editor" permission

**Why:** Even if credentials are set, if the service account can't access the sheet, it fails with a credentials/access error.

### 3. ❌ Invalid JSON Format
- `GOOGLE_SHEETS_CREDENTIALS` has line breaks
- JSON is malformed (missing quotes, commas, etc.)

**Why:** The code tries to parse the JSON. If it fails, it throws an error that gets caught as "credentials" error.

### 4. ❌ Wrong Sheet ID
- Sheet ID is incorrect
- Sheet was deleted or moved

**Why:** Can't find the sheet, which triggers a credentials/configuration error.

---

## 🔧 How to Fix (Step by Step)

### Step 1: Diagnose the Problem
Visit: `https://your-site.vercel.app/api/test-services`

This will show you **exactly** what's wrong:
- ✅ Variables configured? (yes/no)
- ✅ Sheet accessible? (yes/no)
- ❌ Specific error message

### Step 2: Check Vercel Environment Variables

1. Go to **Vercel Dashboard** → Your Project → **Settings** → **Environment Variables**
2. Verify these exist:
   - `GOOGLE_SHEET_ID` - Should have a value
   - `GOOGLE_SHEETS_CREDENTIALS` - Should have complete JSON

**If missing:**
- Add them
- **Redeploy** (very important!)

### Step 3: Share Google Sheet with Service Account

**This is the #1 most common issue!**

1. Open your Google Sheet
2. Click **"Share"** button (top right)
3. Find the service account email:
   - Go to Vercel → Environment Variables
   - Copy `GOOGLE_SHEETS_CREDENTIALS`
   - Look for `"client_email"` in the JSON
   - Example: `pramana15@pramana15-lead-capture.iam.gserviceaccount.com`
4. Paste that email in "Add people"
5. Set permission to **"Editor"** (NOT Viewer!)
6. **Uncheck** "Notify people"
7. Click **"Share"**
8. Wait 1-2 minutes

### Step 4: Verify JSON Format

Your `GOOGLE_SHEETS_CREDENTIALS` must be:
- ✅ All on **ONE line** (no line breaks)
- ✅ Valid JSON (test at jsonlint.com)
- ✅ Complete (has all required fields)

**Example format:**
```json
{"type":"service_account","project_id":"...","private_key":"...","client_email":"...",...}
```

### Step 5: Redeploy

**CRITICAL:** After making ANY changes:
1. Go to Vercel → **Deployments**
2. Click **"..."** on latest deployment
3. Click **"Redeploy"**
4. Wait 2-3 minutes

---

## 🎯 Quick Test

After fixing, test:

1. **Visit:** `https://your-site.vercel.app/api/test-services`
   - Should show `googleSheets.test.success: true`

2. **Submit the form** on your website
   - Should save to Google Sheet
   - Should send confirmation email

3. **Check your Google Sheet**
   - Should see new row with lead data

---

## ⚠️ Why It's Still a Problem

If you've done everything but it still doesn't work:

1. **Variables not redeployed** - Must redeploy after adding variables
2. **Sheet not shared** - Most common! Service account email needs access
3. **Wrong service account email** - Using old/deleted service account
4. **JSON format wrong** - Has line breaks or invalid format
5. **Sheet ID wrong** - Using full URL instead of just ID

---

## ✅ Final Checklist

- [ ] `GOOGLE_SHEET_ID` set in Vercel
- [ ] `GOOGLE_SHEETS_CREDENTIALS` set in Vercel (one-line JSON)
- [ ] Sheet shared with service account email
- [ ] Service account has "Editor" permission
- [ ] Redeployed after adding variables
- [ ] Tested with `/api/test-services` endpoint

**If all checked and still not working, check Vercel logs for the exact error!**


