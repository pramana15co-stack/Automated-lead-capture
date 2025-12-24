// Import global styles first
import '../client/src/index.css'
import '../client/src/App.css'
import '../styles/globals.css'

// Import all component CSS files here (Next.js requirement)
import '../client/src/components/LandingPage.css'
import '../client/src/components/LeadCaptureForm.css'
import '../client/src/components/Chatbot.css'
import '../client/src/components/AdminDashboard.css'
import '../client/src/components/ContactSection.css'
import '../client/src/components/Footer.css'
import '../client/src/components/Logo.css'
import '../client/src/components/TrustBadges.css'
import '../client/src/components/CaseStudy.css'
import '../client/src/components/LogoSection.css'

/**
 * Next.js App Component
 * Wraps all pages with global styles
 */
export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}
