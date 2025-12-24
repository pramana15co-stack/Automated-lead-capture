/**
 * AI Chatbot Service
 * Handles FAQ responses using prompt-based logic
 * 
 * This is a simple rule-based chatbot. For more advanced AI:
 * - Integrate OpenAI API (GPT-3.5/GPT-4)
 * - Use Google Dialogflow
 * - Use Anthropic Claude API
 * 
 * To upgrade to OpenAI:
 * 1. Install: npm install openai
 * 2. Add OPENAI_API_KEY to .env
 * 3. Replace logic with OpenAI API calls
 */

/**
 * FAQ knowledge base
 */
const faqDatabase = {
  services: [
    'We offer personalized coaching services including:',
    '• Business Coaching',
    '• Life Coaching',
    '• Career Development',
    '• Leadership Training',
    '• Performance Optimization',
    '',
    'Each program is tailored to your specific needs and goals.'
  ],
  pricing: [
    'Our pricing is customized based on your needs and goals.',
    'We offer flexible packages:',
    '• Single Session: Starting at $X',
    '• Monthly Package: Starting at $Y',
    '• 3-Month Intensive: Starting at $Z',
    '',
    'Book a free consultation to discuss the best option for you!'
  ],
  booking: [
    'Booking is easy!',
    '1. Fill out the form on this page',
    '2. We\'ll contact you within 24 hours',
    '3. Schedule your free consultation call',
    '',
    'Or click the "Book a Free Consultation" button above!'
  ],
  contact: [
    'You can reach us:',
    '• Email: [Your Email]',
    '• Phone: [Your Phone]',
    '• Fill out the form on this page',
    '',
    'We typically respond within 24 hours.'
  ]
};

/**
 * Keywords mapping to FAQ topics
 */
const keywordMap = {
  service: ['service', 'services', 'offer', 'offering', 'what do you', 'what can you', 'help with'],
  pricing: ['price', 'pricing', 'cost', 'fee', 'how much', 'expensive', 'affordable'],
  booking: ['book', 'booking', 'schedule', 'appointment', 'consultation', 'call', 'meeting'],
  contact: ['contact', 'reach', 'email', 'phone', 'call', 'get in touch', 'connect']
};

/**
 * Simple keyword matching function
 */
function findTopic(message) {
  const lowerMessage = message.toLowerCase();
  
  for (const [topic, keywords] of Object.entries(keywordMap)) {
    if (keywords.some(keyword => lowerMessage.includes(keyword))) {
      return topic;
    }
  }
  
  return null;
}

/**
 * Get chatbot response based on user message
 * 
 * PROMPT-BASED LOGIC:
 * 1. Analyze user message for keywords
 * 2. Match to FAQ topic
 * 3. Return relevant response
 * 4. Fallback to default message
 */
async function getChatbotResponse(message) {
  try {
    // Normalize message
    const normalizedMessage = message.toLowerCase().trim();

    // Check for greeting
    if (normalizedMessage.match(/^(hi|hello|hey|greetings)/)) {
      return {
        message: "Hello! I'm here to help you learn more about our coaching services. What would you like to know?",
        topic: 'greeting'
      };
    }

    // Check for FAQ topics
    const topic = findTopic(normalizedMessage);
    
    if (topic && faqDatabase[topic]) {
      return {
        message: faqDatabase[topic].join('\n'),
        topic: topic
      };
    }

    // Default fallback response
    return {
      message: "Thanks for your question! I'd love to help you learn more about our services, pricing, or how to book a consultation. What would you like to know?",
      topic: 'general'
    };

  } catch (error) {
    console.error('Error in chatbot:', error);
    return {
      message: "I apologize, but I'm having trouble understanding. Please fill out the form above and we'll contact you soon to answer your questions!",
      topic: 'error'
    };
  }
}

/**
 * ADVANCED: OpenAI Integration (Optional)
 * Uncomment and configure to use OpenAI GPT
 */
/*
const OpenAI = require('openai');

async function getChatbotResponseWithOpenAI(message) {
  if (!process.env.OPENAI_API_KEY) {
    return getChatbotResponse(message); // Fallback to rule-based
  }

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });

  try {
    const systemPrompt = `You are a helpful assistant for a coaching business. 
    Answer questions about services, pricing, and booking consultations.
    Keep responses friendly, concise, and professional.
    If you don't know something, encourage them to book a free consultation.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ],
      max_tokens: 150,
      temperature: 0.7
    });

    return {
      message: completion.choices[0].message.content,
      topic: 'ai-generated'
    };
  } catch (error) {
    console.error('OpenAI error:', error);
    return getChatbotResponse(message); // Fallback
  }
}
*/

module.exports = {
  getChatbotResponse
};

