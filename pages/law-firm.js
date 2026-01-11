import BusinessPage from '../client/src/components/BusinessPage'

const lawFirmConfig = {
  id: 'law-firm',
  businessType: 'Law Firm',
  icon: '⚖️',
  heroTitle: 'Never Miss a Potential Client',
  heroDescription: 'Automate intake forms, consultation scheduling, and client follow-ups. Transform how your law firm captures and manages client enquiries.',
  problems: [
    {
      title: 'Missed Consultation Requests',
      description: 'Potential clients reach out when your office is closed, leading to lost opportunities and frustrated callers.'
    },
    {
      title: 'Manual Intake Process',
      description: 'Your team spends hours manually collecting client information instead of focusing on legal work.'
    },
    {
      title: 'No Follow-Up System',
      description: 'Initial consultations don\'t get proper follow-up, resulting in lost potential clients.'
    },
    {
      title: 'Lost Potential Clients',
      description: 'Enquiries from your website or referrals go unanswered, costing your firm valuable business.'
    }
  ],
  solutions: [
    {
      title: 'Automated Consultation Booking',
      description: 'Clients can book consultations directly through your website 24/7, with automatic confirmations.'
    },
    {
      title: 'Client Intake Automation',
      description: 'System automatically collects and organizes client information before consultations.'
    },
    {
      title: 'Follow-Up Sequences',
      description: 'Automated follow-up emails and messages ensure no potential client falls through the cracks.'
    },
    {
      title: 'Multi-Channel Enquiry Capture',
      description: 'Capture enquiries from your website, phone, email, and social media in one centralized system.'
    }
  ],
  workflow: [
    {
      title: 'Client Makes Enquiry',
      description: 'Potential client submits enquiry through your website, phone, or referral.'
    },
    {
      title: 'Instant Automated Response',
      description: 'System immediately responds with consultation information and offers to book a call.'
    },
    {
      title: 'Automated Consultation Booking',
      description: 'Client can book a consultation directly through your calendar, with automatic confirmations.'
    },
    {
      title: 'Client Onboarding & Follow-Up',
      description: 'After consultation, system automatically sends intake forms and schedules follow-up meetings.'
    }
  ],
  formConfig: {
    showCompany: false,
    serviceRequired: true,
    serviceLabel: 'Legal Service Needed',
    services: [
      'Family Law',
      'Criminal Law',
      'Business Law',
      'Real Estate Law',
      'Personal Injury',
      'Estate Planning',
      'Other'
    ],
    placeholders: {
      name: 'Your full name',
      email: 'your@email.com',
      phone: 'Your phone number',
      message: 'Tell us about your legal matter...'
    },
    submitButtonText: 'Request Consultation',
    successMessage: 'Thank you! We\'ve received your consultation request and will contact you shortly.'
  },
  chatbotConfig: {
    title: 'Legal Assistant',
    initialMessage: 'Hello! I\'m here to help you with information about our legal services and consultation booking.\n\nWhat can I help you with today?',
    inputPlaceholder: 'Ask about services, consultations, or legal matters...',
    errorMessage: 'I apologize, but I\'m having trouble right now. Please fill out the form above and we\'ll contact you soon!',
    quickActions: [
      { label: 'Book a consultation', query: 'How do I book a consultation?' },
      { label: 'What legal services do you offer?', query: 'What legal services do you offer?' },
      { label: 'What are your consultation fees?', query: 'What are your consultation fees?' },
      { label: 'Do you offer payment plans?', query: 'Do you offer payment plans?' }
    ]
  },
  pricing: {
    USD: {
      setup: { min: 1500, max: 2000 },
      monthly: 180
    },
    AUD: {
      setup: { min: 2200, max: 3000 },
      monthly: 270
    }
  },
  pricingFeatures: [
    'Custom intake form for legal enquiries',
    '24/7 AI chatbot for client questions',
    'Automated consultation booking system',
    'Client intake automation',
    'Email and SMS follow-up sequences',
    'Multi-channel enquiry capture',
    'Lead management dashboard',
    'Ongoing support and updates'
  ]
}

export default function LawFirmPage() {
  return <BusinessPage businessConfig={lawFirmConfig} />
}




