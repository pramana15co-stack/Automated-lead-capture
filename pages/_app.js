import Head from 'next/head'
import { useEffect } from 'react'

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
 * Wraps all pages with global styles and optimizations
 */
export default function App({ Component, pageProps }) {
  // Performance optimization: Preconnect to external domains
  useEffect(() => {
    // Preconnect to Google APIs for Google Sheets
    const link1 = document.createElement('link')
    link1.rel = 'preconnect'
    link1.href = 'https://sheets.googleapis.com'
    document.head.appendChild(link1)
    
    // Preconnect to OpenAI API
    const link2 = document.createElement('link')
    link2.rel = 'preconnect'
    link2.href = 'https://api.openai.com'
    document.head.appendChild(link2)
    
    return () => {
      document.head.removeChild(link1)
      document.head.removeChild(link2)
    }
  }, [])

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#4F46E5" />
        <link rel="dns-prefetch" href="https://sheets.googleapis.com" />
        <link rel="dns-prefetch" href="https://api.openai.com" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
