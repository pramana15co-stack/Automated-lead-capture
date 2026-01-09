import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Logo from '../client/src/components/Logo';
import Footer from '../client/src/components/Footer';

const TermsOfService = () => {
  return (
    <>
      <Head>
        <title>Terms of Service | Pramana15</title>
        <meta name="description" content="Terms of Service for Pramana15 automation systems" />
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
              <h1>Terms of Service</h1>
              <p className="legal-updated">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

              <section>
                <h2>1. Agreement to Terms</h2>
                <p>
                  By accessing or using the services provided by Pramana15 ("we," "our," or "us"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of these terms, you may not access our services.
                </p>
              </section>

              <section>
                <h2>2. Description of Services</h2>
                <p>
                  Pramana15 provides automation systems and services designed to help businesses manage enquiries, automate responses, and streamline lead management processes. Our services include:
                </p>
                <ul>
                  <li>Lead capture and management systems</li>
                  <li>Automated notification and follow-up systems</li>
                  <li>Integration with third-party services (Google Sheets, email, messaging platforms)</li>
                  <li>Custom automation setup and configuration</li>
                  <li>Ongoing support and maintenance (optional)</li>
                </ul>
              </section>

              <section>
                <h2>3. Service Setup and Delivery</h2>
                <p>
                  Upon agreement and payment, we will set up and configure your automation system according to the specifications discussed during consultation. Setup timelines vary based on complexity and are confirmed during the initial walkthrough.
                </p>
                <p>
                  You are responsible for providing accurate information, necessary access credentials, and any required third-party account permissions for the setup process.
                </p>
              </section>

              <section>
                <h2>4. Payment Terms</h2>
                <h3>4.1 Setup Fees</h3>
                <p>
                  One-time setup fees (AUD 1,500 – 2,000) are due upon agreement and before work commences. Final pricing is confirmed after consultation and depends on system complexity.
                </p>
                <h3>4.2 Ongoing Support</h3>
                <p>
                  Optional ongoing support (AUD 200/month) is billed monthly and can be cancelled at any time with 30 days' notice.
                </p>
                <h3>4.3 Refunds</h3>
                <p>
                  Setup fees are non-refundable once work has commenced. If you cancel before work begins, a full refund will be provided. Ongoing support fees are refundable on a prorated basis for unused periods.
                </p>
              </section>

              <section>
                <h2>5. Your Responsibilities</h2>
                <p>You agree to:</p>
                <ul>
                  <li>Provide accurate and complete information during setup</li>
                  <li>Maintain the security of your accounts and credentials</li>
                  <li>Use our services in compliance with applicable laws and regulations</li>
                  <li>Not use our services for any illegal or unauthorized purpose</li>
                  <li>Notify us immediately of any security breaches or unauthorized access</li>
                </ul>
              </section>

              <section>
                <h2>6. Intellectual Property</h2>
                <p>
                  All intellectual property rights in our automation systems, software, and services remain the property of Pramana15. You are granted a non-exclusive, non-transferable license to use the services for your business operations.
                </p>
                <p>
                  You retain ownership of your data and content. By using our services, you grant us a limited license to access and process your data solely for the purpose of providing our services.
                </p>
              </section>

              <section>
                <h2>7. Data and Privacy</h2>
                <p>
                  Your use of our services is also governed by our Privacy Policy. We implement appropriate security measures to protect your data, but you acknowledge that no system is completely secure.
                </p>
                <p>
                  You are responsible for backing up your data and ensuring compliance with data protection laws applicable to your business.
                </p>
              </section>

              <section>
                <h2>8. Third-Party Services</h2>
                <p>
                  Our services may integrate with third-party services (e.g., Google Sheets, email providers, messaging platforms). Your use of these third-party services is subject to their respective terms of service and privacy policies.
                </p>
                <p>
                  We are not responsible for the availability, functionality, or content of third-party services.
                </p>
              </section>

              <section>
                <h2>9. Service Availability and Modifications</h2>
                <p>
                  We strive to maintain high availability of our services but do not guarantee uninterrupted or error-free operation. We reserve the right to modify, suspend, or discontinue any part of our services at any time with reasonable notice.
                </p>
              </section>

              <section>
                <h2>10. Support and Maintenance</h2>
                <p>
                  Basic support is included with setup. Optional ongoing support includes monitoring, minor adjustments, reliability checks, and priority support. Support is provided during business hours unless otherwise agreed.
                </p>
              </section>

              <section>
                <h2>11. Limitation of Liability</h2>
                <p>
                  To the maximum extent permitted by law, Pramana15 shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses.
                </p>
                <p>
                  Our total liability for any claims arising from or related to our services shall not exceed the amount you paid us in the 12 months preceding the claim.
                </p>
              </section>

              <section>
                <h2>12. Indemnification</h2>
                <p>
                  You agree to indemnify and hold harmless Pramana15 from any claims, damages, losses, liabilities, and expenses (including legal fees) arising from your use of our services, violation of these Terms, or infringement of any rights of another.
                </p>
              </section>

              <section>
                <h2>13. Termination</h2>
                <p>
                  Either party may terminate the service agreement with 30 days' written notice. We may terminate immediately if you breach these Terms or engage in fraudulent or illegal activity.
                </p>
                <p>
                  Upon termination, your access to our services will cease, and we will provide you with a copy of your data upon request (within 30 days of termination).
                </p>
              </section>

              <section>
                <h2>14. Changes to Terms</h2>
                <p>
                  We reserve the right to modify these Terms at any time. We will notify you of material changes by posting the updated Terms on our website and updating the "Last updated" date. Your continued use of our services after changes become effective constitutes acceptance of the modified Terms.
                </p>
              </section>

              <section>
                <h2>15. Governing Law</h2>
                <p>
                  These Terms shall be governed by and construed in accordance with the laws of Australia, without regard to its conflict of law provisions. Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the courts of Australia.
                </p>
              </section>

              <section>
                <h2>16. Severability</h2>
                <p>
                  If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary, and the remaining provisions shall remain in full force and effect.
                </p>
              </section>

              <section>
                <h2>17. Entire Agreement</h2>
                <p>
                  These Terms, together with our Privacy Policy, constitute the entire agreement between you and Pramana15 regarding the use of our services and supersede all prior agreements and understandings.
                </p>
              </section>

              <section>
                <h2>18. Contact Information</h2>
                <p>
                  If you have any questions about these Terms of Service, please contact us:
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

export default TermsOfService;

