import BusinessPage from '../client/src/components/BusinessPage'

const realEstateConfig = {
  id: 'real-estate',
  businessType: 'Real Estate Agency',
  icon: '🏠',
  heroTitle: 'Capture Every Property Enquiry Instantly',
  heroDescription: 'Automate lead qualification, property enquiries, and client communication. Never let a hot lead go cold again.',
  problems: [
    {
      title: 'Hot Leads Going Cold',
      description: 'By the time you respond to an enquiry, the client has already moved on to another agent or property.'
    },
    {
      title: 'Missing Weekend Enquiries',
      description: 'Most property searches happen on weekends when your office might be closed, leading to lost opportunities.'
    },
    {
      title: 'Manual Lead Qualification',
      description: 'Your team spends hours manually qualifying leads instead of closing deals.'
    },
    {
      title: 'Inefficient Follow-Up Process',
      description: 'Following up with leads manually is time-consuming and leads to missed opportunities.'
    }
  ],
  solutions: [
    {
      title: 'Instant Enquiry Response',
      description: 'Every property enquiry is instantly captured and responded to, even on weekends and after hours.'
    },
    {
      title: 'Automated Lead Qualification',
      description: 'System automatically asks qualifying questions to identify serious buyers and prioritize leads.'
    },
    {
      title: 'Smart Follow-Up Sequences',
      description: 'Automated follow-up emails and messages keep your agency top-of-mind with potential clients.'
    },
    {
      title: 'Property Viewing Scheduler',
      description: 'Clients can schedule property viewings directly through your website, 24/7.'
    }
  ],
  workflow: [
    {
      title: 'Client Makes Property Enquiry',
      description: 'Client submits enquiry through your website, property listing, or social media.'
    },
    {
      title: 'Instant Automated Response',
      description: 'System immediately responds with property details, answers questions, and offers to schedule a viewing.'
    },
    {
      title: 'Lead Qualification',
      description: 'System automatically asks qualifying questions to determine budget, timeline, and property preferences.'
    },
    {
      title: 'Smart Follow-Up',
      description: 'Automated follow-up sequences keep your agency engaged with leads until they\'re ready to buy.'
    }
  ],
  formConfig: {
    showCompany: false,
    serviceRequired: true,
    serviceLabel: 'I\'m Interested In',
    services: [
      'Buying a Property',
      'Selling a Property',
      'Renting a Property',
      'Property Investment',
      'Property Valuation',
      'Other'
    ],
    placeholders: {
      name: 'Your full name',
      email: 'your@email.com',
      phone: 'Your phone number',
      message: 'Tell us about the property you\'re looking for...'
    },
    submitButtonText: 'Get Property Information',
    successMessage: 'Thank you! We\'ve received your enquiry and will contact you shortly with property information.'
  },
  chatbotConfig: {
    title: 'Real Estate Assistant',
    initialMessage: 'Hello! I\'m here to help you find your perfect property or answer questions about buying, selling, or renting.\n\nWhat can I help you with today?',
    inputPlaceholder: 'Ask about properties, neighborhoods, or services...',
    errorMessage: 'I apologize, but I\'m having trouble right now. Please fill out the form above and we\'ll contact you soon!',
    quickActions: [
      { label: 'Find properties for sale', query: 'What properties do you have for sale?' },
      { label: 'Schedule a property viewing', query: 'How do I schedule a property viewing?' },
      { label: 'Get a property valuation', query: 'How do I get my property valued?' },
      { label: 'Learn about neighborhoods', query: 'Tell me about the neighborhoods in your area' }
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
    'Custom property enquiry form',
    '24/7 AI chatbot for property questions',
    'Automated lead qualification system',
    'Property viewing scheduler',
    'Email and SMS follow-up sequences',
    'Multi-channel enquiry capture',
    'Lead management dashboard',
    'Ongoing support and updates'
  ]
}

export default function RealEstatePage() {
  return <BusinessPage businessConfig={realEstateConfig} />
}


