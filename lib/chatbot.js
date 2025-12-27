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
 * System prompt for controlled responses
 */
const SYSTEM_PROMPT = `You are a helpful and friendly assistant for Pramana15, a professional lead capture and automation system company.

Your role:
- Answer ANY questions professionally and helpfully, whether about our services, general business topics, or casual conversation
- Be professional, friendly, conversational, and helpful
- For yes/no questions: Give clear, direct answers (Yes/No) followed by helpful context
- For simple questions: Answer directly and concisely
- Keep responses conversational and under 250 words
- Never make up specific prices, features, or guarantees
- Always be helpful and engaging, even for random or casual questions
- When someone says "yes" or "no", acknowledge it and guide them to next steps

About Pramana15 Services:
- Lead Capture System: Automated forms that capture leads 24/7, integrated with Google Sheets
- Email Automation: Send personalized confirmation emails, follow-ups, and notifications automatically
- AI Chatbot: Intelligent chatbot powered by OpenAI GPT that answers FAQs 24/7
- Analytics Dashboard: Beautiful admin dashboard to view all leads, track conversions, and analyze performance
- Google Sheets Integration: All lead data automatically saved to Google Sheets
- Production-Ready: Complete system with error handling, logging, and monitoring

Common Questions & Answers:
Q: What services do you offer?
A: We offer a complete lead capture and automation system including automated lead capture forms, email automation, AI-powered chatbot, analytics dashboard, and Google Sheets integration. Everything is production-ready and designed for coaches and businesses.

Q: How much does it cost?
A: Our pricing is customized based on your specific needs and goals. We offer flexible packages to suit different business sizes. I'd recommend booking a free consultation to get accurate pricing for your situation.

Q: How do I get started?
A: Simply fill out the form on our website, and we'll contact you within 24 hours to schedule your free consultation. You can also email us directly at pramana15.co@gmail.com.

Q: Do you work with international clients?
A: Yes! We serve clients worldwide including the US, UK, Australia, Canada, and globally. Our system works from anywhere.

Q: How long does setup take?
A: Our system is production-ready and can be set up quickly. The exact timeline depends on your specific requirements, but typically setup is completed within a few days.

Q: What makes your system different?
A: Our system is built by experienced full-stack developers, is production-ready (not a prototype), includes comprehensive error handling and logging, and comes with complete documentation. It's designed to scale and handle real business needs.

Q: Can I customize the system?
A: Absolutely! Our system is fully customizable. We can tailor it to your specific business needs, branding, and requirements.

Q: What support do you provide?
A: We provide comprehensive documentation, setup guides, and ongoing support. Our team is available to help you get the most out of the system.

Q: Is my data secure?
A: Yes! We use enterprise-grade security with SSL encryption, input validation, rate limiting, and secure APIs. Your data is protected.

For general questions: Answer naturally and helpfully, then gently mention our services if relevant.`;

/**
 * Fallback responses for common questions
 */
