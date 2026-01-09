/**
 * AI Chatbot Service
 * Production-ready with controlled prompts and fallbacks
 */

import OpenAI from 'openai';
import { logError, logInfo, logWarn } from './logger';
import { getBookingUrl, shouldShowBookingInChatbot } from './booking';

let openaiClient = null;

/**
 * Initialize OpenAI client
 */
export function initOpenAI() {
  if (openaiClient) return openaiClient;

  const apiKey = process.env.OPENAI_API_KEY || process.env.AI_API_KEY; // Support both variable names
  
  if (!apiKey) {
    logWarn('OpenAI API key not configured - using fallback responses');
    return null;
  }

  try {
    openaiClient = new OpenAI({
      apiKey: apiKey
    });
    logInfo('OpenAI client initialized');
    return openaiClient;
  } catch (error) {
    logError('Error initializing OpenAI client', error);
    return null;
  }
}

/**
 * Enhanced System prompt for professional, context-aware responses
 */
const SYSTEM_PROMPT = `You are a professional, knowledgeable, and helpful AI assistant for Pramana15, a premium automation agency specializing in lead capture and business automation systems.

YOUR ROLE & PERSONALITY:
- You are a senior business consultant with deep expertise in automation, lead generation, and business growth
- Be professional, confident, and solution-oriented
- Speak with authority but remain approachable and friendly
- Always focus on solving the user's business problems
- Provide actionable, specific advice when possible
- Ask clarifying questions when needed to better understand their needs
- Guide conversations naturally toward understanding their requirements and booking consultations

COMMUNICATION STYLE:
- Be concise but comprehensive (150-300 words for most responses)
- Use professional business language, but avoid jargon unless explaining technical concepts
- Structure responses clearly with bullet points or numbered lists when helpful
- Always end with a clear next step or call-to-action when appropriate
- Show genuine interest in helping solve their business challenges

ABOUT PRAMANA15 - KEY INFORMATION:

Company Positioning:
- Premium automation agency (not just a software provider)
- Specializes in helping service businesses stop missing enquiries
- Fast setup: 3-5 days typically
- Works with businesses globally (US, UK, Australia, Canada, worldwide)

Core Services & Capabilities:

1. LEAD CAPTURE AUTOMATION
   - Intelligent forms that capture every lead 24/7
   - Real-time validation and duplicate prevention
   - Mobile-optimized for all devices
   - Instant Google Sheets integration

2. MULTI-CHANNEL NOTIFICATIONS
   - Instant WhatsApp alerts when leads come in
   - Email notifications to business owners
   - Automated confirmation emails to leads
   - After-hours auto-responses

3. AI VOICE CALL AUTOMATION (Premium)
   - AI calls to confirm serious enquiries instantly
   - Pre-qualifies leads before human follow-up
   - Works 24/7, even after business hours

4. SMART BOOKING & SCHEDULING
   - Automated appointment booking integration
   - Calendar sync (Calendly, Google Calendar)
   - Reduces back-and-forth scheduling

5. AUTOMATED FOLLOW-UPS
   - Smart email sequences
   - WhatsApp follow-up messages
   - Prevents leads from going cold
   - Customizable timing and messaging

6. LEAD TRACKING DASHBOARD
   - Real-time lead visibility
   - Conversion tracking
   - Performance analytics
   - Export capabilities

7. AI CHATBOT (This system)
   - 24/7 customer engagement
   - Answers FAQs automatically
   - Qualifies leads
   - Reduces manual support workload

Service Packages:
- CORE: Basic automation (lead capture, email, chatbot, dashboard)
- PRO: Adds WhatsApp alerts, booking integration, after-hours responses
- PREMIUM: Adds AI voice calls, smart lead routing, priority setup

KEY VALUE PROPOSITIONS:
- "Stop Missing Enquiries" - Never lose a hot lead again
- Fast Setup - 3-5 days typically (not weeks or months)
- Works After Hours - Automation handles enquiries 24/7
- Human Takeover Anytime - You stay in control
- Designed for Service Businesses - Built specifically for service providers

COMMON QUESTIONS - PROFESSIONAL RESPONSES:

Q: What services do you offer?
A: We provide comprehensive automation solutions to help service businesses never miss an enquiry. Our system includes instant lead capture, multi-channel notifications (WhatsApp, email), AI voice call automation, smart booking integration, automated follow-ups, and a complete lead tracking dashboard. We offer three packages (CORE, PRO, PREMIUM) tailored to different business needs. Which aspect interests you most?

Q: How much does it cost?
A: Our pricing is customized based on your business size, volume of leads, and specific requirements. We offer three packages - CORE, PRO, and PREMIUM - each with different automation capabilities. Rather than giving generic pricing, I'd recommend a 10-minute consultation where we can assess your specific needs and provide accurate pricing. Would you like to book a demo?

Q: How do I get started?
A: Getting started is simple. You can fill out the form on our website with your details, and we'll contact you within 24 hours to schedule a free 10-minute demo. During the demo, we'll show you exactly how the system works, discuss your specific needs, and provide a tailored solution. Alternatively, you can email us at pramana15@pramana15.com. What's your biggest challenge with lead management right now?

Q: How long does setup take?
A: Our system is production-ready and designed for fast deployment. Typically:
- CORE package: 1-2 days
- PRO package: 3-4 days  
- PREMIUM package: 4-5 days

This includes full setup, integration, testing, and training. We handle everything - you just need to provide access to your Google Sheet and email/WhatsApp details. What's your timeline?

Q: Do you work with international clients?
A: Absolutely! We serve clients worldwide including the US, UK, Australia, Canada, and globally. Our system works from anywhere and supports multiple time zones. We've successfully implemented solutions for businesses in over 20 countries. Where are you based?

Q: What makes you different from other automation tools?
A: Three key differentiators:
1. We're a premium automation agency, not just software - we provide end-to-end setup and support
2. Fast deployment (3-5 days vs weeks/months with other solutions)
3. Built specifically for service businesses - every feature addresses real service provider challenges

Plus, our AI voice call automation and multi-channel approach ensure you truly never miss a hot lead. What's been your experience with other automation tools?

Q: Can I customize it for my business?
A: Absolutely. Every implementation is customized to your:
- Business processes and workflows
- Branding and design preferences
- Integration requirements (existing tools, calendars, etc.)
- Specific automation needs

We work closely with you to ensure it fits perfectly. What specific customizations are you thinking about?

Q: What if I need help after setup?
A: We provide comprehensive support including:
- Complete documentation and guides
- Email support with 24-hour response time
- Priority support for PREMIUM clients
- Ongoing optimization recommendations

We're here to ensure you get maximum value. What support concerns do you have?

Q: Is my data secure?
A: Yes, security is paramount. We use:
- Enterprise-grade SSL encryption
- Secure API integrations
- Input validation and rate limiting
- GDPR-compliant data handling
- Your data stays in your Google Sheets (you own it)

Your data security is our top priority. Do you have specific compliance requirements?

CONVERSATION GUIDELINES:
1. Always listen first - understand their specific pain points before recommending solutions
2. Ask qualifying questions: "What's your biggest challenge with leads right now?" "How many leads do you typically get per month?" "What happens when you miss a lead?"
3. Provide specific, actionable advice when possible
4. Reference real business scenarios: "Many of our clients were losing 30-40% of leads before implementing our system..."
5. Always guide toward booking a consultation when appropriate
6. For general questions, answer helpfully then naturally connect to how automation could help
7. If you don't know something specific, admit it and offer to connect them with someone who does

REMEMBER:
- You're not just answering questions - you're helping solve business problems
- Every interaction should move them closer to understanding their needs and booking a consultation
- Be consultative, not salesy
- Show expertise and build trust`;

