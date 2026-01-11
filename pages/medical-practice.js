import BusinessPage from '../client/src/components/BusinessPage'

const medicalPracticeConfig = {
  id: 'medical-practice',
  businessType: 'Medical Practice',
  icon: '🏥',
  heroTitle: 'Streamline Patient Communication',
  heroDescription: 'Automate appointment scheduling, reminders, and patient enquiries. Improve patient satisfaction and reduce administrative workload.',
  problems: [
    {
      title: 'Missed Patient Calls',
      description: 'Patients call when your office is closed, leading to missed appointments and frustrated patients.'
    },
    {
      title: 'No-Show Appointments',
      description: 'Last-minute cancellations and no-shows disrupt your schedule and reduce practice efficiency.'
    },
    {
      title: 'Manual Scheduling',
      description: 'Staff spend too much time on the phone scheduling appointments instead of patient care.'
    },
    {
      title: 'Inefficient Patient Communication',
      description: 'Following up with patients manually is time-consuming and leads to missed reminders.'
    }
  ],
  solutions: [
    {
      title: '24/7 Automated Response',
      description: 'Every patient enquiry is instantly captured and responded to, even outside business hours.'
    },
    {
      title: 'Online Appointment Booking',
      description: 'Patients can book appointments online 24/7, with automatic confirmations and reminders.'
    },
    {
      title: 'Automated Reminders',
      description: 'System automatically sends appointment reminders via email and SMS to reduce no-shows.'
    },
    {
      title: 'Patient Enquiry Management',
      description: 'All patient enquiries are automatically organized and tracked in a centralized system.'
    }
  ],
  workflow: [
    {
      title: 'Patient Makes Enquiry',
      description: 'Patient submits enquiry through your website, phone, or patient portal.'
    },
    {
      title: 'Instant Automated Response',
      description: 'System immediately responds with appointment availability and booking options.'
    },
    {
      title: 'Online Appointment Booking',
      description: 'Patient can book appointment directly through your calendar, with automatic confirmations.'
    },
    {
      title: 'Automated Reminders & Follow-Up',
      description: 'System sends appointment reminders and follows up after visits to ensure patient satisfaction.'
    }
  ],
  formConfig: {
    showCompany: false,
    serviceRequired: true,
    serviceLabel: 'Appointment Type',
    services: [
      'General Consultation',
      'Follow-Up Appointment',
      'Specialist Consultation',
      'Preventive Care',
      'Urgent Care',
      'Telemedicine',
      'Other'
    ],
    placeholders: {
      name: 'Your full name',
      email: 'your@email.com',
      phone: 'Your phone number',
      message: 'Tell us about your medical needs...'
    },
    submitButtonText: 'Book Appointment',
    successMessage: 'Thank you! We\'ve received your appointment request and will contact you shortly to confirm.'
  },
  chatbotConfig: {
    title: 'Medical Practice Assistant',
    initialMessage: 'Hello! I\'m here to help you with appointment booking and information about our medical services.\n\nWhat can I help you with?',
    inputPlaceholder: 'Ask about appointments, services, or hours...',
    errorMessage: 'I apologize, but I\'m having trouble right now. Please fill out the form above and we\'ll contact you soon!',
    quickActions: [
      { label: 'Book an appointment', query: 'How do I book an appointment?' },
      { label: 'What services do you offer?', query: 'What medical services do you offer?' },
      { label: 'What are your office hours?', query: 'What are your office hours?' },
      { label: 'Do you accept insurance?', query: 'Do you accept medical insurance?' }
    ]
  },
  pricing: {
    USD: {
      setup: { min: 1300, max: 1700 },
      monthly: 160
    },
    AUD: {
      setup: { min: 1900, max: 2500 },
      monthly: 240
    }
  },
  pricingFeatures: [
    'Custom patient enquiry form',
    '24/7 AI chatbot for patient questions',
    'Automated appointment booking system',
    'Email and SMS reminders',
    'Multi-channel enquiry capture',
    'Patient management dashboard',
    'HIPAA-compliant data handling',
    'Ongoing support and updates'
  ]
}

export default function MedicalPracticePage() {
  return <BusinessPage businessConfig={medicalPracticeConfig} />
}



