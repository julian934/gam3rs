'use client'
import React from 'react'
import NavBar from '@/app/components/ui/nav/nav';
import MobileNav from '@/app/components/shared/modals/mobileNav';
import Link from "next/link";

type Props = {}



const Privacy = (props: Props) => {
  return (
    <div className='max-sm:flex-col min-h-screen bg-white '>
    
      <div className='col-start-1 col-span-6 row-start-1 z-20 max-sm:z-40' >
      <NavBar/>
      </div>
      <div className=' max-sm:visible pointer-events-none fixed max max-sm:w-screen max-sm:h-screen  z-[9999] ' >
        <MobileNav/>
      </div>
      <div>
         <div className="max-w-4xl mx-auto px-6 py-12 text-black">
      <h1 className="text-4xl font-bold mb-6 text-white">Privacy Policy</h1>

      <p className="mb-8 text-black">
        Last updated: {new Date().toLocaleDateString()}
      </p>

      <section className="space-y-6">
        <p>
          Welcome to <strong>The Gam3r Network</strong> (“we”, “our”, or “us”). Your privacy is important to us. 
          This Privacy Policy explains how we collect, use, and protect your information when you use our website, 
          services, and community features (collectively, the “Platform”).
        </p>

        <h2 className="text-2xl font-semibold text-black mt-8">1. Information We Collect</h2>
        <p>
          We may collect the following types of information:
        </p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li><strong>Account Information:</strong> Username, email address, and profile details.</li>
          <li><strong>User Content:</strong> Posts, videos, comments, and any other content you upload or share.</li>
          <li><strong>Usage Data:</strong> Analytics on how you use the platform, such as login times and viewed content.</li>
          <li><strong>Device Data:</strong> Browser type, IP address, and operating system (for security and optimization).</li>
        </ul>

        <h2 className="text-2xl font-semibold text-black mt-8">2. How We Use Your Information</h2>
        <p>We use the collected information to:</p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>Provide and improve the Gam3r Network experience.</li>
          <li>Personalize content recommendations and community interactions.</li>
          <li>Communicate updates, support, and policy changes.</li>
          <li>Monitor and maintain a safe environment for all users.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-black mt-8">3. Sharing Your Information</h2>
        <p>
          We do not sell your personal data. We may share information with trusted service providers 
          who help operate the platform (for example, video hosting or analytics services), and only as 
          necessary to deliver core functionality.
        </p>

        <h2 className="text-2xl font-semibold text-black mt-8">4. Data Security</h2>
        <p>
          We use reasonable administrative and technical measures to protect your information. 
          However, no online platform is 100% secure, so please take care with the information you share publicly.
        </p>

        <h2 className="text-2xl font-semibold text-black mt-8">5. Your Rights & Choices</h2>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>Access or update your profile information anytime.</li>
          <li>Request deletion of your account and personal data.</li>
          <li>Manage communication preferences and notification settings.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-black mt-8">6. Cookies and Tracking</h2>
        <p>
          The Gam3r Network uses cookies to improve functionality and analyze engagement. 
          You can disable cookies in your browser, but some features may not work properly.
        </p>

        <h2 className="text-2xl font-semibold text-black mt-8">7. Children’s Privacy</h2>
        <p>
          Our services are not intended for users under 13. If you are a parent or guardian and believe 
          your child has shared information with us, please contact us immediately.
        </p>

        <h2 className="text-2xl font-semibold text-black mt-8">8. Updates to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Changes will be reflected on this page 
          with an updated “Last Updated” date. We encourage you to review this page periodically.
        </p>

        <h2 className="text-2xl font-semibold text-black mt-8">9. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy or your data, <br />
          <a href="mailto:jborner111@gmail.com" className="text-blue-400 hover:underline">
            please contact us
          </a>
        </p>

        <div className="mt-10">
          <Link href="/home" className="text-blue-400 hover:underline">
            ← Back to Home
          </Link>
        </div>
      </section>
    </div>
      </div>
      </div>
  )
}

export default Privacy