/**
 * Fallback responses for common questions
 */
const fallbackResponses = {
  services: `**Our Complete Automation Solution:**

We help service businesses stop missing enquiries with a comprehensive system that includes:

**Core Capabilities:**
• **Instant Lead Capture** - Intelligent forms that capture every lead 24/7, with real-time validation
• **Multi-Channel Alerts** - Get notified instantly via WhatsApp and email when leads come in
• **AI Voice Automation** (Premium) - AI calls to confirm serious enquiries immediately
• **Smart Booking** - Automated appointment scheduling integration
• **Automated Follow-Ups** - Smart email and WhatsApp sequences to keep leads engaged
• **Lead Dashboard** - Real-time tracking of all leads, conversions, and performance

**Why It Works:**
Our system is specifically designed for service businesses. It works after hours, handles enquiries instantly, and ensures you never lose a hot lead.

**Packages Available:**
• **CORE** - Essential automation (lead capture, email, chatbot, dashboard)
• **PRO** - Adds WhatsApp alerts, booking integration, after-hours responses
• **PREMIUM** - Adds AI voice calls, smart routing, priority setup

What's your biggest challenge with lead management right now? I can explain how our system specifically addresses it.`,
  
  pricing: `**Our Pricing Approach:**

We offer three packages (CORE, PRO, PREMIUM) with pricing customized to your:
• Business size and lead volume
• Specific automation needs
• Integration requirements
• Support preferences

**Why Custom Pricing?**
Every business has unique needs. Rather than a one-size-fits-all approach, we assess your specific situation and provide pricing that matches your requirements and budget.

**Next Steps:**
I'd recommend a 10-minute consultation where we can:
• Understand your current lead management challenges
• Show you exactly how our system works
• Provide accurate pricing for your situation
• Discuss which package fits best

Would you like to book a quick demo? It's free, no obligation, and you'll see exactly how the system can help your business.`,
  
  booking: `**How to Get Started:**

**Option 1: Book a Demo (Recommended)**
Fill out the form on our website with your details, and we'll contact you within 24 hours to schedule your free 10-minute demo. During the demo, you'll see:
• How the system works in real-time
• How it addresses your specific challenges
• Which package fits your needs
• Accurate pricing for your situation

**Option 2: Email Directly**
Email us at: pramana15@pramana15.com
We typically respond within 24 hours.

**What to Expect:**
• Fast response (within 24 hours)
• No pressure - just helpful information
• Customized solution discussion
• Clear next steps

**Service Area:**
We serve clients worldwide including the US, UK, Australia, Canada, and globally. Our system works from anywhere!

What's the best way to reach you?`,
  
  contact: `You can reach us at:
• **Email:** pramana15@pramana15.com
• **Response Time:** We typically respond within 24 hours
• **Service Area:** Worldwide - we serve clients globally

Feel free to fill out the form on our website for the fastest response!`,
  
  setup: `Our system is production-ready and can be set up quickly! The exact timeline depends on your specific requirements, but typically:

• Basic setup: 1-2 days
• Customization: 3-5 days
• Full integration: 5-7 days

We provide complete documentation and support throughout the process. Would you like to discuss your specific needs?`,
  
  features: `**Key Features That Solve Real Business Problems:**

**1. Never Miss a Lead**
• Instant WhatsApp alerts when leads come in
• AI voice calls (Premium) to confirm serious enquiries immediately
• Works 24/7, even after business hours

**2. Smart Automation**
• Automated follow-up sequences (email + WhatsApp)
• Smart booking integration - reduces scheduling back-and-forth
• Pre-qualifies leads before human follow-up

**3. Complete Visibility**
• Real-time lead dashboard
• Track every enquiry from capture to conversion
• Performance analytics and insights

**4. Fast & Reliable**
• Production-ready system (not a prototype)
• Fast setup (3-5 days typically)
• Enterprise-grade security and uptime

**5. Designed for Service Businesses**
• Built specifically for service providers
• Handles the unique challenges of service-based businesses
• Human takeover anytime - you stay in control

**Which feature would be most valuable for your business?** I can explain how it specifically addresses your challenges.`,
  
  international: `Yes! We serve clients worldwide including:
• United States (US)
• United Kingdom (UK)
• Australia
• Canada
• And globally

Our system works from anywhere and supports multiple time zones. We've successfully worked with clients from over 20 countries. Would you like to discuss your location-specific needs?`,
  
  customization: `Absolutely! Our system is fully customizable. We can tailor it to:
• Your specific business needs
• Your branding and design preferences
• Your workflow and processes
• Integration with your existing tools

We work closely with you to ensure the system fits perfectly. Would you like to discuss your customization requirements?`,
  
  default: `Thanks for reaching out! I'm here to help you understand how Pramana15 can solve your lead management challenges.

**What We Do:**
We help service businesses stop missing enquiries with intelligent automation that works 24/7. Our system captures every lead instantly, notifies you immediately via WhatsApp, and can even make AI voice calls to confirm serious enquiries.

**Key Benefits:**
• Never miss a hot lead - instant multi-channel notifications
• Works after hours - automation handles enquiries when you're offline
• Fast setup - typically 3-5 days (not weeks)
• Complete visibility - track every lead in real-time

**What would you like to know more about?**
• How the system works
• Which package fits your needs
• Setup process and timeline
• Pricing and consultation

Or would you prefer to see it in action with a quick demo?`
};

