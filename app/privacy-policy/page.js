import React from 'react';
import Link from 'next/link'; // Import Link from next/link

export default function PrivacyPolicyPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black/60 text-white">
      <div className="p-6 bg-black text-white rounded-lg shadow-lg w-full sm:w-3/4 md:w-2/3 lg:w-full">
        <h2 className="text-2xl font-extrabold text-center mb-4">Privacy Policy</h2>

        <h3 className="font-semibold mt-4">1. Data We Collect</h3>
        <p>We collect the following personal information when you participate in our airdrop:</p>
        <ul>
          <li>Discord Username</li>
          <li>Email Address</li>
          <li>Wallet Address</li>
        </ul>

        <h3 className="font-semibold mt-4">2. How We Use Your Data</h3>
        <p>We use your data for the following purposes:</p>
        <ul>
          <li>To verify your participation in the Xennium airdrop.</li>
          <li>To communicate with you regarding the airdrop and other updates.</li>
          <li>To ensure fair distribution of XENX tokens (e.g., one address per Discord account).</li>
        </ul>

        <h3 className="font-semibold mt-4">3. Data Sharing</h3>
        <p>We do not sell, rent, or trade your personal information to third parties. However, we may share your data with trusted partners for operational purposes.</p>

        <h3 className="font-semibold mt-4">4. Data Security</h3>
        <p>We take appropriate measures to protect your data using encryption and secure server protocols.</p>

        <h3 className="font-semibold mt-4">5. Your Rights</h3>
        <p>You have the right to access, update, or delete your data. For requests, contact us at <a href="mailto:contact@xennium.org" className="text-purple-400">contact@xennium.org</a>.</p>

        <h3 className="font-semibold mt-4">6. Changes to This Privacy Policy</h3>
        <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date.</p>

        <h3 className="font-semibold mt-4">7. Contact Us</h3>
        <p>If you have any questions, feel free to contact us at <a href="mailto:contact@xennium.org" className="text-purple-400">contact@xennium.org</a>.</p>

        <div className="mt-4 text-center">
          <Link href="/" className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-700">
            Go Back
          </Link>
        </div>
      </div>
    </div>
  );
}
