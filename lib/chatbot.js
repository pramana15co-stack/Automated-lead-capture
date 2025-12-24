/**
 * AI Chatbot Service
 * Production-ready with controlled prompts and fallbacks
 */

import OpenAI from 'openai';
import { logError, logInfo, logWarn } from './logger';

let openaiClient = null;

/**
 * Initialize OpenAI client
 */
function initOpenAI() {
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
- If asked about services: mention lead capture, email automation, AI chatbot, analytics dashboard
- If asked about pricing: mention that pricing is customized and suggest booking a consultation
- If asked about contact: provide email pramana15.co@gmail.com
- For general questions: answer naturally and helpfully, then gently mention our services if relevant
- Keep responses conversational and under 200 words
- Never make up specific prices, features, or guarantees
- Always be helpful and engaging, even for random or casual questions

Important: You should answer questions naturally and helpfully. If someone asks a random question, answer it helpfully and then you can mention our services if it makes sense.`;

/**
 * Fallback responses for common questions
 */
const fallbackResponses = {
  services: `We offer a complete lead capture and automation system for coaches, including:
• Automated lead capture forms
• Email automation and follow-ups
• AI-powered chatbot
• Analytics dashboard
• Google Sheets integration

Would you like to book a free consultation to learn more?`,
  
  pricing: `Our pricing is customized based on your specific needs and goals. We offer flexible packages to suit different business sizes.

To get accurate pricing for your situation, I'd recommend booking a free consultation. Our team will assess your needs and provide a tailored solution.

Would you like to schedule a consultation?`,
  
  booking: `Booking is easy! Simply fill out the form on our website, and we'll contact you within 24 hours to schedule your free consultation.

You can also email us directly at pramana15.co@gmail.com.

We serve clients worldwide!`,
  
  contact: `You can reach us at:
• Email: pramana15.co@gmail.com
• We typically respond within 24 hours

Feel free to fill out the form on our website for the fastest response!`,
  
  default: `Thanks for your question! I'd love to help you learn more about our lead capture and automation system for coaches.

For detailed information, I'd recommend booking a free consultation. Our team can answer all your questions and show you how our system can help grow your coaching business.

Would you like to schedule a consultation?`
};

/**
 * Get fallback response based on keywords
 */
function getFallbackResponse(message) {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('service') || lowerMessage.includes('offer') || lowerMessage.includes('what do you')) {
    return fallbackResponses.services;
  }
  
  if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('how much')) {
    return fallbackResponses.pricing;
  }
  
  if (lowerMessage.includes('book') || lowerMessage.includes('schedule') || lowerMessage.includes('consultation')) {
    return fallbackResponses.booking;
  }
  
  if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('reach')) {
    return fallbackResponses.contact;
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

