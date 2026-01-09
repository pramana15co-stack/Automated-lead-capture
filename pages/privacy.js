import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Logo from '../client/src/components/Logo';
import Footer from '../client/src/components/Footer';

const PrivacyPolicy = () => {
  return (
    <>
      <Head>
        <title>Privacy Policy | Pramana15</title>
        <meta name="description" content="Privacy Policy for Pramana15 automation systems" />
      </Head>

      <div className="legal-page">
        {/* Navigation */}
        <nav className="navbar">
          <div className="container">
            <div className="nav-content">
              <Link href="/">
                <Logo size="medium" />
              </Link>
              <div className="nav-links">
                <Link href="/" className="nav-link">Home</Link>
                <Link href="/#what-we-do" className="nav-link">Services</Link>
                <Link href="/#pricing" className="nav-link">Pricing</Link>
                <Link href="/#lead-form" className="nav-link">Contact</Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Content */}
        <div className="legal-content">
          <div className="container">
            <div className="legal-wrapper">
              <h1>Privacy Policy</h1>
              <p className="legal-updated">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

              <section>
                <h2>1. Introduction</h2>
                <p>
                  Pramana15 ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our automation systems and services.
                </p>
                <p>
                  By using our services, you agree to the collection and use of information in accordance with this policy.
                </p>
              </section>

              <section>
                <h2>2. Information We Collect</h2>
                
                <h3>2.1 Information You Provide</h3>
                <p>We collect information that you provide directly to us, including:</p>
                <ul>
                  <li>Name and contact information (email address, phone number)</li>
                  <li>Company name and business information</li>
                  <li>Service preferences and requirements</li>
                  <li>Messages and communications with us</li>
                </ul>

                <h3>2.2 Automatically Collected Information</h3>
                <p>When you use our services, we may automatically collect:</p>
                <ul>
                  <li>IP address and device information</li>
                  <li>Browser type and version</li>
                  <li>Pages visited and time spent on pages</li>
                  <li>Referral sources</li>
                </ul>
              </section>

              <section>
                <h2>3. How We Use Your Information</h2>
                <p>We use the information we collect to:</p>
                <ul>
                  <li>Provide, maintain, and improve our automation services</li>
                  <li>Process and respond to your inquiries and requests</li>
                  <li>Send you technical notices, updates, and support messages</li>
                  <li>Monitor and analyze usage patterns and trends</li>
                  <li>Detect, prevent, and address technical issues</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </section>

              <section>
                <h2>4. Data Storage and Security</h2>
                <p>
                  We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. Your data is stored securely and accessed only by authorized personnel.
                </p>
                <p>
                  Data collected through our automation systems is stored in Google Sheets (for lead management) and processed through secure API connections. We do not store sensitive payment information.
                </p>
              </section>

              <section>
                <h2>5. Data Sharing and Disclosure</h2>
                <p>We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:</p>
                <ul>
                  <li><strong>Service Providers:</strong> With trusted third-party service providers who assist us in operating our services (e.g., email services, hosting providers)</li>
                  <li><strong>Legal Requirements:</strong> When required by law or to protect our rights and safety</li>
                  <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
                </ul>
              </section>

              <section>
                <h2>6. Your Rights</h2>
                <p>You have the right to:</p>
                <ul>
                  <li>Access and receive a copy of your personal data</li>
                  <li>Request correction of inaccurate or incomplete data</li>
                  <li>Request deletion of your personal data</li>
                  <li>Object to processing of your personal data</li>
                  <li>Request restriction of processing</li>
                  <li>Data portability</li>
                </ul>
                <p>To exercise these rights, please contact us at <a href="mailto:pramana15.co@gmail.com">pramana15.co@gmail.com</a>.</p>
              </section>

              <section>
                <h2>7. Cookies and Tracking Technologies</h2>
                <p>
                  We use cookies and similar tracking technologies to track activity on our website and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
                </p>
              </section>

              <section>
                <h2>8. Data Retention</h2>
                <p>
                  We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.
                </p>
              </section>

              <section>
                <h2>9. International Data Transfers</h2>
                <p>
                  Your information may be transferred to and maintained on computers located outside of your state, province, country, or other governmental jurisdiction where data protection laws may differ. By using our services, you consent to such transfers.
                </p>
              </section>

              <section>
                <h2>10. Children's Privacy</h2>
                <p>
                  Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
                </p>
              </section>

              <section>
                <h2>11. Changes to This Privacy Policy</h2>
                <p>
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes.
                </p>
              </section>

              <section>
                <h2>12. Contact Us</h2>
                <p>
                  If you have any questions about this Privacy Policy, please contact us:
                </p>
                <p>
                  <strong>Email:</strong> <a href="mailto:pramana15.co@gmail.com">pramana15.co@gmail.com</a>
                </p>
              </section>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default PrivacyPolicy;

