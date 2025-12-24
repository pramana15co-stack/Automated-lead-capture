# AI-Assisted Lead Capture & Automation System

A complete, production-ready lead capture and automation system for service-based coaches. Features include a conversion-focused landing page, automated email notifications, AI chatbot, and admin dashboard.

## 🚀 Features

- **Landing Page**: Clean, modern, conversion-focused design with headline, benefits, and CTA
- **Lead Capture Form**: Validated form that captures Name, Email, Phone, and Service Interest
- **Google Sheets Integration**: Automatically saves all leads to Google Sheets
- **Automated Emails**: 
  - Instant confirmation email to leads
  - Notification email to business owner
- **AI Chatbot**: Embedded chatbot that answers FAQs about services, pricing, and booking
- **Admin Dashboard**: View all leads in a clean table format
- **Deployment Ready**: Pre-configured for Railway, Render, Heroku, Vercel, and Netlify

## 📁 Project Structure

```
lead-capture-automation/
├── server/                 # Backend API
│   ├── index.js           # Express server
│   └── services/
│       ├── googleSheets.js # Google Sheets integration
│       ├── email.js        # Email automation
│       └── chatbot.js      # AI chatbot logic
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── LandingPage.js
│   │   │   ├── LeadCaptureForm.js
│   │   │   ├── Chatbot.js
│   │   │   └── AdminDashboard.js
│   │   └── App.js
│   └── public/
└── package.json
```

## 📦 Quick Start

### Push to GitHub

```bash
# Use the setup script (recommended)
# Windows: powershell scripts/setup-github.ps1
# Mac/Linux: bash scripts/setup-github.sh

# Or manually:
git init
git remote add origin https://github.com/YOUR_USERNAME/lead-capture-automation.git
git add .
git commit -m "Initial commit"
git push -u origin main
```

See `GITHUB_SETUP.md` for detailed instructions.

### Deploy

