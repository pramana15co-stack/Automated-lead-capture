# 🔧 Google Sheets Configuration Fix Guide

## Error: "Google Sheets is not properly configured"

This error means your Google Sheets credentials are not set up correctly in Vercel. Follow these steps:

---

## ✅ Step-by-Step Fix

### Step 1: Check Environment Variables in Vercel

1. Go to **Vercel Dashboard** → Your Project → **Settings** → **Environment Variables**
2. Verify these variables exist:
   - `GOOGLE_SHEET_ID`
   - `GOOGLE_SHEETS_CREDENTIALS`

### Step 2: Verify GOOGLE_SHEET_ID

**Your Sheet ID should be:**
- Just the ID part (not the full URL)
- Example: `188YkciijMHu8eBCP8uq__AkXeMpqDpY7XSWV_6_I3GA`
- **NOT:** `https://docs.google.com/spreadsheets/d/188YkciijMHu8eBCP8uq__AkXeMpqDpY7XSWV_6_I3GA/edit`

**To get your Sheet ID:**
1. Open your Google Sheet
2. Look at the URL: `https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID_HERE/edit`
3. Copy only the part between `/d/` and `/edit`

### Step 3: Verify GOOGLE_SHEETS_CREDENTIALS

**The JSON must be:**
- ✅ All on **ONE LINE** (no line breaks)
- ✅ Valid JSON format
- ✅ Complete with all fields

**Format should look like:**
```json
{"type":"service_account","project_id":"...","private_key_id":"...","private_key":"-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n","client_email":"...@....iam.gserviceaccount.com",...}
```

**Common Issues:**
- ❌ JSON has line breaks → Remove all line breaks
- ❌ Missing quotes → Ensure all keys and string values are in quotes
- ❌ Invalid JSON → Validate at jsonlint.com

### Step 4: Share Sheet with Service Account

**CRITICAL:** Your Google Sheet must be shared with the service account email!

1. Open your Google Sheet
2. Click **"Share"** button (top right)
3. Find the service account email in your `GOOGLE_SHEETS_CREDENTIALS`:
   - Look for `"client_email"` in the JSON
   - Example: `pramana15@pramana15-lead-capture.iam.gserviceaccount.com`
4. Paste that email in the "Add people" field
5. Set permission to **"Editor"** (not Viewer)
6. **Uncheck** "Notify people"
7. Click **"Share"**

### Step 5: Redeploy

After fixing environment variables:
1. Go to **Vercel Dashboard** → **Deployments**
2. Click **"..."** on latest deployment
3. Click **"Redeploy"**
4. Wait 2-3 minutes

---

## 🔍 Troubleshooting Specific Errors

### Error: "Google Sheets credentials format is invalid"
**Fix:** 
- Ensure JSON is all on one line
- Validate JSON at jsonlint.com
- Check for missing quotes or commas

### Error: "Google Sheets access denied"
**Fix:**
- Share sheet with service account email
- Give "Editor" permission (not Viewer)
- Wait 1-2 minutes after sharing

### Error: "Google Sheet not found"
**Fix:**
- Verify Sheet ID is correct (just the ID, not full URL)
- Ensure sheet exists and isn't deleted
- Check Sheet ID in Vercel matches your actual sheet

### Error: "Google Sheets authentication failed"
**Fix:**
- Verify service account JSON is correct
- Check private_key has proper newlines (`\n`)
- Ensure service account key hasn't been deleted

---

## ✅ Verification

After fixing, test:

1. **Check Health Endpoint:**
   - Visit: `https://your-site.vercel.app/api/health`
   - Should show `googleSheets: true`

2. **Test Form Submission:**
   - Fill out the lead form
   - Submit it
   - Check your Google Sheet for the new row

3. **Check Vercel Logs:**
   - Go to Vercel Dashboard → Your Project → **Logs**
   - Look for any Google Sheets errors

---

## 🆘 Still Not Working?

If it still doesn't work:

1. **Double-check all steps above**
2. **Verify service account email is shared with sheet**
3. **Check Vercel logs for detailed error messages**
4. **Ensure you redeployed after adding variables**

---

**Most common issue:** Sheet not shared with service account email! Make sure Step 4 is completed.


