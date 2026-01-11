import BusinessPage from '../client/src/components/BusinessPage'

const beautySalonConfig = {
  id: 'beauty-salon',
  businessType: 'Beauty Salon',
  icon: '💅',
  heroTitle: 'Book More Appointments Automatically',
  heroDescription: 'Streamline booking, reminders, and client communication. Never miss a booking opportunity and keep your schedule full.',
  problems: [
    {
      title: 'Missed Booking Calls',
      description: 'Clients call when your salon is closed or busy, leading to lost appointments and frustrated clients.'
    },
    {
      title: 'Last-Minute Cancellations',
      description: 'Clients cancel appointments at the last minute, leaving gaps in your schedule and lost revenue.'
    },
    {
      title: 'No Reminder System',
      description: 'Clients forget their appointments, resulting in no-shows and wasted time slots.'
    },
    {
      title: 'Lost Client Enquiries',
      description: 'Enquiries from your website or social media go unanswered, costing you potential bookings.'
    }
  ],
  solutions: [
    {
      title: 'Online Booking System',
      description: 'Clients can book appointments online 24/7, with automatic confirmations and calendar integration.'
    },
    {
      title: 'Automated Reminders',
      description: 'System automatically sends appointment reminders via email and SMS to reduce no-shows and cancellations.'
    },
    {
      title: 'Client Communication Automation',
      description: 'Automated follow-up messages, promotional offers, and birthday wishes keep clients engaged.'
    },
    {
      title: 'Multi-Channel Booking',
      description: 'Capture bookings from your website, phone, social media, and walk-ins in one centralized system.'
    }
  ],
  workflow: [
    {
      title: 'Client Makes Booking Enquiry',
      description: 'Client submits booking request through your website, phone, or social media.'
    },
    {
      title: 'Instant Automated Response',
      description: 'System immediately responds with available time slots and service options.'
    },
    {
      title: 'Online Appointment Booking',
      description: 'Client can book appointment directly through your calendar, with automatic confirmations.'
    },
    {
      title: 'Automated Reminders & Follow-Up',
      description: 'System sends appointment reminders and follows up after services to encourage repeat bookings.'
    }
  ],
  formConfig: {
    showCompany: false,
    serviceRequired: true,
    serviceLabel: 'Service Interested In',
    services: [
      'Haircut & Styling',
      'Hair Color',
      'Manicure & Pedicure',
      'Facial Treatment',
      'Waxing',
      'Makeup',
      'Other'
    ],
    placeholders: {
      name: 'Your full name',
      email: 'your@email.com',
      phone: 'Your phone number',
      message: 'Tell us about the service you\'re interested in...'
    },
    submitButtonText: 'Book Appointment',
    successMessage: 'Thank you! We\'ve received your booking request and will contact you shortly to confirm your appointment.'
  },
  chatbotConfig: {
    title: 'Beauty Salon Assistant',
    initialMessage: 'Hello! I\'m here to help you with appointment booking and information about our beauty services.\n\nWhat can I help you with?',
    inputPlaceholder: 'Ask about services, appointments, or pricing...',
    errorMessage: 'I apologize, but I\'m having trouble right now. Please fill out the form above and we\'ll contact you soon!',
    quickActions: [
      { label: 'Book an appointment', query: 'How do I book an appointment?' },
      { label: 'What services do you offer?', query: 'What beauty services do you offer?' },
      { label: 'What are your prices?', query: 'What are your service prices?' },
      { label: 'What are your hours?', query: 'What are your salon hours?' }
    ]
  },
  pricing: {
    USD: {
      setup: { min: 1000, max: 1300 },
      monthly: 135
    },
    AUD: {
      setup: { min: 1500, max: 2000 },
      monthly: 200
    }
  },
  pricingFeatures: [
    'Custom booking form for beauty services',
    '24/7 AI chatbot for client questions',
    'Automated appointment booking system',
    'Email and SMS reminders',
    'Multi-channel booking capture',
    'Client management dashboard',
    'Ongoing support and updates'
  ]
}

export default function BeautySalonPage() {
  return <BusinessPage businessConfig={beautySalonConfig} />
}



