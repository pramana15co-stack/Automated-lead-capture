# Testing Checklist

## Pre-Deployment Testing

### 1. Lead Submission API (`/api/lead`)

#### Valid Submission
- [ ] Submit form with all valid fields
- [ ] Verify success response
- [ ] Check Google Sheets for new row
- [ ] Verify confirmation email received
- [ ] Verify owner notification email received
- [ ] Check form resets after success

#### Validation Tests
- [ ] Submit with invalid email → Should return 400 error
- [ ] Submit with missing name → Should return 400 error
- [ ] Submit with missing phone → Should return 400 error
- [ ] Submit with missing service → Should return 400 error
- [ ] Submit with empty fields → Should return 400 error

#### Duplicate Prevention
- [ ] Submit same email twice within 5 minutes → Second should return 409 error
- [ ] Submit same email after 5 minutes → Should succeed

#### Rate Limiting
- [ ] Submit 5 requests quickly → All should succeed
- [ ] Submit 6th request immediately → Should return 429 error
- [ ] Wait 1 minute → Should be able to submit again

#### Error Handling
- [ ] Disconnect Google Sheets → Should still send emails
- [ ] Disconnect email service → Should still save to Sheets
- [ ] Invalid request body → Should return 400 error

### 2. Chatbot API (`/api/chat`)

#### Valid Queries
- [ ] Ask "What services do you offer?" → Should get response
- [ ] Ask "What is your pricing?" → Should get response
- [ ] Ask "How do I book?" → Should get response
- [ ] Send greeting "Hello" → Should get friendly response

#### Validation Tests
- [ ] Send empty message → Should return 400 error
- [ ] Send message > 500 chars → Should return 400 error
- [ ] Send invalid JSON → Should return 400 error

#### Rate Limiting
- [ ] Send 20 messages quickly → All should succeed
- [ ] Send 21st message immediately → Should return 429 error

#### Fallback Behavior
- [ ] Disable OpenAI API key → Should use fallback responses
- [ ] Ask irrelevant question → Should redirect to consultation
- [ ] OpenAI API timeout → Should use fallback

### 3. Admin Dashboard API (`/api/leads`)

#### Data Retrieval
- [ ] Fetch leads → Should return array
- [ ] Verify leads sorted by newest first
- [ ] Check all fields present (name, email, phone, service, date)
- [ ] Verify count matches Google Sheets

#### Edge Cases
- [ ] Fetch with no leads → Should return empty array
- [ ] Fetch with invalid sheet → Should return 500 error
- [ ] Verify no sensitive data exposed

### 4. Health Check API (`/api/health`)

- [ ] GET request → Should return 200
- [ ] Verify status is "ok"
- [ ] Check services status (Google Sheets, Email, Chatbot)
- [ ] Verify timestamp present

### 5. Frontend Integration

#### Form Submission
- [ ] Submit form → Should show loading state
- [ ] Success → Should show success message
- [ ] Error → Should show error message
- [ ] Network error → Should show user-friendly error

#### Chatbot
- [ ] Open chatbot → Should load
- [ ] Send message → Should show in chat
- [ ] Receive response → Should display correctly
- [ ] Error → Should show fallback message

#### Admin Dashboard
- [ ] Load dashboard → Should show loading state
- [ ] Display leads → Should show in table
- [ ] Refresh → Should update data
- [ ] Error → Should show error message

## Production Testing

### After Deployment to Vercel

1. **Test All Endpoints**
   - [ ] `/api/health` - Should return 200
   - [ ] `/api/lead` - Submit test lead
   - [ ] `/api/chat` - Test chatbot
   - [ ] `/api/leads` - View admin dashboard

2. **Verify Environment Variables**
   - [ ] Google Sheets working
   - [ ] Emails sending
   - [ ] Chatbot responding (with or without OpenAI)

3. **Check Logs**
   - [ ] Vercel function logs show no errors
   - [ ] Successful requests logged
   - [ ] Errors logged with details

4. **Performance**
   - [ ] API responses < 2 seconds
   - [ ] No timeout errors
   - [ ] Rate limiting working

5. **Security**
   - [ ] No secrets in frontend
   - [ ] Input validation working
   - [ ] Rate limiting preventing abuse

## Edge Cases Tested

- ✅ Invalid email formats
- ✅ Missing required fields
- ✅ Double-click submit (duplicate prevention)
- ✅ Network failures
- ✅ Third-party API failures (graceful degradation)
- ✅ Rate limit exceeded
- ✅ Empty inputs
- ✅ Very long inputs
- ✅ Special characters
- ✅ XSS attempts (sanitized)
- ✅ SQL injection attempts (not applicable, using Sheets)

## Monitoring

### Metrics to Track
- Lead submission rate
- Email delivery rate
- API error rate
- Response times
- Rate limit hits
- Chatbot usage

### Alerts to Set Up
- High error rate (> 5%)
- Email delivery failures
- Google Sheets API errors
- Response time > 5 seconds


