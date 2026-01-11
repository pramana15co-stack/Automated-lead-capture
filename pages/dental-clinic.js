import BusinessPage from '../client/src/components/BusinessPage'

const dentalConfig = {
  id: 'dental-clinic',
  businessType: 'Dental Clinic',
  icon: '🦷',
  heroTitle: 'Never Miss a Patient Enquiry Again',
  heroDescription: 'Automate appointment bookings, patient follow-ups, and communication 24/7. See how we can transform your dental practice.',
  problems: [
    {
      title: 'Missed Calls After Hours',
      description: 'Patients call when your office is closed, leading to lost appointments and frustrated patients.'
    },
    {
      title: 'No-Shows & Cancellations',
      description: 'Last-minute cancellations and no-shows cost your practice revenue and disrupt your schedule.'
    },
    {
      title: 'Manual Appointment Scheduling',
      description: 'Staff spend too much time on the phone scheduling appointments instead of focusing on patient care.'
    },
    {
      title: 'Lost Patient Enquiries',
      description: 'Enquiries from your website or social media go unanswered, resulting in lost potential patients.'
    }
  ],
  solutions: [
    {
      title: '24/7 Automated Response',
      description: 'Every enquiry is instantly captured and responded to, even outside business hours.'
    },
    {
      title: 'Smart Appointment Booking',
      description: 'Patients can book appointments online 24/7, with automatic reminders to reduce no-shows.'
    },
    {
      title: 'Automated Follow-Ups',
      description: 'System automatically follows up with patients after appointments and sends reminders.'
    },
    {
      title: 'Multi-Channel Capture',
      description: 'Capture enquiries from your website, phone, email, and social media in one place.'
    }
  ],
  workflow: [
    {
      title: 'Patient Makes Enquiry',
      description: 'Patient submits form, calls, or messages through any channel (website, phone, social media).'
    },
    {
      title: 'Instant Automated Response',
      description: 'System immediately acknowledges the enquiry and provides relevant information or booking options.'
    },
    {
      title: 'Smart Routing & Qualification',
      description: 'Enquiry is automatically categorized, prioritized, and routed to the right team member.'
    },
    {
      title: 'Automated Follow-Up',
      description: 'System sends follow-up messages and reminders to ensure no patient falls through the cracks.'
    }
  ],
  formConfig: {
    showCompany: false,
    serviceRequired: true,
    serviceLabel: 'Service Needed',
    services: [
      'General Checkup',
      'Teeth Cleaning',
      'Dental Implants',
      'Teeth Whitening',
      'Orthodontics',
      'Emergency Appointment',
      'Other'
    ],
    placeholders: {
      name: 'Your full name',
      email: 'your@email.com',
      phone: 'Your phone number',
      message: 'Tell us about your dental needs...'
    },
    submitButtonText: 'Book Appointment',
    successMessage: 'Thank you! We\'ve received your appointment request and will contact you shortly to confirm.'
  },
  chatbotConfig: {
    title: 'Dental Clinic Assistant',
    initialMessage: 'Hello! I\'m here to help you with information about our dental services and appointment booking.\n\nWhat would you like to know?',
    inputPlaceholder: 'Ask about appointments, services, or hours...',
    errorMessage: 'I apologize, but I\'m having trouble right now. Please fill out the form above and we\'ll contact you soon!',
    quickActions: [
      { label: 'Book an appointment', query: 'How do I book an appointment?' },
      { label: 'What services do you offer?', query: 'What dental services do you offer?' },
      { label: 'What are your hours?', query: 'What are your office hours?' },
      { label: 'Do you accept insurance?', query: 'Do you accept dental insurance?' }
    ]
  },
  pricing: {
    USD: {
      setup: { min: 1200, max: 1500 },
      monthly: 150
    },
    AUD: {
      setup: { min: 1800, max: 2200 },
      monthly: 220
    }
  },
  pricingFeatures: [
    'Custom lead capture form for dental enquiries',
    '24/7 AI chatbot for patient questions',
    'Automated appointment booking system',
    'Email and SMS reminders',
    'Multi-channel enquiry capture',
    'Lead management dashboard',
    'Ongoing support and updates'
  ]
}

export default function DentalClinicPage() {
  return <BusinessPage businessConfig={dentalConfig} />
}



