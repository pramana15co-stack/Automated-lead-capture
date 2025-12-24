# AI-Assisted Lead Capture & Automation System

**Production-ready lead capture and automation system for service-based coaches.**

Built with Next.js, deployed on Vercel, with Google Sheets integration, email automation, and AI chatbot.

---

## 🏗️ Architecture

- **Frontend**: Next.js (React) - Server-side rendered, optimized for Vercel
- **Backend**: Next.js API Routes - Serverless functions on Vercel
- **Database**: Google Sheets - Simple, reliable, no database setup needed
- **Email**: Nodemailer with SMTP - Gmail, Outlook, or any SMTP provider
- **AI Chatbot**: OpenAI API (optional) - Falls back to rule-based responses
- **Deployment**: Vercel - Zero-config deployment

---

## 📋 System Flow

### Lead Submission Flow

1. **User submits form** → Frontend validates input
2. **POST /api/lead** → Backend receives request
3. **Rate limiting** → Prevents abuse (5 requests/minute)
4. **Validation** → Server-side validation of all fields
5. **Duplicate check** → Prevents same email within 5 minutes
6. **Save to Google Sheets** → Stores lead data
7. **Send confirmation email** → To lead (non-blocking)
8. **Send notification email** → To business owner (non-blocking)
9. **Return success** → User sees confirmation

### Chatbot Flow

1. **User sends message** → Frontend sends to `/api/chat`
2. **Rate limiting** → 20 requests/minute
3. **Input sanitization** → Clean and validate message
4. **AI processing** → OpenAI API (if configured) or fallback
5. **Return response** → User sees answer

### Admin Dashboard Flow

1. **Admin visits /admin** → Frontend loads
2. **GET /api/leads** → Fetches all leads
3. **Google Sheets query** → Retrieves data
4. **Display leads** → Sorted by newest first

---

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Google Sheets

1. Create a Google Sheet
2. Create Google Cloud Project
3. Enable Google Sheets API
4. Create Service Account
5. Download JSON credentials
6. Share sheet with service account email
7. Copy Sheet ID from URL

### 3. Configure Environment Variables

Create `.env.local` file:

```env
GOOGLE_SHEETS_CREDENTIALS={"type":"service_account",...}
GOOGLE_SHEET_ID=your_sheet_id
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password
OWNER_EMAIL=your_email@gmail.com
OPENAI_API_KEY=sk-... (optional)
```

### 4. Run Locally

```bash
npm run dev
```

Visit: http://localhost:3000

### 5. Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables in Vercel dashboard
```

---

## 📁 Project Structure

```
├── pages/
│   ├── api/
│   │   ├── lead.js          # Lead submission endpoint
│   │   ├── chat.js          # Chatbot endpoint
│   │   ├── leads.js         # Admin dashboard endpoint
│   │   └── health.js        # Health check
│   ├── index.js             # Home page
│   ├── admin.js             # Admin dashboard
│   └── _app.js              # App wrapper
├── components/              # React components
│   ├── LandingPage.js
│   ├── LeadCaptureForm.js
│   ├── Chatbot.js
│   ├── AdminDashboard.js
│   └── ...
├── lib/                     # Backend utilities
│   ├── validation.js        # Input validation
│   ├── logger.js            # Logging utility
│   ├── rateLimiter.js       # Rate limiting
│   ├── googleSheets.js      # Google Sheets integration
│   ├── email.js             # Email automation
│   └── chatbot.js           # AI chatbot logic
├── styles/                  # CSS files
└── public/                  # Static assets
```

---

## 🔧 API Endpoints

### POST /api/lead

Submit a new lead.

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1 555-1234",
  "service": "Business Coaching"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Thank you! We've received your information...",
  "lead": {
    "name": "John Doe",
    "email": "john@example.com",
    "service": "Business Coaching"
  }
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "Validation failed",
  "errors": {
    "email": "Invalid email format"
  }
}
```

### POST /api/chat

Chatbot query.

**Request:**
```json
{
  "message": "What services do you offer?"
}
```

**Response:**
```json
{
  "success": true,
  "response": {
    "message": "We offer lead capture, email automation..."
  }
}
```

### GET /api/leads

Fetch all leads (admin).

**Response:**
```json
{
  "success": true,
  "leads": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+1 555-1234",
      "service": "Business Coaching",
      "date": "2024-01-15T10:30:00Z",
      "timestamp": "1705315800000"
    }
  ],
  "count": 1
}
```

### GET /api/health

Health check endpoint.

---

## 🛡️ Security & Reliability

### Implemented Features

- ✅ **Input Validation** - Server-side validation of all inputs
- ✅ **Rate Limiting** - Prevents abuse (5 req/min for leads, 20 req/min for chat)
- ✅ **Duplicate Prevention** - Prevents same email within 5 minutes
- ✅ **Error Handling** - Graceful error handling, no crashes
- ✅ **Logging** - Comprehensive logging for debugging
- ✅ **Email Deduplication** - Prevents sending same email twice
- ✅ **Input Sanitization** - XSS prevention
- ✅ **Environment Variables** - No secrets in code

