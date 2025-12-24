# Quick Start Guide

Get up and running in 5 minutes!

## Step 1: Install Dependencies

```bash
# Install all dependencies
npm run install-all
```

## Step 2: Set Up Google Sheets (5 minutes)

1. **Create Google Sheet**:
   - Go to [Google Sheets](https://sheets.google.com)
   - Create a new sheet
   - Copy the Sheet ID from URL: `https://docs.google.com/spreadsheets/d/SHEET_ID/edit`

2. **Get Service Account**:
   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Create project → Enable Google Sheets API
   - Create Service Account → Download JSON key
   - Share your sheet with the service account email

3. **Add to .env**:
   ```env
   GOOGLE_SHEET_ID=your_sheet_id_here
   GOOGLE_SHEETS_CREDENTIALS={"type":"service_account",...}
   ```

## Step 3: Set Up Email (2 minutes)

**For Gmail**:
1. Enable 2FA on your Google account
2. Generate App Password: https://myaccount.google.com/apppasswords
3. Add to `.env`:
   ```env
   SMTP_USER=your_email@gmail.com
   SMTP_PASSWORD=your_app_password
   OWNER_EMAIL=your_email@gmail.com
   ```

## Step 4: Create .env File

```bash
# Copy example file
cp env.example .env

# Edit .env and add your credentials
```

## Step 5: Run the App

```bash
# Start both server and client
npm run dev
```

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000
- **Admin**: http://localhost:3000/admin

## That's It! 🎉

Test it:
1. Visit http://localhost:3000
2. Fill out the form
3. Check Google Sheets - your lead should appear!
4. Check your email - you should receive notifications!

## Need Help?

- **Detailed Setup**: See `README.md`
- **Environment Variables**: See `ENV_SETUP.md`
- **Deployment**: See `DEPLOYMENT.md`

