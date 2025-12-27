# 🔧 Fix: Missing GOOGLE_SHEET_ID

## Problem
Your diagnostic shows: `"hasSheetId": false`

This means `GOOGLE_SHEET_ID` is **NOT set** in Vercel environment variables.

---

## ✅ Quick Fix (2 minutes)

### Step 1: Get Your Sheet ID

1. Open your Google Sheet
2. Look at the URL in your browser:
   ```
   https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID_HERE/edit
   ```
3. Copy the part between `/d/` and `/edit`
   - Example: If URL is `https://docs.google.com/spreadsheets/d/188YkciijMHu8eBCP8uq__AkXeMpqDpY7XSWV_6_I3GA/edit`
   - Your Sheet ID is: `188YkciijMHu8eBCP8uq__AkXeMpqDpY7XSWV_6_I3GA`

### Step 2: Add to Vercel

1. Go to **Vercel Dashboard**: https://vercel.com/dashboard
2. Click on your project: **"Automated-lead-capture"**
3. Go to **Settings** → **Environment Variables**
4. Click **"Add New"**
5. Fill in:
   - **Name:** `GOOGLE_SHEET_ID`
   - **Value:** Paste your Sheet ID (just the ID, not the full URL)
   - **Environment:** Select **Production** (and Preview/Development if you want)
6. Click **"Save"**

### Step 3: Redeploy

1. Go to **Deployments** tab
2. Click **"..."** on the latest deployment
3. Click **"Redeploy"**
4. Wait 2-3 minutes

### Step 4: Verify

1. Visit: `https://your-site.vercel.app/api/test-services`
2. Should now show:
   ```json
   "googleSheets": {
     "configured": true,
     "hasSheetId": true,
     "test": {
       "success": true
     }
   }
   ```

---

## ⚠️ Important Notes

- **Sheet ID only** - Don't use the full URL, just the ID part
- **No spaces** - Make sure there are no extra spaces before/after
- **Redeploy required** - Must redeploy after adding the variable
- **Share the sheet** - After adding Sheet ID, make sure sheet is shared with service account email

---

## After Adding Sheet ID

Once `GOOGLE_SHEET_ID` is added, you also need to:

1. **Share Google Sheet with Service Account:**
   - Open your Google Sheet
   - Click "Share"
   - Add the service account email (from `GOOGLE_SHEETS_CREDENTIALS` → `client_email`)
   - Give "Editor" permission
   - Click "Share"

2. **Test again:**
   - Visit `/api/test-services`
   - Should show `googleSheets.test.success: true`
   - Submit the form - should work now!

---

**That's it! Just add `GOOGLE_SHEET_ID` to Vercel and redeploy.** 🚀


