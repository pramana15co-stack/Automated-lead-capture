# Google Sheets Integration Troubleshooting Guide

## ✅ Quick Checklist

1. **Service Account Email Shared with Sheet**
   - Go to your Google Sheet
   - Click "Share" button
   - Add the service account email (from `GOOGLE_SHEETS_CREDENTIALS`)
   - Give it "Editor" permissions
   - Click "Send"

2. **Environment Variables Set**
   - `GOOGLE_SHEET_ID` - Just the ID, not the full URL
   - `GOOGLE_SHEETS_CREDENTIALS` - Complete JSON as single line

3. **Sheet Has Correct Name**
   - Sheet must be named "Leads" (case-sensitive)
   - Or it will be created automatically

4. **Headers in Sheet**
   - First row should have: Name, Email, Phone, Service, Date, Timestamp
   - Or leave empty - will be created automatically

## 🔍 Common Issues

### Issue: "Failed to save lead to Google Sheets"

**Solution:**
1. Check that service account email is shared with the sheet
2. Verify `GOOGLE_SHEET_ID` is correct (extract from URL if needed)
3. Check `GOOGLE_SHEETS_CREDENTIALS` is valid JSON
4. Ensure sheet is not deleted or moved

### Issue: "Google Sheets access denied"

**Solution:**
1. Share the sheet with the service account email
2. Give "Editor" permissions (not just Viewer)
3. Wait 1-2 minutes for permissions to propagate

### Issue: "Google Sheet not found"

**Solution:**
1. Verify `GOOGLE_SHEET_ID` is correct
2. Extract ID from URL: `https://docs.google.com/spreadsheets/d/YOUR_ID_HERE/edit`
3. Make sure sheet is not deleted

### Issue: "Invalid Google Sheets credentials JSON format"

**Solution:**
1. Ensure `GOOGLE_SHEETS_CREDENTIALS` is a single-line JSON string
2. No line breaks in the JSON
3. All quotes properly escaped
4. Private key should have `\n` for newlines (will be converted automatically)

## 🧪 Testing

1. **Check Health Endpoint:**
   ```
   GET /api/health
   ```
   Should show `googleSheets: true` if configured

2. **Test Form Submission:**
   - Fill out the lead form
   - Submit
   - Check Google Sheet for new row
   - Check browser console for errors

3. **Check Vercel Logs:**
   - Go to Vercel Dashboard
   - Click on your deployment
   - Go to "Logs" tab
   - Look for Google Sheets errors

## 📝 Step-by-Step Setup

1. **Create Service Account:**
   - Go to Google Cloud Console
   - Create project (or use existing)
   - Enable Google Sheets API
   - Create service account
   - Download JSON credentials

2. **Get Sheet ID:**
   - Open your Google Sheet
   - Copy URL: `https://docs.google.com/spreadsheets/d/YOUR_ID_HERE/edit`
   - Extract `YOUR_ID_HERE` part

3. **Share Sheet:**
   - Open Google Sheet
   - Click "Share"
   - Add service account email (from JSON: `client_email`)
   - Give "Editor" permission

4. **Set Environment Variables in Vercel:**
   - Go to Vercel Dashboard
   - Project Settings → Environment Variables
   - Add `GOOGLE_SHEET_ID` = your sheet ID
   - Add `GOOGLE_SHEETS_CREDENTIALS` = entire JSON as single line
   - Redeploy

## ⚠️ Important Notes

- Service account email must be shared with the sheet
- Sheet must exist and be accessible
- Environment variables must be set in Vercel
- Redeploy after changing environment variables
- Wait 1-2 minutes after sharing sheet for permissions

## 🆘 Still Not Working?

1. Check Vercel logs for detailed error messages
2. Verify all environment variables are set correctly
3. Test with `/api/health` endpoint
4. Ensure service account has proper permissions
5. Try creating a new sheet and sharing it fresh



