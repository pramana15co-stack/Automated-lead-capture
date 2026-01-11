import BusinessPage from '../client/src/components/BusinessPage'

const serviceBusinessConfig = {
  id: 'service-business',
  businessType: 'Service Business',
  icon: '🔧',
  heroTitle: 'Perfect for Consultants & Professional Services',
  heroDescription: 'Automate enquiries, quotes, and client communication. Never miss a lead and scale your service business efficiently.',
  problems: [
    {
      title: 'Enquiries Not Answered Quickly',
      description: 'Potential clients reach out but don\'t get immediate responses, leading to lost opportunities.'
    },
    {
      title: 'Manual Quote Generation',
      description: 'Creating quotes manually is time-consuming and delays your response to potential clients.'
    },
    {
      title: 'Lost Leads',
      description: 'Enquiries from your website, email, or phone go unanswered, costing you valuable business.'
    },
    {
      title: 'Inefficient Client Communication',
      description: 'Following up with clients and managing communication manually is time-consuming and error-prone.'
    }
  ],
  solutions: [
    {
      title: 'Instant Enquiry Capture',
      description: 'Every enquiry is instantly captured and responded to, even outside business hours.'
    },
    {
      title: 'Automated Quote System',
      description: 'System automatically generates and sends quotes based on client requirements.'
    },
    {
      title: 'Multi-Channel Response',
      description: 'Capture and respond to enquiries from your website, email, phone, and social media in one place.'
    },
    {
      title: 'Client Communication Automation',
      description: 'Automated follow-up sequences and client communication keep your business top-of-mind.'
    }
  ],
  workflow: [
    {
      title: 'Client Makes Enquiry',
      description: 'Client submits enquiry through your website, email, phone, or social media.'
    },
    {
      title: 'Instant Automated Response',
      description: 'System immediately responds with acknowledgement and relevant information.'
    },
    {
      title: 'Automated Quote Generation',
      description: 'System automatically generates quotes based on client requirements and sends them instantly.'
    },
    {
      title: 'Smart Follow-Up',
      description: 'Automated follow-up sequences ensure no client falls through the cracks.'
    }
  ],
  formConfig: {
    showCompany: true,
    serviceRequired: true,
    serviceLabel: 'Service Interested In',
    services: [
      'Consulting Services',
      'Professional Services',
      'Technical Support',
      'Project Management',
      'Business Development',
      'Other Services'
    ],
    placeholders: {
      name: 'Your full name',
      email: 'your@email.com',
      phone: 'Your phone number',
      company: 'Your company name',
      message: 'Tell us about your project or requirements...'
    },
    submitButtonText: 'Request Quote',
    successMessage: 'Thank you! We\'ve received your enquiry and will contact you shortly with a detailed quote.'
  },
  chatbotConfig: {
    title: 'Service Assistant',
    initialMessage: 'Hello! I\'m here to help you with information about our services and answer any questions you might have.\n\nWhat can I help you with today?',
    inputPlaceholder: 'Ask about services, pricing, or processes...',
    errorMessage: 'I apologize, but I\'m having trouble right now. Please fill out the form above and we\'ll contact you soon!',
    quickActions: [
      { label: 'Get a quote', query: 'How do I get a quote for your services?' },
      { label: 'What services do you offer?', query: 'What services do you offer?' },
      { label: 'What is your process?', query: 'What is your service process?' },
      { label: 'What are your rates?', query: 'What are your service rates?' }
    ]
  },
  pricing: {
    USD: {
      setup: { min: 1000, max: 1500 },
      monthly: 140
    },
    AUD: {
      setup: { min: 1500, max: 2200 },
      monthly: 210
    }
  },
  pricingFeatures: [
    'Custom enquiry form for service businesses',
    '24/7 AI chatbot for client questions',
    'Automated quote generation system',
    'Email and SMS follow-up sequences',
    'Multi-channel enquiry capture',
    'Client management dashboard',
    'Ongoing support and updates'
  ]
}

export default function ServiceBusinessPage() {
  return <BusinessPage businessConfig={serviceBusinessConfig} />
}