1. **Backend**: Deploy to [Railway](https://railway.app) or [Render](https://render.com)
2. **Frontend**: Deploy to [Vercel](https://vercel.com) or [Netlify](https://netlify.com)

See `DEPLOY_QUICK.md` for 5-minute deployment guide.

---

## 🛠️ Local Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Google account (for Sheets integration)
- Email account (for SMTP)

### 1. Install Dependencies

```bash
# Install root dependencies
npm install

# Install client dependencies
cd client
npm install
cd ..
```

Or use the convenience script:
```bash
npm run install-all
```

### 2. Configure Google Sheets

#### Step 1: Create Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable **Google Sheets API**

#### Step 2: Create Service Account
1. Navigate to **IAM & Admin** > **Service Accounts**
2. Click **Create Service Account**
3. Give it a name (e.g., "lead-capture-service")
4. Click **Create and Continue**
5. Skip role assignment, click **Done**

#### Step 3: Generate Key
1. Click on the service account you just created
2. Go to **Keys** tab
3. Click **Add Key** > **Create new key**
4. Choose **JSON** format
5. Download the JSON file

#### Step 4: Create Google Sheet
1. Create a new Google Sheet
2. Name it (e.g., "Lead Capture Data")
3. Copy the Sheet ID from the URL:
   ```
   https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit
   ```
4. Share the sheet with the service account email (found in the JSON file)
   - Click **Share** button
   - Add the service account email (ends with @...iam.gserviceaccount.com)
   - Give it **Editor** access

#### Step 5: Add to Environment Variables
Open the downloaded JSON file and copy its contents.

### 3. Configure Email (SMTP)

#### For Gmail:
1. Enable 2-Factor Authentication on your Google account
2. Go to [App Passwords](https://myaccount.google.com/apppasswords)
3. Generate an app password for "Mail"
4. Use this password (not your regular Gmail password)

#### For Other Providers:
Check your email provider's SMTP settings:
- **Outlook**: smtp-mail.outlook.com, port 587
- **SendGrid**: smtp.sendgrid.net, port 587
- **Mailgun**: smtp.mailgun.org, port 587

### 4. Environment Variables

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Google Sheets Integration
GOOGLE_SHEETS_CREDENTIALS={"type":"service_account","project_id":"...","private_key_id":"...","private_key":"...","client_email":"...","client_id":"...","auth_uri":"...","token_uri":"...","auth_provider_x509_cert_url":"...","client_x509_cert_url":"..."}
GOOGLE_SHEET_ID=your_google_sheet_id_here

# Email Configuration (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password_here
EMAIL_FROM_NAME=Your Coaching Business
OWNER_EMAIL=your_email@gmail.com
```

**Important**: 
- Paste the entire JSON credentials as a single line in `GOOGLE_SHEETS_CREDENTIALS`
- Replace `your_google_sheet_id_here` with your actual Sheet ID
- Use Gmail App Password (not regular password) for `SMTP_PASSWORD`

### 5. Run the Application

```bash
# Development mode (runs both server and client)
npm run dev

# Or run separately:
npm run server    # Backend on http://localhost:5000
npm run client    # Frontend on http://localhost:3000
```

## 📍 Access Points

- **Landing Page**: http://localhost:3000
- **Admin Dashboard**: http://localhost:3000/admin
- **API Health Check**: http://localhost:5000/api/health

## 🔧 Alternative: Using Zapier/Make.com

Instead of direct Google Sheets/Email integration, you can use automation platforms:

### Zapier Setup:
1. Create a Zap with Webhook trigger
2. Add your webhook URL to `.env`:
   ```env
   ZAPIER_WEBHOOK_URL=https://hooks.zapier.com/hooks/catch/...
   ```
3. Modify `server/index.js` to send data to Zapier webhook
4. Configure Zapier to:
   - Save to Google Sheets
   - Send confirmation email
   - Send notification to owner

### Make.com Setup:
Similar to Zapier, use webhooks to trigger Make.com scenarios.

## 🤖 Chatbot Customization

The chatbot uses prompt-based logic. To customize:

1. Edit `server/services/chatbot.js`
2. Update `faqDatabase` with your services, pricing, etc.
3. Modify `keywordMap` to add more keyword triggers

### Upgrade to OpenAI (Optional):

1. Get API key from [OpenAI](https://platform.openai.com/)
2. Add to `.env`:
   ```env
   OPENAI_API_KEY=sk-...
   ```
3. Install OpenAI package:
   ```bash
   npm install openai
   ```
4. Uncomment and use the OpenAI function in `chatbot.js`

## 🚢 Deployment

### Deploy Backend (Heroku/Railway/Render):

1. Set environment variables in your hosting platform
2. Update CORS settings if needed
3. Deploy:
   ```bash
   git push heroku main
   ```

### Deploy Frontend (Vercel/Netlify):

1. Build the React app:
   ```bash
   cd client
   npm run build
   ```
2. Deploy the `build` folder
3. Update API URLs in frontend code to point to your backend

### Environment Variables for Production:

Make sure to set all environment variables in your hosting platform's dashboard.

## 📝 Customization

### Update Services List:
Edit `client/src/components/LeadCaptureForm.js` - modify the `services` array.

### Update Benefits:
Edit `client/src/components/LandingPage.js` - modify the benefits section.

### Update Email Templates:
Edit `server/services/email.js` - modify the `emailTemplates` object.

### Update Chatbot Responses:
Edit `server/services/chatbot.js` - modify the `faqDatabase` object.

## 🐛 Troubleshooting

### Google Sheets Not Working:
- Verify service account email has access to the sheet
- Check that `GOOGLE_SHEETS_CREDENTIALS` is valid JSON (single line)
- Ensure Google Sheets API is enabled

### Emails Not Sending:
- For Gmail: Use App Password, not regular password
- Check SMTP settings match your provider
- Verify firewall isn't blocking port 587

### Chatbot Not Responding:
- Check browser console for errors
- Verify backend is running on port 5000
- Check API endpoint: `/api/chatbot`

## 📄 License

MIT License - Feel free to use for your business!

## 🤝 Support

For issues or questions, check the code comments - everything is well-documented!

---

**Built with ❤️ for service-based coaches**

