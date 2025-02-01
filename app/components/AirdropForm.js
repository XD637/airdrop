import { useSession } from "next-auth/react";
import { useState } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { ImSpinner2 } from "react-icons/im"; // For the loading spinner

export default function AirdropForm({ onSubmit }) {
  const { data: session } = useSession();
  const [walletAddress, setWalletAddress] = useState('');
  const [captchaToken, setCaptchaToken] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // For the loading state
  const [showModal, setShowModal] = useState(false); // For showing the success modal
  const hcaptchaSiteKey = process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY;

  const isValidWalletAddress = (address) => {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidWalletAddress(walletAddress)) {
      setError('Please enter a valid Ethereum wallet address.');
      return;
    }

    setError('');
    setLoading(true); // Set loading to true when form is being submitted

    try {
      const res = await fetch('/api/saveAddress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          walletAddress,
          discordUsername: session?.user?.name, // Use the session data here
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to save address');
      }

      setLoading(false); // Reset loading state
      setShowModal(true); // Show the success modal after successful submission
    } catch (error) {
      setError('Error submitting the airdrop form');
      setLoading(false); // Reset loading state on error
    }
  };

  const handleCloseModal = () => {
    setShowModal(false); // Close the success modal
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-6">
        <input
          type="text"
          placeholder="Enter your wallet address"
          value={walletAddress}
          onChange={(e) => setWalletAddress(e.target.value)}
          className="px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 w-full"
          required
        />
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        <div className="flex justify-center">
          <HCaptcha sitekey={hcaptchaSiteKey} onVerify={setCaptchaToken} />
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-purple-600 text-white font-bold rounded-lg w-2/3 mx-auto"
          disabled={loading} // Disable button while loading
        >
          {loading ? (
            <ImSpinner2 className="animate-spin text-white" size={20} />
          ) : (
            'Claim Airdrop'
          )}
        </button>
      </form>

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
            <div className="text-center">
              <svg
                className="mx-auto text-purple-500 mb-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                width="50"
                height="50"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <h2 className="text-xl font-bold text-purple-500 mb-2">Success!</h2>
              <p className="text-sm mb-4">
                Your address has been noted down. Due to the high volume of submissions, we&apos;ll process the airdrop in bulk. Please wait for your tokens. If you don&apos;t receive them, please message your address in our Airdrop Discord channel.
              </p>
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 bg-purple-600 text-white font-bold rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
