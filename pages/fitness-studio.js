import BusinessPage from '../client/src/components/BusinessPage'

const fitnessStudioConfig = {
  id: 'fitness-studio',
  businessType: 'Fitness Studio',
  icon: '💪',
  heroTitle: 'Grow Your Membership Base',
  heroDescription: 'Automate class bookings, trial sign-ups, and member communication. Turn more visitors into members with seamless automation.',
  problems: [
    {
      title: 'Missed Class Bookings',
      description: 'Potential members want to book classes but can\'t reach you outside business hours, leading to lost bookings.'
    },
    {
      title: 'No Trial Sign-Up System',
      description: 'Interested visitors can\'t easily sign up for trial classes, missing conversion opportunities.'
    },
    {
      title: 'Manual Member Communication',
      description: 'Following up with members and sending class reminders manually is time-consuming and inconsistent.'
    },
    {
      title: 'Lost Potential Members',
      description: 'Enquiries from your website or social media go unanswered, resulting in lost membership opportunities.'
    }
  ],
  solutions: [
    {
      title: 'Automated Class Booking',
      description: 'Members and visitors can book classes online 24/7, with automatic confirmations and waitlist management.'
    },
    {
      title: 'Trial Sign-Up Automation',
      description: 'Interested visitors can sign up for trial classes directly through your website with instant confirmation.'
    },
    {
      title: 'Member Communication System',
      description: 'Automated class reminders, membership updates, and promotional messages keep members engaged.'
    },
    {
      title: 'Lead Nurturing Sequences',
      description: 'Automated follow-up sequences convert trial visitors into full memberships.'
    }
  ],
  workflow: [
    {
      title: 'Visitor Makes Enquiry',
      description: 'Potential member submits enquiry through your website, social media, or referral.'
    },
    {
      title: 'Instant Automated Response',
      description: 'System immediately responds with class schedules, trial options, and membership information.'
    },
    {
      title: 'Trial Sign-Up & Booking',
      description: 'Visitor can sign up for trial class and book sessions directly through your website.'
    },
    {
      title: 'Member Onboarding & Follow-Up',
      description: 'System automatically sends welcome messages, class reminders, and membership information.'
    }
  ],
  formConfig: {
    showCompany: false,
    serviceRequired: true,
    serviceLabel: 'I\'m Interested In',
    services: [
      'Trial Class',
      'Personal Training',
      'Group Classes',
      'Membership Information',
      'Corporate Packages',
      'Nutrition Coaching',
      'Other'
    ],
    placeholders: {
      name: 'Your full name',
      email: 'your@email.com',
      phone: 'Your phone number',
      message: 'Tell us about your fitness goals...'
    },
    submitButtonText: 'Get Started',
    successMessage: 'Thank you! We\'ve received your enquiry and will contact you shortly with class schedules and membership options.'
  },
  chatbotConfig: {
    title: 'Fitness Studio Assistant',
    initialMessage: 'Hello! I\'m here to help you with information about our fitness classes, memberships, and trial sign-ups.\n\nWhat would you like to know?',
    inputPlaceholder: 'Ask about classes, memberships, or trial sign-ups...',
    errorMessage: 'I apologize, but I\'m having trouble right now. Please fill out the form above and we\'ll contact you soon!',
    quickActions: [
      { label: 'Sign up for a trial class', query: 'How do I sign up for a trial class?' },
      { label: 'What classes do you offer?', query: 'What fitness classes do you offer?' },
      { label: 'What are your membership options?', query: 'What are your membership options and pricing?' },
      { label: 'What are your class schedules?', query: 'What are your class schedules?' }
    ]
  },
  pricing: {
    USD: {
      setup: { min: 1100, max: 1400 },
      monthly: 145
    },
    AUD: {
      setup: { min: 1650, max: 2100 },
      monthly: 220
    }
  },
  pricingFeatures: [
    'Custom enquiry form for fitness services',
    '24/7 AI chatbot for member questions',
    'Automated class booking system',
    'Trial sign-up automation',
    'Email and SMS reminders',
    'Multi-channel enquiry capture',
    'Member management dashboard',
    'Ongoing support and updates'
  ]
}

export default function FitnessStudioPage() {
  return <BusinessPage businessConfig={fitnessStudioConfig} />
}