### Production Considerations

- **Authentication**: Add authentication to `/api/leads` in production
- **Rate Limiting**: Consider Redis for distributed rate limiting
- **Monitoring**: Set up error tracking (Sentry, etc.)
- **Backup**: Regular backups of Google Sheets
- **SSL**: Vercel provides SSL automatically

---

## 🧪 Testing

### Manual Test Checklist

#### Lead Submission
- [ ] Submit valid lead → Should succeed
- [ ] Submit with invalid email → Should show error
- [ ] Submit duplicate email within 5 min → Should show duplicate error
- [ ] Submit 6 times quickly → Should hit rate limit
- [ ] Check Google Sheets → Lead should appear
- [ ] Check email inbox → Confirmation email received
- [ ] Check owner email → Notification email received

#### Chatbot
- [ ] Ask "What services do you offer?" → Should get response
- [ ] Ask "What is your pricing?" → Should get response
- [ ] Send empty message → Should show error
- [ ] Send 21 messages quickly → Should hit rate limit
- [ ] Ask irrelevant question → Should redirect to consultation

#### Admin Dashboard
- [ ] Visit /admin → Should load leads
- [ ] Check lead count → Should match Google Sheets
- [ ] Verify sorting → Newest first

### Edge Cases Tested

- Invalid email formats
- Missing required fields
- Double-click submit (duplicate prevention)
- Network failures (graceful error handling)
- Google Sheets API failure (emails still sent)
- Email service failure (lead still saved)
- OpenAI API failure (fallback responses)
- Rate limit exceeded
- Empty inputs
- Very long inputs
- Special characters in inputs

---

## 🔄 Customization

### Update Services List

Edit `components/LeadCaptureForm.js`:

```javascript
const services = [
  'Business Coaching',
  'Life Coaching',
  // Add your services here
];
```

### Update Email Templates

Edit `lib/email.js` - `templates` object.

### Update Chatbot Responses

Edit `lib/chatbot.js` - `fallbackResponses` object or `SYSTEM_PROMPT`.

### Update Company Information

Edit:
- `components/ContactSection.js` - Contact details
- `components/Footer.js` - Company info
- `lib/email.js` - Email signatures

---

## 🐛 Troubleshooting

### Leads Not Saving

1. Check Google Sheets credentials in `.env.local`
2. Verify service account has access to sheet
3. Check sheet name is "Leads"
4. Check Vercel logs for errors

### Emails Not Sending

1. Verify SMTP credentials
2. For Gmail: Use App Password (not regular password)
3. Check spam folder
4. Verify `OWNER_EMAIL` is set
5. Check Vercel logs

### Chatbot Not Responding

1. Check OpenAI API key (if using AI)
2. Verify rate limit not exceeded
3. Check Vercel logs
4. Fallback responses should work without OpenAI

### Build Errors

1. Run `npm install` again
2. Clear `.next` folder: `rm -rf .next`
3. Check Node.js version (14+)
4. Check environment variables

---

## 📊 Monitoring

### Health Check

Visit `/api/health` to check:
- Service status
- Configuration status
- Uptime

### Logs

View logs in:
- **Local**: Terminal output
- **Vercel**: Dashboard → Functions → Logs

### Metrics to Monitor

- Lead submission rate
- Email delivery rate
- API error rate
- Response times
- Rate limit hits

---

## 🚢 Deployment

### Vercel Deployment

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Environment Variables in Vercel

Add all variables from `.env.example` in Vercel dashboard:
- Settings → Environment Variables

### Post-Deployment Checklist

- [ ] Test lead submission
- [ ] Test chatbot
- [ ] Test admin dashboard
- [ ] Verify emails sending
- [ ] Check Google Sheets updating
- [ ] Test on mobile
- [ ] Check SSL certificate
- [ ] Monitor error logs

---

## 📝 Common Failure Points & Fixes

### 1. Google Sheets Permission Denied

**Problem**: Service account doesn't have access

**Fix**: Share Google Sheet with service account email (from credentials JSON)

### 2. Email Authentication Failed

**Problem**: Wrong SMTP credentials

**Fix**: 
- For Gmail: Generate App Password
- Check SMTP_HOST and SMTP_PORT
- Verify SMTP_SECURE setting

### 3. Rate Limit Errors

**Problem**: Too many requests

**Fix**: Wait for rate limit window to reset (1 minute)

### 4. Duplicate Lead Error

**Problem**: Same email submitted within 5 minutes

**Fix**: Wait 5 minutes or use different email

### 5. OpenAI API Errors

**Problem**: Invalid API key or quota exceeded

**Fix**: 
- Check API key in environment variables
- Verify OpenAI account has credits
- System will fall back to rule-based responses

---

## 📄 License

MIT License

---

## 🤝 Support

For issues:
1. Check logs in Vercel dashboard
2. Review this README
3. Check environment variables
4. Test health endpoint: `/api/health`

---

**Built with ❤️ by Pramana15 | Jagatpura, Jaipur, Rajasthan, India**
