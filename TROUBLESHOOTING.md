# Troubleshooting Form Submission Errors

## Common Issues and Solutions

### Issue: "Book a Free Consultation" button shows error

#### 1. Check Browser Console
Open browser DevTools (F12) → Console tab → Look for error messages

#### 2. Check Network Tab
Open DevTools → Network tab → Submit form → Check the `/api/lead` request:
- Status code (should be 200)
- Response body (check for error messages)
- Request payload (check if data is being sent)

#### 3. Common Error Causes

**A. API Route Not Found (404)**
- **Symptom**: Network request shows 404
- **Solution**: 
  - Make sure you're running `npm run dev` (not just `npm start`)
  - Check that `pages/api/lead.js` exists
  - Restart the development server

**B. CORS Error**
- **Symptom**: "CORS policy" error in console
- **Solution**: Next.js API routes don't need CORS for same-origin requests. If you see this, check your API URL configuration.

**C. Validation Error (400)**
- **Symptom**: Error message about validation
- **Solution**: 
  - Check form fields are filled correctly
  - Name: letters, spaces, hyphens only
  - Email: valid email format
  - Phone: 10-15 digits
  - Service: must be selected

**D. Server Error (500)**
- **Symptom**: "Internal server error" or "Something went wrong"
- **Solution**: 
  - Check server console for error logs
  - Verify environment variables are set
  - Check Google Sheets credentials
  - Check SMTP email configuration

**E. Network Error**
- **Symptom**: "Unable to connect to server"
- **Solution**:
  - Check if development server is running
  - Check if API route is accessible at `/api/lead`
  - Check firewall/network settings

### 4. Quick Fixes

#### Fix 1: Restart Development Server
```bash
# Stop server (Ctrl+C)
npm run dev
```

#### Fix 2: Check API Route
Visit: `http://localhost:3000/api/health`
Should return: `{"status":"ok","message":"API is healthy"}`

#### Fix 3: Test API Directly
```bash
# Using curl (if available)
curl -X POST http://localhost:3000/api/lead \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","phone":"1234567890","service":"Business Coaching"}'
```

#### Fix 4: Check Environment Variables
Make sure `.env.local` exists with:
```
GOOGLE_SHEET_ID=your_sheet_id
GOOGLE_SHEETS_CREDENTIALS={"type":"service_account",...}
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password
OWNER_EMAIL=your_email@gmail.com
```

### 5. Debug Steps

1. **Enable Console Logging**
   - Open browser console
   - Submit form
   - Check for error messages

2. **Check Server Logs**
   - Look at terminal where `npm run dev` is running
   - Check for error messages

3. **Test API Endpoint**
   - Visit: `http://localhost:3000/api/health`
   - Should return JSON with status

4. **Check Form Data**
   - Add `console.log(formData)` before API call
   - Verify data is correct

5. **Check API Response**
   - Add `console.log(response)` after API call
   - Check response structure

### 6. Common Error Messages

| Error Message | Cause | Solution |
|--------------|-------|----------|
| "Method not allowed" | Wrong HTTP method | Form should use POST |
| "Validation failed" | Invalid form data | Check all fields |
| "Too many requests" | Rate limit exceeded | Wait 1 minute |
| "Failed to save lead" | Google Sheets error | Check credentials |
| "Network Error" | Server not running | Start dev server |
| "CORS error" | API URL misconfigured | Check API config |

### 7. Still Not Working?

1. **Clear Browser Cache**
   - Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

2. **Check Next.js Version**
   ```bash
   npm list next
   ```
   Should be 14.0.4 or higher

3. **Reinstall Dependencies**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

4. **Check File Structure**
   ```
   pages/
     api/
       lead.js  ← Must exist
   client/
     src/
       components/
         LeadCaptureForm.js  ← Must exist
   ```

### 8. Production Deployment Issues

If working locally but not in production:

1. **Check Vercel Logs**
   - Go to Vercel Dashboard → Your Project → Functions
   - Check for error logs

2. **Verify Environment Variables**
   - Vercel Dashboard → Settings → Environment Variables
   - Make sure all variables are set

3. **Check API Route**
   - Visit: `https://your-domain.vercel.app/api/health`
   - Should return JSON

4. **Check Build Logs**
   - Vercel Dashboard → Deployments → Check build logs
   - Look for errors

### 9. Get Help

If still having issues:
1. Check browser console for exact error
2. Check server terminal for error logs
3. Check Network tab for API request details
4. Share error message and steps to reproduce