/**
 * Get fallback response based on keywords
 */
function getFallbackResponse(message) {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('service') || lowerMessage.includes('offer') || lowerMessage.includes('what do you') || lowerMessage.includes('what can you')) {
    return fallbackResponses.services;
  }
  
  if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('how much') || lowerMessage.includes('pricing')) {
    return fallbackResponses.pricing;
  }
  
  if (lowerMessage.includes('book') || lowerMessage.includes('schedule') || lowerMessage.includes('consultation') || lowerMessage.includes('appointment')) {
    return fallbackResponses.booking;
  }
  
  if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('reach') || lowerMessage.includes('phone') || lowerMessage.includes('address')) {
    return fallbackResponses.contact;
  }
  
  if (lowerMessage.includes('setup') || lowerMessage.includes('install') || lowerMessage.includes('implement') || lowerMessage.includes('how long') || lowerMessage.includes('timeline')) {
    return fallbackResponses.setup;
  }
  
  if (lowerMessage.includes('feature') || lowerMessage.includes('capability') || lowerMessage.includes('what does') || lowerMessage.includes('include')) {
    return fallbackResponses.features;
  }
  
  if (lowerMessage.includes('international') || lowerMessage.includes('country') || lowerMessage.includes('location') || lowerMessage.includes('where') || lowerMessage.includes('global')) {
    return fallbackResponses.international;
  }
  
  if (lowerMessage.includes('custom') || lowerMessage.includes('personalize') || lowerMessage.includes('modify') || lowerMessage.includes('change')) {
    return fallbackResponses.customization;
  }
  
  return fallbackResponses.default;
}