const fallbackResponses = {
  services: `We offer a complete lead capture and automation system for coaches and businesses, including:

• **Automated Lead Capture Forms** - Capture leads 24/7 with intelligent forms
• **Email Automation** - Send personalized confirmations, follow-ups, and notifications
• **AI-Powered Chatbot** - Answer FAQs 24/7 with intelligent responses
• **Analytics Dashboard** - Track leads, conversions, and performance in real-time
• **Google Sheets Integration** - All data automatically saved to Google Sheets
• **Production-Ready System** - Complete with error handling, logging, and monitoring

Everything is built by experienced developers and designed to scale. Would you like to book a free consultation to learn more?`,
  
  pricing: `Our pricing is customized based on your specific needs, goals, and business size. We offer flexible packages to suit different requirements.

To get accurate pricing for your situation, I'd recommend booking a free consultation. Our team will assess your needs and provide a tailored solution that fits your budget.

Would you like to schedule a consultation?`,
  
  booking: `Booking is easy! Simply fill out the form on our website with your details, and we'll contact you within 24 hours to schedule your free consultation.

You can also email us directly at pramana15.co@gmail.com.

We serve clients worldwide including the US, UK, Australia, Canada, and globally!`,
  
  contact: `You can reach us at:
• **Email:** pramana15.co@gmail.com
• **Response Time:** We typically respond within 24 hours
• **Service Area:** Worldwide - we serve clients globally

Feel free to fill out the form on our website for the fastest response!`,
  
  setup: `Our system is production-ready and can be set up quickly! The exact timeline depends on your specific requirements, but typically:

• Basic setup: 1-2 days
• Customization: 3-5 days
• Full integration: 5-7 days

We provide complete documentation and support throughout the process. Would you like to discuss your specific needs?`,
  
  features: `Our system includes many powerful features:

✅ **24/7 Lead Capture** - Never miss a potential client
✅ **Real-time Data Sync** - All leads instantly saved to Google Sheets
✅ **Smart Email Automation** - Personalized emails sent automatically
✅ **AI Chatbot** - Handles 70%+ of inquiries automatically
✅ **Analytics Dashboard** - Track performance and conversions
✅ **Mobile-Responsive** - Works perfectly on all devices
✅ **Secure & Reliable** - Enterprise-grade security and uptime

Would you like to learn more about any specific feature?`,
  
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
  
  default: `Thanks for your question! I'd love to help you learn more about our lead capture and automation system.

We offer a complete, production-ready solution for coaches and businesses that includes automated lead capture, email automation, AI chatbot, analytics dashboard, and Google Sheets integration.

For detailed information, I'd recommend booking a free consultation. Our team can answer all your questions and show you how our system can help grow your business.

Would you like to schedule a consultation?`
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

    // Check for greetings
    const lowerMessage = trimmed.toLowerCase();
    if (lowerMessage.match(/^(hi|hello|hey|greetings|good morning|good afternoon|good evening)/)) {
      return {
        success: true,
        message: "Hello! I'm here to help. Feel free to ask me anything - whether about our lead capture and automation services, or just general questions. How can I assist you today?"
      };
    }

    // Check for yes/no questions
    const yesNoPattern = /^(yes|yeah|yep|yup|sure|ok|okay|alright|definitely|absolutely|of course|no|nope|nah|not really|not sure|maybe|probably|i think so|i don't think so)$/i;
    if (yesNoPattern.test(trimmed)) {
      // If it's a yes, encourage them to proceed
      if (/^(yes|yeah|yep|yup|sure|ok|okay|alright|definitely|absolutely|of course)$/i.test(trimmed)) {
        return {
          success: true,
          message: "Great! I'm glad to help. Would you like to learn more about our services, or would you prefer to book a free consultation? You can also fill out the form on our website and we'll contact you within 24 hours."
        };
      }
      // If it's a no, offer alternatives
      if (/^(no|nope|nah|not really|not sure)$/i.test(trimmed)) {
        return {
          success: true,
          message: "No problem! Is there something specific you'd like to know about our lead capture and automation system? Feel free to ask me anything, or you can fill out our form and we'll get back to you with more information."
        };
      }
      // If it's maybe/uncertain
      return {
        success: true,
        message: "I understand. Would you like to learn more about our services first? I can answer any questions you have, or you can book a free consultation to discuss your specific needs. How can I help you today?"
      };
    }

    // Try OpenAI if available
    const client = initOpenAI();
    
    if (client) {
      try {
        const completion = await client.chat.completions.create({
          model: process.env.OPENAI_MODEL || 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'user', content: trimmed }
          ],
          max_tokens: 300,
          temperature: 0.8,
          timeout: 15000 // 15 second timeout
        });

        const aiResponse = completion.choices[0]?.message?.content?.trim();
        
        if (aiResponse && aiResponse.length > 0) {
          logInfo('AI chatbot response generated', { messageLength: trimmed.length });
          return {
            success: true,
            message: aiResponse
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

