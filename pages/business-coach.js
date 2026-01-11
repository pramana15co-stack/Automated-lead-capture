import BusinessPage from '../client/src/components/BusinessPage'

const businessCoachConfig = {
  id: 'business-coach',
  businessType: 'Business Coach',
  icon: '💼',
  heroTitle: 'Scale Your Coaching Business with Automation',
  heroDescription: 'Automate client onboarding, discovery calls, session booking, and follow-ups. Focus on coaching, not admin work.',
  problems: [
    {
      title: 'Manual Client Onboarding',
      description: 'You spend hours manually onboarding new clients instead of focusing on delivering value.'
    },
    {
      title: 'Missed Discovery Calls',
      description: 'Potential clients want to book discovery calls, but you\'re too busy to respond quickly, losing opportunities.'
    },
    {
      title: 'No Automated Follow-Ups',
      description: 'Following up with leads and clients manually is time-consuming and inconsistent.'
    },
    {
      title: 'Difficulty Scaling',
      description: 'As your business grows, manual processes become bottlenecks that limit your growth.'
    }
  ],
  solutions: [
    {
      title: 'Automated Discovery Call Booking',
      description: 'Clients can book discovery calls directly through your website, with automatic calendar integration.'
    },
    {
      title: 'Client Onboarding Automation',
      description: 'New clients are automatically onboarded with welcome emails, intake forms, and scheduling links.'
    },
    {
      title: 'Session Reminder System',
      description: 'Automated reminders ensure clients never miss a session, reducing no-shows and cancellations.'
    },
    {
      title: 'Lead Nurturing Sequences',
      description: 'Automated email sequences nurture leads until they\'re ready to book a discovery call or start coaching.'
    }
  ],
  workflow: [
    {
      title: 'Lead Makes Enquiry',
      description: 'Potential client submits enquiry through your website, social media, or referral.'
    },
    {
      title: 'Instant Automated Response',
      description: 'System immediately responds with information about your coaching services and offers to book a discovery call.'
    },
    {
      title: 'Automated Discovery Call Booking',
      description: 'Client can book a discovery call directly through your calendar, with automatic confirmations and reminders.'
    },
    {
      title: 'Client Onboarding & Follow-Up',
      description: 'After the discovery call, system automatically sends onboarding materials and schedules first coaching session.'
    }
  ],
  formConfig: {
    showCompany: false,
    serviceRequired: true,
    serviceLabel: 'Coaching Service Interested In',
    services: [
      'Business Strategy Coaching',
      'Leadership Development',
      'Career Coaching',
      'Performance Optimization',
      'Team Building',
      'Executive Coaching',
      'Other'
    ],
    placeholders: {
      name: 'Your full name',
      email: 'your@email.com',
      phone: 'Your phone number',
      message: 'Tell us about your coaching goals...'
    },
    submitButtonText: 'Book Discovery Call',
    successMessage: 'Thank you! We\'ve received your enquiry and will contact you shortly to schedule your discovery call.'
  },
  chatbotConfig: {
    title: 'Coaching Assistant',
    initialMessage: 'Hello! I\'m here to help you learn about our coaching services and answer any questions you might have.\n\nWhat would you like to know?',
    inputPlaceholder: 'Ask about coaching services, programs, or booking...',
    errorMessage: 'I apologize, but I\'m having trouble right now. Please fill out the form above and we\'ll contact you soon!',
    quickActions: [
      { label: 'Book a discovery call', query: 'How do I book a discovery call?' },
      { label: 'What coaching services do you offer?', query: 'What coaching services do you offer?' },
      { label: 'How does coaching work?', query: 'How does your coaching process work?' },
      { label: 'What are your rates?', query: 'What are your coaching rates and packages?' }
    ]
  },
  pricing: {
    USD: {
      setup: { min: 1000, max: 1300 },
      monthly: 130
    },
    AUD: {
      setup: { min: 1500, max: 2000 },
      monthly: 200
    }
  },
  pricingFeatures: [
    'Custom coaching enquiry form',
    '24/7 AI chatbot for coaching questions',
    'Automated discovery call booking',
    'Client onboarding automation',
    'Session reminder system',
    'Email follow-up sequences',
    'Lead management dashboard',
    'Ongoing support and updates'
  ]
}

export default function BusinessCoachPage() {
  return <BusinessPage businessConfig={businessCoachConfig} />
}



