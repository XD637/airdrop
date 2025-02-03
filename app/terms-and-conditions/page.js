import React from 'react';
import Link from 'next/link'; // Import Link from next/link

export default function TermsAndConditionsPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black/60 text-white">
      <div className="p-6 bg-black text-white rounded-lg shadow-lg w-full sm:w-3/4 md:w-2/3 lg:w-full">
        <h2 className="text-2xl font-extrabold text-center mb-4">Terms and Conditions</h2>

        <h3 className="font-semibold mt-4">1. Acceptance of Terms</h3>
        <p>By participating in the Xennium airdrop, you agree to abide by these Terms and Conditions and the Privacy Policy.</p>

        <h3 className="font-semibold mt-4">2. Eligibility</h3>
        <p>The Xennium airdrop is open to individuals who meet the following criteria:</p>
        <ul>
          <li>Must be 18 years or older.</li>
          <li>Must have a valid Discord account.</li>
          <li>Must have a compatible wallet address.</li>
        </ul>

        <h3 className="font-semibold mt-4">3. Airdrop Participation</h3>
        <p>Participation in the airdrop requires you to connect your Discord account and submit your wallet address. Each participant may only submit one entry.</p>

        <h3 className="font-semibold mt-4">4. Distribution of Tokens</h3>
        <p>Tokens will be distributed based on the following rules:</p>
        <ul>
          <li>10 XENX tokens will be distributed per qualifying participant.</li>
          <li>Tokens will be distributed within 1-7 bussiness days after the airdrop ends.</li>
        </ul>

        <h3 className="font-semibold mt-4">5. Data Usage</h3>
        <p>Your personal data, including Discord username and wallet address, will be used to verify your eligibility and distribute tokens.</p>

        <h3 className="font-semibold mt-4">6. Prohibited Actions</h3>
        <p>You are prohibited from engaging in fraudulent activities or using multiple entries to gain more tokens. Any attempts to do so will result in disqualification.</p>

        <h3 className="font-semibold mt-4">7. Modification of Terms</h3>
        <p>We reserve the right to modify or update these Terms and Conditions at any time. Any changes will be posted on this page with an updated effective date.</p>

        <h3 className="font-semibold mt-4">8. Limitation of Liability</h3>
        <p>We are not responsible for any errors, omissions, or disruptions that occur during the airdrop process or the distribution of tokens.</p>

        <h3 className="font-semibold mt-4">9. Termination</h3>
        <p>We reserve the right to terminate the airdrop at any time, without notice, and for any reason.</p>

        <h3 className="font-semibold mt-4">10. Governing Law</h3>
        <p>These Terms and Conditions are governed by the laws of India.</p>

        <h3 className="font-semibold mt-4">11. Contact Us</h3>
        <p>If you have any questions about these Terms and Conditions, please contact us at <a href="mailto:contact@xennium.org" className="text-purple-400">contact@xennium.org</a>.</p>

        <div className="mt-4 text-center">
          <Link href="/" className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-700">
            Go Back
          </Link>
        </div>
      </div>
    </div>
  );
}