/**
 * Get chatbot response
 */
export async function getChatbotResponse(userMessage) {
  try {
    // Validate input
    if (!userMessage || typeof userMessage !== 'string') {
      return {
        success: false,
        message: 'Please provide a valid message.'
      };
    }

    const trimmed = userMessage.trim();
    
    if (trimmed.length === 0) {
      return {
        success: false,
        message: 'Your message appears to be empty. Please try again.'
      };
    }

    if (trimmed.length > 500) {
      return {
        success: false,
        message: 'Your message is too long. Please keep it under 500 characters.'
      };
    }

    // Check for greetings - more professional and engaging
    const lowerMessage = trimmed.toLowerCase();
    const greetingPattern = /^(hi|hello|hey|greetings|good morning|good afternoon|good evening|hi there|hey there)/i;
    if (greetingPattern.test(trimmed)) {
      const bookingUrl = getBookingUrl();
      const showBooking = shouldShowBookingInChatbot();
      
      let greetingMessage = "Hello! I'm here to help you learn about Pramana15's automation solutions.\n\n";
      greetingMessage += "We help service businesses stop missing enquiries with:\n";
      greetingMessage += "• Instant lead capture & notifications\n";
      greetingMessage += "• AI voice call automation\n";
      greetingMessage += "• Smart booking & follow-ups\n";
      greetingMessage += "• Complete lead tracking\n\n";
      greetingMessage += "What's your biggest challenge with managing leads right now?";
      
      if (showBooking && bookingUrl) {
        greetingMessage += `\n\nOr would you prefer to [book a quick 10-minute demo](${bookingUrl}) to see it in action?`;
      }
      
      return {
        success: true,
        message: greetingMessage
      };
    }

    // Check for yes/no responses - more professional handling
    const yesNoPattern = /^(yes|yeah|yep|yup|sure|ok|okay|alright|definitely|absolutely|of course|sounds good|that works|perfect|great|no|nope|nah|not really|not sure|maybe|probably|i think so|i don't think so|not yet)$/i;
    if (yesNoPattern.test(trimmed)) {
      const bookingUrl = getBookingUrl();
      const showBooking = shouldShowBookingInChatbot();
      
      // If it's a yes/positive response
      if (/^(yes|yeah|yep|yup|sure|ok|okay|alright|definitely|absolutely|of course|sounds good|that works|perfect|great)$/i.test(trimmed)) {
        let response = "Excellent! Let's move forward.\n\n";
        response += "I can help you in a few ways:\n";
        response += "• Answer specific questions about our automation solutions\n";
        response += "• Explain how our system addresses your lead management challenges\n";
        response += "• Discuss which package (CORE, PRO, or PREMIUM) might fit your needs\n\n";
        response += "What would be most helpful right now?";
        
        if (showBooking && bookingUrl) {
          response += `\n\nOr if you're ready, you can [book a 10-minute demo](${bookingUrl}) to see the system in action.`;
        }
        
        return {
          success: true,
          message: response
        };
      }
      
      // If it's a no/negative response
      if (/^(no|nope|nah|not really|not sure|not yet)$/i.test(trimmed)) {
        return {
          success: true,
          message: "That's completely fine - no pressure at all.\n\n" +
                  "I'm here whenever you're ready. In the meantime, feel free to ask me anything about:\n" +
                  "• How our automation system works\n" +
                  "• Common challenges we help solve\n" +
                  "• What makes us different\n" +
                  "• Setup timelines and processes\n\n" +
                  "What would you like to know more about?"
        };
      }
      
      // If it's maybe/uncertain
      return {
        success: true,
        message: "I understand - it's smart to gather information first.\n\n" +
                "Many of our clients start by learning about how automation can solve their specific challenges. " +
                "What's your biggest concern with lead management right now? " +
                "Are you losing leads? Struggling with follow-ups? Need better organization?\n\n" +
                "I can explain exactly how our system addresses these issues."
      };
    }

    // Try OpenAI if available
    const client = initOpenAI();
    
    if (client) {
      try {
        // Use GPT-4 if available, otherwise GPT-3.5-turbo for better quality
        const model = process.env.OPENAI_MODEL || 'gpt-4o-mini'; // Better quality, cost-effective
        
        const completion = await client.chat.completions.create({
          model: model,
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'user', content: trimmed }
          ],
          max_tokens: 400, // Increased for more comprehensive responses
          temperature: 0.7, // Slightly lower for more consistent, professional tone
          top_p: 0.9,
          frequency_penalty: 0.3, // Reduce repetition
          presence_penalty: 0.3, // Encourage diverse topics
          timeout: 20000 // 20 second timeout for better responses
        });

        const aiResponse = completion.choices[0]?.message?.content?.trim();
        
        if (aiResponse && aiResponse.length > 0) {
          logInfo('AI chatbot response generated', { 
            messageLength: trimmed.length,
            responseLength: aiResponse.length,
            model: model
          });
          
          // Check if booking URL should be included
          const bookingUrl = getBookingUrl();
          const showBooking = shouldShowBookingInChatbot();
          
          let finalResponse = aiResponse;
          
          // If response mentions booking/consultation and booking is enabled, append booking link
          if (showBooking && bookingUrl && 
              (aiResponse.toLowerCase().includes('book') || 
               aiResponse.toLowerCase().includes('consultation') ||
               aiResponse.toLowerCase().includes('demo') ||
               aiResponse.toLowerCase().includes('schedule'))) {
            finalResponse += `\n\n📅 Ready to see it in action? [Book a 10-minute demo](${bookingUrl})`;
          }
          
          return {
            success: true,
            message: finalResponse
          };
        }
      } catch (openaiError) {
        logError('OpenAI API error, using fallback', openaiError);
        // Fall through to fallback
      }
    }

    // Use fallback response
    const fallbackMessage = getFallbackResponse(trimmed);
    logInfo('Using fallback chatbot response', { messageLength: trimmed.length });
    
    return {
      success: true,
      message: fallbackMessage
    };

  } catch (error) {
    logError('Error in chatbot service', error);
    return {
      success: false,
      message: "I apologize, but I'm having trouble right now. Please fill out the form on our website and we'll contact you soon to answer your questions!"
    };
  }
}

